import { downloadZip } from "client-zip";
import * as OBC from "openbim-components";
import * as THREE from "three";
import { BuildingDatabase } from "./building-database";
import { Building } from "../../types";
import { unzip } from "unzipit";

export class BuildingScene {
    private components: OBC.Components;
    private fragments: OBC.Fragments;
    database = new BuildingDatabase();

    constructor(container: HTMLDivElement, building: Building) {
        this.components = new OBC.Components();

        this.components.scene = new OBC.SimpleScene(this.components);
        this.components.renderer = new OBC.SimpleRenderer(
            this.components,
            container
        );

        const scene = this.components.scene.get();
        scene.background = new THREE.Color();

        this.components.camera = new OBC.SimpleCamera(this.components);
        this.components.raycaster = new OBC.SimpleRaycaster(this.components);
        this.components.init();

        const directionalLight = new THREE.DirectionalLight();
        directionalLight.position.set(5,10,3);
        directionalLight.intensity = 0.5;
        scene.add(directionalLight);

        const ambientLight = new THREE.AmbientLight();
        ambientLight.intensity = 0.5;
        scene.add(ambientLight);

        const grid = new OBC.SimpleGrid(this.components);
        this.components.tools.add(grid);

        this.fragments = new OBC.Fragments(this.components);
        this.components.tools.add(this.fragments);
        this.loadAllModels(building);
    }

    dispose() {
        this.components.dispose();
        (this.components as any) = null;
        (this.fragments as any) = null;
    }

    async convertIfcToFragments(ifc: File) {
        let fragments = new OBC.Fragments(this.components);

        fragments.ifcLoader.settings.optionalCategories.length = 0;

        fragments.ifcLoader.settings.wasm = {
            path: "../../",
            absolute: false,
        };

        fragments.ifcLoader.settings.webIfc = {
            COORDINATE_TO_ORIGIN: true,
            USE_FAST_BOOLS: true,
        };

        const url = URL.createObjectURL(ifc) as any;
        const model = await fragments.ifcLoader.load(url);
        const file = await this.serializeFragments(model);

        fragments.dispose();
        (fragments as any) = null;

        return file as File;

    }

    private async serializeFragments(model: OBC.FragmentGroup) {
        const files = [];
        for (const frag of model.fragments) {
            const file = await frag.export();
            files.push(file.geometry, file.data);
        }

        files.push(new File([JSON.stringify(model.properties)], "properties.json"));
        files.push(new File([JSON.stringify(model.allTypes)], "all-types.json"));
        files.push(new File([JSON.stringify(model.floorsProperties)], "level-properties.json"));
        files.push(new File([JSON.stringify(model.coordinationMatrix)], "coordination-matrix.json"));
        files.push(new File([JSON.stringify(model.expressIDFragmentIDMap)], "express-fragment-map.json"));

        return downloadZip(files).blob();
    }

    private async loadAllModels(building: Building) {
        const buildingURLs = await this.database.getModels(building);
        for (const url of buildingURLs) {
            const {entries} = await unzip(url);

            const fileNames = Object.keys(entries);

            //load all the fragments in this zip file

            for (let i = 0; i < fileNames.length; i++) {
                const name = fileNames[i];
                if (!name.includes(".glb")) continue;

                //const geometryName = fileNames[i]
                const geometry = await entries[name].blob();
                const geometryURL = URL.createObjectURL(geometry);

                const dataName = name.substring(0, name.indexOf(".glb")) + ".json";
                const dataBlob = await entries[dataName].blob();

                const dataURL = URL.createObjectURL(dataBlob);

                await this.fragments.load(geometryURL, dataURL);

                this.fragments.culler.needsUpdate = true;
            }
        }
    }
}