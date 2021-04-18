import { ref } from "vue";
import { auth } from "../firebase/config";

// ref
const user = ref(auth.currentUser);

auth.onAuthStateChanged(_user => {
    user.value = _user;
});

export const getUser = () => {
    return { user }
}