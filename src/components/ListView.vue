<template>
  <div v-for="play in playlists" :key="play.id">
    <router-link :to="{ name: 'Details', params: { id: play.id } }">
      <div class="single">
        <div class="thumbnail">
          <img :src="play.coverUrl" alt="" />
        </div>
        <div class="info">
          <h2 class="title">{{ play.title }}</h2>
          <p>Created by {{ play.userName }}</p>
        </div>
        <div class="songs">
          <h3>{{ play.songs.length }}</h3>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "listView",
  props: ["playlists"]
};
</script>

<style scoped>
.single {
  display: flex;
  align-items: center;
  background-color: #eee;
  padding: 20px;
  margin: 16px 0;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}
.single:hover {
  background-color: #ccc;
  transform: scale(1.01);
}
.thumbnail {
  width: 100px;
  height: 100px;
}
.thumbnail img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  display: block;
}
.info {
  margin: 0 30px;
}
.info .title {
  text-transform: capitalize;
}
.songs {
  margin-left: auto;
}
</style>
