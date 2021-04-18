<template>
  <div class="playlist">
    <h2>Create New PlayList</h2>
    <form class="form" @submit.prevent="handelSubmit">
      <input
        type="text"
        placeholder="PlayList Title"
        required
        v-model="title"
      />
      <textarea
        cols="30"
        rows="10"
        required
        v-model="description"
        placeholder="PlayList Description"
      ></textarea>
      <!-- Upload Image -->
      <label>Upload PlayList Cover Image</label>
      <input type="file" @change="handelChange" />
      <h2 class="error">{{ fileError }}</h2>
      <button class="create" v-if="!isPending">Create</button>
      <button class="create" v-if="isPending">Saving...</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStorage } from "@/composables/useStorage";
import useCollection from "@/composables/useCollection";
import { getUser } from "@/composables/getUser";
import { timestamp } from "@/firebase/config";
import { useRouter } from "vue-router";

export default {
  name: "createPlayList",
  setup() {
    const { filePath, url, uploadImage } = useStorage();
    const { error, addDoc } = useCollection("PlayList");
    const { user } = getUser();
    const router = useRouter();

    const title = ref("");
    const description = ref("");
    const file = ref(null);
    const fileError = ref(null);
    const isPending = ref(false);

    const handelSubmit = async () => {
      if (file.value) {
        isPending.value = true;
        await uploadImage(file.value);
        let res = await addDoc({
          title: title.value,
          description: description.value,
          userId: user.value.uid,
          userName: user.value.displayName,
          coverUrl: url.value,
          filePathUrl: filePath.value,
          songs: [],
          createdAt: timestamp()
        });
        isPending.value = false;
        if (!error.value) {
          console.log("playlist added");
          router.push({ name: "Details", params: { id: res.id } });
        }
      }
    };

    // Allowed file type
    const types = ["image/png", "image/jpeg"];

    const handelChange = e => {
      const select = e.target.files[0];

      if (select && types.includes(select.type)) {
        file.value = select;
        fileError.value = null;
      } else {
        file.value = null;
        fileError.value = "Please Select An Image File (png or jpg)";
      }
    };
    return {
      title,
      description,
      handelSubmit,
      handelChange,
      fileError,
      filePath,
      isPending
    };
  }
};
</script>

<style scoped>
.playlist {
  width: 70%;
  margin: 5% auto;
}
.playlist h2 {
  margin-bottom: 10px;
}
</style>
