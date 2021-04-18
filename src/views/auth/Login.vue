<template>
  <div class="login">
    <h3 class="error" v-if="error">{{ error }}</h3>
    <h2 class="log_title">Log In</h2>
    <form @submit.prevent="handelSubmit">
      <input type="text" v-model="email" placeholder="Email" required />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        required
      />
      <button v-if="!isPending">log in</button>
      <button v-if="isPending" disabled>loading...</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useLogin } from "@/composables/Login";
import { useRouter } from "vue-router";

export default {
  name: "login",
  setup() {
    const { isPending, error, login } = useLogin();
    const email = ref("");
    const password = ref("");
    const router = useRouter();

    const handelSubmit = async () => {
      await login(email.value, password.value);

      if (!error.value) {
        router.push({ name: "Home" });
        console.log("user log in");
      }
    };
    return { email, password, handelSubmit, error, isPending };
  }
};
</script>

<style lang="scss" scoped></style>
