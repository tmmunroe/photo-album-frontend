<script setup lang="ts">
import { useImage } from '@vueuse/core'

const props = defineProps<{
  src: string
}>()

useImage({src: props.src})

</script>

<template>
    <img :src=src />
</template>