<script setup lang="ts">
import { computed, ref, watch, type Ref } from "vue"
import { ApiClient, type PhotoInfo  } from '../services/PhotoAlbumService'

// defineProps<{
//   msg: string
// }>()

const apiClient = new ApiClient()
const query = ref('')
const queryResultMessage = ref('')
const photos: Ref<Array<PhotoInfo> | null> = ref(null)

async function searchForPhotos() {
  queryResultMessage.value = ''
  console.log(`Searching for ${query.value}...`)
  photos.value = await apiClient.searchPhotos(query.value)
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

  <div>
    <ul>
      <li v-for="photo in photos" :key="photo.url">
        {{photo.url}}
      </li>
    </ul>
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
