<script setup lang="ts">
// import WelcomeItem from './WelcomeItem.vue'
// import DocumentationIcon from './icons/IconDocumentation.vue'
// import SupportIcon from './icons/IconSupport.vue'
import { ref, reactive, type Ref, watch } from "vue"
import { ApiClient } from '../services/PhotoAlbumService'
import { useFileDialog, useBase64, useImage } from '@vueuse/core'

const apiClient = new ApiClient()
const base64ImageMatcher = RegExp("^data:(image/[^;]*)[^,]*,")
const customLabels = ref(Array<string>())
const base64String: Ref<string | null> = ref(null)

const { files, open, reset } = useFileDialog({multiple: false})


// update base64string if file changes
watch(files, (newFiles) => {
  if (newFiles === null) {
    console.log('no new files')
    base64String.value = null
    return
  }

  const file = newFiles[0]

  const reader = new FileReader()
  reader.onload = (e: ProgressEvent<FileReader>) => {
    if (e.target === null) {
      console.log("file reader failed to read file")
      return
    }

    console.log("read result: ", e.target.result)
    if (e.target.result === null || e.target.result instanceof ArrayBuffer) {
      console.log("file reader result was null or an array buffer")
      return
    }
    
    base64String.value = e.target.result
  }

  reader.readAsDataURL(file)
})


// upload photo
function uploadPhoto() {
  if (typeof base64String.value != 'string') {
    console.log("base64String not set")
    return
  }

  const imageTypeMatches = base64String.value.match(base64ImageMatcher)
  if (imageTypeMatches === null || imageTypeMatches.length != 2) {
    console.log("unable to find image type")
    return
  }

  const contentType = imageTypeMatches[1]
  var cleanedBase64String = base64String.value.replace(base64ImageMatcher, "")

  apiClient.uploadPhoto(cleanedBase64String, contentType, customLabels.value)
}


</script>


<template>


  <button type="button" @click="open()">
    Choose files
  </button>
  <button type="button" :disabled="!files" @click="reset()">
    Reset
  </button>
  <template v-if="files">
    <p>You have selected: <b>{{ files![0].name }} files</b></p>
    <div v-if="typeof base64String === 'string'">
      <img :src=base64String class="img-fluid img-thumbnail">
    </div>
  </template>

  
  <p>
      <textarea v-model="customLabels" placeholder="custom labels (e.g. cat,dog)" />
  </p>

  <p>
    <button @click="uploadPhoto" :disabled="base64String===null">Upload</button>
  </p>

<!-- 
  <p> Custom labels {{customLabels}} </p>
  <p> Base64String {{base64String}} </p> -->
  <!-- <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Documentation</template>

    Vue’s
    <a href="https://vuejs.org/" target="_blank" rel="noopener">official documentation</a>
    provides you with all information you need to get started.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Support Vue</template>

    As an independent project, Vue relies on community backing for its sustainability. You can help
    us by
    <a href="https://vuejs.org/sponsor/" target="_blank" rel="noopener">becoming a sponsor</a>.
  </WelcomeItem> -->
</template>

<style>
.thumbnail {
  max-width: 20%;
  height: auto;
}
</style>