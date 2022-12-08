<template>
  <div v-if="loading" class="global-loading">
    <img src="@/assets/images/loading.gif" alt="loading" />
  </div>
  <router-view v-else />
</template>

<script lang="ts" setup>
import {onMounted} from 'vue'
import {useLoginUser} from '@/apis/useLogin'

const {loading, fetchData} = useLoginUser()

onMounted(() => {
  fetchData()
})
</script>

<style lang="stylus" scoped>
.global-loading
  background-color #FCFCFC
  display flex
  align-items center
  justify-content center
  height 100vh
  img
    max-width 32%
    max-height auto
</style>
