<script setup lang="ts">
import SearchAlbum from "../components/SearchAlbum.vue"
</script>

<template>
  <main>
    <SearchAlbum />
  </main>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
