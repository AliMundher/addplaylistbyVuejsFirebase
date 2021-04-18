import { ref } from "vue";
import { auth } from "../firebase/config";

// ref
const error = ref(null);
const isPending = ref(false);

const login = async (email, password) => {
    error.value = null;
    isPending.value = true;
    try {
        let res = await auth.signInWithEmailAndPassword(email, password);
        error.value = null;
        isPending.value = false;

        return res;
    } catch (err) {
        error.value = "this email is not exists";
        isPending.value = false;
    }
}


export const useLogin = () => {
    return { error, login, isPending }
}