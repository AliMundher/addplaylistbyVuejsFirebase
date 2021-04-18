<template>
  <div class="home">
    <h2>All PlayLists</h2>
    <h3 v-if="error">Could not fetch data</h3>
    <div v-if="documents">
      <ListView :playlists="documents" />
    </div>
  </div>
</template>

<script>
import getCollection from "../composables/getCollection";
import ListView from "../components/ListView";
export default {
  name: "Home",
  components: { ListView },
  setup() {
    const { documents, error } = getCollection("PlayList");

    return { documents, error };
  }
};
</script>

<style>
.home {
  margin-top: 5%;
}
</style>
