<template>
  <router-view />
</template>

<script lang="ts" setup>
import {onMounted} from 'vue'
import {useLoginUser} from '@/apis/useLogin'

const {fetchData} = useLoginUser()

onMounted(() => {
  const loadingEl = document.querySelector('.global-loading') as HTMLElement
  loadingEl.style.display = 'none'
  fetchData()
})
</script>
