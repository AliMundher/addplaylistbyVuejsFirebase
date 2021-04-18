import { ref } from "vue";
import { storage } from "../firebase/config";
import { getUser } from './getUser';


const { user } = getUser();
export const useStorage = () => {
    const error = ref(null);
    const url = ref(null);
    const filePath = ref(null);

    // Upload Image
    const uploadImage = async (file) => {
        filePath.value = `covers/${user.value.uid}/${file.name}`
        const storageRef = storage.ref(filePath.value)

        try {
            const res = await storageRef.put(file)
            url.value = await res.ref.getDownloadURL()
        } catch (err) {
            error.value = err.message
        }
    }

    // Delete Image
    const deleteImage = async (path) => {
        const storageRe = storage.ref(path);

        try {
            await storageRe.delete()
        } catch (err) {
            error.value = err.message
        }
    }

    return { error, url, filePath, uploadImage, deleteImage };
}