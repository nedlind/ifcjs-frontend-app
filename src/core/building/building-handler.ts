import { Building, Floorplan } from "../../types";
import { BuildingScene } from "./building-scene"
import { Events } from "../../middleware/event-handler";

export const buildingHandler = {
    viewer: null as BuildingScene | null,

    async start(container: HTMLDivElement, building: Building, events: Events) {
        if (!this.viewer) {
            this.viewer = new BuildingScene(container, building, events);
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
    },

    async deleteModels(ids: string[]) {
        if (this.viewer) {
            await this.viewer.database.deleteModels(ids);
        }
    },

    async refreshModels(building: Building, events: Events) {
        if (this.viewer) {
            const container = this.viewer.container;
            this.viewer.dispose();
            this.viewer = null;
            this.viewer = new BuildingScene(container, building, events);
        }
    },

    explode(active: boolean) {
        if (this.viewer) {
            this.viewer.explode(active);
        }
    },

    toggleClippingPlanes(active: boolean) {
        if (this.viewer) {
            this.viewer.toggleClippingPlanes(active);
        }
    },
    toggleDimensions(active: boolean) {
        if (this.viewer) {
            this.viewer.toggleDimensions(active);
        }
    },
    toggleFloorplan(active: boolean, floorplan?: Floorplan) {
        if (this.viewer) {
            console.log("buildinghandler")
            this.viewer.toggleFloorplan(active, floorplan);
        }
    }
}