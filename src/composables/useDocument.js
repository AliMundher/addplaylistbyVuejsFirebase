import { ref, watchEffect } from "vue";
import { db } from "../firebase/config.js";

export const useDelete = (collection, id) => {
    const error = ref(null);
    const isPending = ref(false);
    let docRef = db.collection(collection).doc(id)

    // Delete Only One Document
    const deleteDoc = async () => {
        error.value = null;
        isPending.value = true;
        try {
            const res = await docRef.delete();
            isPending.value = false;
            return res
        } catch (err) {
            error.value = "Could not delete the document";
            isPending.value = false;
        }
    }

    // Update
    const updateDoc = async (doc) => {
        error.value = null;
        isPending.value = true;
        try {
            const res = await docRef.update(doc);
            isPending.value = false;
            return res
        } catch (err) {
            error.value = "Could not update the document";
            isPending.value = false;
        }
    }

    return { error, deleteDoc, updateDoc }
}