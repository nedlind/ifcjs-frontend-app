import { Events } from './../../middleware/event-handler';
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { Building } from "../../types";
import { deleteDoc, doc, getFirestore } from 'firebase/firestore';
import { getApp } from 'firebase/app';

export const databaseHandler = {
    login: () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    },
    logout: () => {
        const auth = getAuth();
        signOut(auth);
    },

    deleteBuilding: async (building: Building, events: Events ) => {
        const id = building.uid;
        const dbInstance = getFirestore(getApp());
        await deleteDoc(doc(dbInstance, "buildings", id));
        events.trigger({ type: "CLOSE_BUILDING" });
    },
};