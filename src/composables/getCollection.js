import { ref } from "vue";
import { db } from "../firebase/config.js";


const getCollection = (collection, query) => {
    const documents = ref(null);
    const error = ref(null);


    let collectionRef = db.collection(collection).orderBy('createdAt', "desc")
    if (query) {
        collectionRef = db.collection(collection).where(...query)
    }

    collectionRef.onSnapshot(snap => {
        let results = [];
        snap.docs.forEach(doc => {
            doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
        });
        documents.value = results;

        error.value = null;
    }, (err) => {
        documents.value = null;
        error.value = "Could not fetch data";
    })



    return { error, documents }
}

export default getCollection;