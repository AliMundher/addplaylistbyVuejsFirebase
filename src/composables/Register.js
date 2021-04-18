import { ref } from "vue";
import { auth } from "../firebase/config";

// ref
const error = ref(null);
const isPending = ref(false);

const register = async (displayName, email, password) => {
    error.value = null;
    isPending.value = true;
    try {
        let res = await auth.createUserWithEmailAndPassword(email, password);
        isPending.value = false;
        if (!res) {
            throw new Error('Could not complete the register')
        }
        await res.user.updateProfile({ displayName })
        error.value = null;
        return res
    } catch (err) {
        error.value = err.message;
        isPending.value = false;
    }
}

export const useRegister = () => {

    return { error, register, isPending }
}