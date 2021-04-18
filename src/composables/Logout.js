import { ref } from "vue";
import { auth } from "../firebase/config";

// ref
const error = ref(null);
const isPending = ref(false);

const logout = async () => {
    error.value = null;
    isPending.value = true;
    try {
        await auth.signOut();
    } catch (err) {
        error.value = err.message;
        isPending.value = false;
    }
}

export const useLogout = () => {
    return { error, logout, isPending }
}