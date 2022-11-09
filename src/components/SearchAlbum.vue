<script setup lang="ts">
import { computed, ref, watch, type Ref } from "vue"
import { ApiClient } from '../services/PhotoAlbumService'
import Photo from "./Photo.vue"

// defineProps<{
//   msg: string
// }>()


const apiClient = new ApiClient()
const query = ref('')
const queryResultMessage = ref('')
const photos: Ref<string[] | null> = ref(null)


async function searchForPhotos() {
  const base64Prefix = "data:image/jpeg;base64,"
  queryResultMessage.value = ''
  photos.value = null
  console.log(`Searching for ${query.value}...`)
  const photosRaw = await apiClient.searchPhotos(query.value)
  photos.value = photosRaw.map((s) => { return base64Prefix.concat(s) })
  console.log(`Received ${photos.value.length} photos!`)
}

watch(photos, (newPhotos, oldPhotos) => {
  if (newPhotos === null) {
    queryResultMessage.value = ''
  } else {
    queryResultMessage.value = newPhotos.length > 0 ? `Found ${newPhotos.length} photos` : 'No photos found'
  }
})

</script>

<template>
  <section>
    <form @submit.prevent="searchForPhotos">
      <input type="text" v-model="query" />
      <button type="submit">Search</button>
    </form>
  </section>

  <section>
    <div>
      <p>{{ queryResultMessage }}</p>
    </div>
  </section>

  <!-- <div>
    <ul>
      <li v-for="photo in photos" :key="photo.url">
        <Photo :url="photo.url" />
      </li>
    </ul>
  </div> -->
  
  <div>
    <ul>
      <div v-for="photo in photos">
        <Photo :src="photo" />
      </div>
    </ul>
  </div>

  <div>
    <Photo 
      v-for="photo in photos"
      :src="photo"
    />
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
