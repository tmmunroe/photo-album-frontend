<script setup lang="ts">
// import WelcomeItem from './WelcomeItem.vue'
// import DocumentationIcon from './icons/IconDocumentation.vue'
// import SupportIcon from './icons/IconSupport.vue'
import { ref, reactive, type Ref } from "vue"
import { ApiClient, type PhotoInfo  } from '../services/PhotoAlbumService'

// defineProps<{
//   msg: string
// }>()

const apiClient = new ApiClient()
const filePath = ref("")
const customLabels = ref(Array<string>())
const preview = ref("")


function uploadPhoto() {
  var base64String:string = ""
  apiClient.uploadPhoto(base64String, customLabels.value)
}


function showPreview(e:Event) {
  console.log("showPreview called with ", e)

  const htmlTarget = e.target as HTMLInputElement
  if (htmlTarget === null) {
    console.log('html target was null')
    return
  }
  
  const files = htmlTarget.files
  if (files === null) {
    console.log('html target had no files')
    return
  }

  const file = files[0]

  const reader = new FileReader()
  reader.onload = (e: ProgressEvent<FileReader>) => {
    if (e.target === null) {
      console.log("file reader failed to read file")
      return
    }

    if (e.target.result === null || e.target.result instanceof ArrayBuffer) {
      console.log("file reader result was null or an array buffer")
      return
    }
    
    preview.value = e.target.result 
  }

  reader.readAsDataURL(file)
}

</script>


<template>
  <form @submit.prevent="uploadPhoto">
    
    <input @change="showPreview" id="fileInput" type="file" accept="image/*" multiple />
    <output img :src="preview"></output>

    <p><textarea v-model="customLabels" placeholder="custom labels (e.g. cat,dog)" /></p>

    <p>
    <button type="submit">Upload</button>
    </p>
  </form>

  <p> Custom labels {{customLabels}} </p>

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
