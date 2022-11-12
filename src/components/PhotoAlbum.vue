<script setup lang="ts">
import Photo from './Photo.vue'

const props = defineProps<{
  photos: Array<string>
}>()

</script>

<template>
  <ul class="album">
    <li class="photo-box"
      v-for="photo in photos">
        <Photo :src=photo />
    </li>
    <li></li>  
  </ul>
</template>

<style>


ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
}

li {
  height: 40vh;
  flex-grow: 1;
}

li:last-child {
  flex-grow: 10;
}
</style>