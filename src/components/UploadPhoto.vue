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
const base64ImageMatcher = RegExp("^data:(image/[^;]*)[^,]*,")
// const base64PrefixSearcher = RegExp("^data:[^,]*,")
const customLabels = ref(Array<string>())
const base64String = ref("")
const preview = ref(new Image)
const uploadStatus = ref("")


function uploadPhoto() {
  const imageTypeMatches = base64String.value.match(base64ImageMatcher)
  if (imageTypeMatches === null || imageTypeMatches.length != 2) {
    console.log("unable to find image type")
    return
  }

  const contentType = imageTypeMatches[1]
  var cleanedBase64String = base64String.value.replace(base64ImageMatcher, "")

  apiClient.uploadPhoto(cleanedBase64String, contentType, customLabels.value)
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

    console.log("read result: ", e.target.result)
    if (e.target.result === null || e.target.result instanceof ArrayBuffer) {
      console.log("file reader result was null or an array buffer")
      return
    }
    
    base64String.value = e.target.result
    preview.value = new Image
    preview.value.src = base64String.value
  }

  reader.readAsDataURL(file)
}

</script>


<template>
  <form @submit.prevent="uploadPhoto">
    
    <input @change="showPreview" id="fileInput" type="file" accept="image/*" multiple />
    <p>
      <output>
        <img :src="preview.src">
      </output>
    </p>
    <p>
      <textarea v-model="customLabels" placeholder="custom labels (e.g. cat,dog)" />
    </p>
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
