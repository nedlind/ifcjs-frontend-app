import { BuildingScene } from "./building-scene"

export const buildingHandler = {
    viewer: null as BuildingScene | null,

    async start(container: HTMLDivElement) {
        if (!this.viewer) {
            this.viewer = new BuildingScene(container);
        }
    },

    remove() {
        if (this.viewer) {
            this.viewer.dispose();
            this.viewer = null;
        }
    },

    async convertIfcToFragments(ifc: File) {
        if (!this.viewer) {
            throw new Error("Builing viewer not active!");
        }
        return this.viewer.convertIfcToFragments(ifc);
    }
}