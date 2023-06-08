import { act } from "@testing-library/react";
import { Building } from "../../types";
import { BuildingScene } from "./building-scene"

export const buildingHandler = {
    viewer: null as BuildingScene | null,

    async start(container: HTMLDivElement, building: Building) {
        if (!this.viewer) {
            this.viewer = new BuildingScene(container, building);
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

    async refreshModels(building: Building) {
        if (this.viewer) {
            const container = this.viewer.container;
            this.viewer.dispose();
            this.viewer = null;
            this.viewer = new BuildingScene(container, building);
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
}