<script setup lang="ts">

const props = defineProps<{
  src: string
}>()

</script>

<template>
  <p>
    <img :src=src class="img-fluid"/>
  </p>
</template>