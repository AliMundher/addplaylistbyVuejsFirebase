<template>
  <div class="login">
    <h3 class="error" v-if="error">{{ error }}</h3>
    <h2 class="log_title">Register</h2>
    <form @submit.prevent="handelSubmit">
      <input
        type="text"
        v-model="displayName"
        placeholder="DisplayName"
        required
      />
      <input type="text" v-model="email" placeholder="Email" required />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        required
      />

      <button v-if="!isPending">Register</button>
      <button v-if="isPending" disabled>loading...</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRegister } from "@/composables/Register";
import { useRouter } from "vue-router";

export default {
  name: "login",
  setup() {
    const { isPending, error, register } = useRegister();
    const router = useRouter();
    const displayName = ref("");
    const email = ref("");
    const password = ref("");

    const handelSubmit = async () => {
      const res = await register(
        displayName.value,
        email.value,
        password.value
      );

      if (!error.value) {
        // console.log("user register");
        router.push({ name: "Userplaylist" });
      }
    };
    return { email, password, handelSubmit, error, isPending, displayName };
  }
};
</script>

<style lang="scss" scoped></style>
