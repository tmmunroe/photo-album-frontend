<script setup lang="ts">
import Photo from './Photo.vue'

const props = defineProps<{
  photos: Array<string>
}>()

</script>

<template>
    <div class="gallery">
        <div class="gallery-panel"
          v-for="photo in photos">
          <Photo :src=photo />
        </div>  
    </div>
</template>

<style>
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-gap: 1rem;
  max-width: 80rem;
  margin: 5rem auto;
  padding: 0 5rem;
}

.gallery-panel img {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 0.75rem;
}
</style>