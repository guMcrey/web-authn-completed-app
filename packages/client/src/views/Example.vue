<template>
  <Nav />
  <div v-loading="loading"></div>
</template>

<script lang="ts" setup>
import {useLoginUser} from '@/apis/useLogin'
import {onMounted} from 'vue'

const {loading, fetchData} = useLoginUser()

onMounted(() => {
  fetchData()
})
</script>
