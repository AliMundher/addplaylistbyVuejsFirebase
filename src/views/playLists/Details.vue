<template>
  <div class="details">
    <h2 v-if="error">{{ error }}</h2>
    <div v-if="document" class="main">
      <div class="cover">
        <img :src="document.coverUrl" alt="" />
      </div>
      <!-- Some Info About PlatList -->
      <div class="info">
        <h3 class="title">{{ document.title }}</h3>
        <h3 class="name">Created By {{ document.userName }}</h3>
        <p class="des">{{ document.description }}</p>
        <button v-if="ownerShip" class="btn_delete" @click="handelDelete">
          Delete PlayList
        </button>
      </div>
    </div>
    <!-- Add Song -->
    <div class="song" v-if="document">
      <h3 v-if="!document.songs.length">
        No Songs have been added to this playlist yet
      </h3>
      <div v-for="song in document.songs" :key="song.id" class="info-song">
        <div class="buttons">
          <h3>{{ song.title }}</h3>
          <p>{{ song.artist }}</p>
        </div>
        <button
          class="btn_delete songs"
          v-if="ownerShip"
          @click="handelClick(song.id)"
        >
          delete
        </button>
      </div>
      <AddSong v-if="ownerShip" :document="document" />
    </div>
  </div>
</template>

<script>
import getDocument from "@/composables/getDocument";
import { getUser } from "@/composables/getUser";
import { useDelete } from "@/composables/useDocument";
import { computed } from "vue";
import { useStorage } from "@/composables/useStorage";
import { useRouter } from "vue-router";
import AddSong from "@/components/AddSong";

export default {
  name: "details",
  components: { AddSong },
  props: ["id"],
  setup(props) {
    const { error, document } = getDocument("PlayList", props.id);
    const { deleteDoc, isPending, updateDoc } = useDelete("PlayList", props.id);
    const { user } = getUser();
    const { deleteImage } = useStorage();
    const router = useRouter();

    const ownerShip = computed(() => {
      return (
        document.value && user.value && user.value.uid === document.value.userId
      );
    });

    const handelDelete = async () => {
      await deleteImage(document.value.filePathUrl);
      await deleteDoc();
      router.push({ name: "Home" });
    };

    const handelClick = async id => {
      const songs = document.value.songs.filter(song => song.id != id);
      await updateDoc({ songs: songs });
    };

    return { error, document, ownerShip, isPending, handelDelete, handelClick };
  }
};
</script>

<style scoped>
.details {
  margin-top: 6%;
}
.main {
  display: flex;
  align-items: center;
}
.cover {
  width: 250px;
  height: 250px;
}
.cover img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.info {
  width: 50%;
  margin: 0 30px;
}
.info .title {
  text-transform: capitalize;
}
.info .name {
  margin: 10px 0;
}
.btn_delete {
  margin-top: 15px;
  width: 140px;
  padding: 9px;
  font-weight: bold;
  background-color: transparent;
  border: 2px solid #555;
  cursor: pointer;
}
.btn_delete.songs {
  width: 100px;
  margin-bottom: 12px;
  border-radius: 100px;
}
.song {
  width: 53%;
  margin: 5% auto;
}
.info-song {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}
.info-song .buttons {
  flex-basis: 80%;
}
.info-song > button {
  flex-basis: 20%;
}
</style>
