import { getApp } from "firebase/app";
import { Building } from "../../types";
import { FirebaseStorage, getDownloadURL, getStorage, ref } from "firebase/storage";
import { ModelDatabase } from "./dexie-utils";

// CORS problem solution: https://stackoverflow.com/a/58613527

export class BuildingDatabase {
    private db: ModelDatabase;

    constructor(){
        this.db = new ModelDatabase()
    }

    async getModels(building: Building) {
        await this.db.open();
        const appInstance = getApp();
        const instance = getStorage(appInstance);

        const urls: { id: string, url: string }[] = [];
        for (const model of building.models) {
            const url = await this.getModelUrl(instance, model.id);
            const id = model.id;
            urls.push({url, id});
        }
        this.db.close();

        return urls;
    }

    async clearCache(building: Building) {
        await this.db.open();
        for (const model of building.models) {
            localStorage.removeItem(model.id);
        }
        await this.db.delete();
        this.db = new ModelDatabase();
        this.db.close();
    }

    async deleteModels(ids: string[]) {
        await this.db.open();
        for (const id in ids) {
        if (this.isModelCached(id)) {
            localStorage.removeItem(id);
            await this.db.models.where("id").equals(id).delete();
            }
        }
        this.db.close();
    }

    private async getModelUrl(instance: FirebaseStorage, id: string) {
        if (this.isModelCached(id)) {
            return this.getModelFromLocalCache(id);
        } else {
            return this.getModelFromFirebase(instance, id);
        }
    }

    private async getModelFromFirebase(instance: FirebaseStorage, id: string) {
        const fileRef = ref(instance, id);
        const url = await getDownloadURL(fileRef);
        await this.cacheModel(id, url);
        console.log("Got model from Firebase");
        return url;
    }

    private async getModelFromLocalCache(id: string) {
        const found = await this.db.models.where("id").equals(id).toArray();
        const file = found[0].file;
        console.log("Got model from local cache");
        return URL.createObjectURL(file);
    }

    private isModelCached(id: string) {
        const stored = localStorage.getItem(id);
        return stored !== null;
    }

    private async  cacheModel(id: string, url: string) {
        const time = performance.now().toString();
        localStorage.setItem(id, time);
        const rawData = await fetch(url);
        const file = await rawData.blob();
        await this.db.models.add({ id, file });
    }
}