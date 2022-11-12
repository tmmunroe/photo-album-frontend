<script setup lang="ts">

const props = defineProps<{
  src: string
}>()

</script>

<template>
  <img :src=src class="img-fluid photo"/>
</template>

<style>
.photo {
  max-height: 100%;
  min-width: 100%;
  object-fit: cover;
  vertical-align: bottom;
  padding: 1em;
}
</style>