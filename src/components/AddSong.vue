<template>
  <div class="add-song">
    <button class="btn_add" @click="showForm = !showForm">Add Song</button>
    <h3>Add New Song</h3>
    <form v-if="showForm" @submit.prevent="handelSubmit">
      <input type="text" placeholder="Song Title" v-model="title" />
      <input type="text" placeholder="Artist" v-model="artist" />
      <button class="btn">Add</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useDelete } from "../composables/useDocument";

export default {
  name: "AddSong",
  props: ["document"],
  setup(props) {
    const title = ref("");
    const artist = ref("");
    const showForm = ref(false);
    const { updateDoc } = useDelete("PlayList", props.document.id);

    const handelSubmit = async () => {
      const newSong = {
        title: title.value,
        artist: artist.value,
        id: Math.floor(Math.random() * 1000000)
      };
      await updateDoc({
        songs: [...props.document.songs, newSong]
      });
      title.value = "";
      artist.value = "";
    };

    return { artist, title, showForm, handelSubmit };
  }
};
</script>

<style scoped>
.add-song h3 {
  margin: 20px 0;
}
.add-song .btn_add {
  width: 130px;
  padding: 8px;
  background-color: transparent;
  border: 2px solid #555;
  margin-top: 3%;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.1em;
  transition: all 0.3s ease-in-out;
}
</style>
