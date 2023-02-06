<template>
  <router-view />
</template>

<script lang="ts" setup>
import {onMounted} from 'vue'

onMounted(() => {
  setTimeout(() => {
    const loadingEl = document.querySelector('.global-loading') as HTMLElement
    loadingEl.style.display = 'none'
  }, 800)
})
</script>
