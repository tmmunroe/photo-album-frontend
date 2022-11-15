<script setup lang="ts">
import { ref, watch, type Ref } from "vue"
import { useSpeechRecognition } from '@vueuse/core'
import { ApiClient } from '../services/PhotoAlbumService'
import PhotoAlbum from "./PhotoAlbum.vue"
// Speech
// defineProps<{
//   msg: string
// }>()

const base64Prefix = "data:image/jpeg;base64,"
const apiClient = new ApiClient()
const searching = ref(false)
const queryResultMessage = ref('')
const photos: Ref<string[]> = ref([])

const lang = ref('en-US')
const { isListening, isSupported, stop, start, result } = useSpeechRecognition({lang, continuous: true})


async function searchForPhotos() {
  searching.value = true
  if (isListening) {
    stop()
  }

  console.log(`Searching for ${result.value}...`)
  const photosRaw = await apiClient.searchPhotos(result.value)
  photos.value = photosRaw.map((s) => { return base64Prefix.concat(s) })
  // test many images
  // for (var i = 0; i < 100; i++ ){
  //   photosBase64.forEach((el) => {
  //     photos.value.push(el)
  //   })
  // }
  console.log(`Received ${photos.value.length} photos!`)

  searching.value = false
}

watch(searching, (newSearchingValue) => {
  if (newSearchingValue) {
    photos.value = []
    queryResultMessage.value = 'Searching...'
  } else {
    queryResultMessage.value = photos.value.length > 0 ? `Found ${photos.value.length} photos` : 'No photos found'
  }
})



</script>

<template>

  <div class="vstack">
    <div class="bg-white">
      <form @submit.prevent="searchForPhotos" class="d-flex justify-content-center fixed-top" style="margin-top: 100px;">
          <button v-if="!isListening" class="btn" type="button" @click="start">
            <i class="bi bi-mic"></i>
            <img src="./icons/mic.svg" alt="Bootstrap" width="32" height="32"/>
          </button>
          <button v-if="isListening" class="btn" type="button" @click="stop">
            <img src="./icons/mic-fill.svg" alt="Bootstrap" width="32" height="32"/>
          </button>
          <input class="form-control form-input" @keyup.enter="searchForPhotos" type="search" v-model="result" placeholder="Search" aria-label="Search">
          <button class="btn" type="submit">Search</button>
      </form>
  </div>

    <section>
      <div>
        <p>{{ queryResultMessage }}</p>
      </div>
    </section>

    <div class="container-fluid mt-2">
      <PhotoAlbum :photos=photos />
    </div>
  </div>

</template>
