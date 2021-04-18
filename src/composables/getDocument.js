import { ref, watchEffect } from "vue";
import { db } from "../firebase/config.js";


const getDocument = (collection, id) => {
    const document = ref(null);
    const error = ref(null);

    let documentRef = db.collection(collection).doc(id)
    documentRef.onSnapshot(doc => {
        if (doc.data()) {
            document.value = { ...doc.data(), id: doc.id }
            error.value = null;
        }
        else {
            error.value = "that document dose not exist"
        }

    }, (err) => {
        console.log(err.message)
        error.value = "Could not fetch document";
    })



    return { error, document }
}

export default getDocument;