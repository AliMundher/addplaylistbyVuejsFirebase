<template>
  <div class="my-playlist">
    <h3>My PlayList</h3>
    <div v-if="documents">
      <ListView :playlists="documents" />
      <router-link :to="{ name: 'CreatePlayList' }" class="btn"
        >Create PlayList</router-link
      >
    </div>
    <h2 v-else>My PLayList is Empty</h2>
  </div>
</template>

<script>
import getCollection from "@/composables/getCollection";
import { getUser } from "@/composables/getUser";
import ListView from "@/components/ListView";

export default {
  name: "Userplaylist",
  components: { ListView },
  setup() {
    const { user } = getUser();
    const { documents } = getCollection("PlayList", [
      "userId",
      "==",
      user.value.uid
    ]);
    console.log("+++++++", documents);
    return { documents };
  }
};
</script>

<style lang="scss" scoped></style>
