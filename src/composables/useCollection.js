import { ref } from "vue";
import { db } from "../firebase/config";


const useCollection = (collection) => {
    const error = ref(null);
    const isPending = ref(false);

    const addDoc = async (doc) => {
        error.value = null;
        isPending.value = true;
        try {
            let res = await db.collection(collection).add(doc);
            isPending.value = false;
            return res;
        } catch (err) {
            error.value = "Could not sen the message";
            isPending.value = false;
        }
    }

    return { error, addDoc, isPending }

}

export default useCollection;