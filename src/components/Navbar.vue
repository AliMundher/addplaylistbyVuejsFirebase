<template>
  <nav class="nav">
    <div class="title">
      logo
    </div>

    <div class="links">
      <div v-if="user" class="user">
        <router-link :to="{ name: 'CreatePlayList' }"
          >CreatePlayList</router-link
        >
        <router-link :to="{ name: 'Home' }">Home</router-link>
        <router-link :to="{ name: 'Userplaylist' }">My PlayList</router-link>
        <button @click="handelLogout">Log out</button>
      </div>
      <div v-else>
        <router-link :to="{ name: 'Login' }">Log In</router-link>
        <router-link :to="{ name: 'Register' }">Register</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { useLogout } from "@/composables/Logout";
import { getUser } from "@/composables/getUser";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { error, logout } = useLogout();
    const { user } = getUser();
    const router = useRouter();

    const handelLogout = async () => {
      await logout();
      router.push({ name: "Login" });
      console.log("user log out");
    };
    return { error, handelLogout, user };
  }
};
</script>

<style scoped>
nav button {
  width: 100px;
  padding: 8px;
  margin-left: 7px;
  background-color: transparent;
  border: 1px solid #555;
  cursor: pointer;
}
.user a:first-child {
  width: 150px !important;
}
</style>
