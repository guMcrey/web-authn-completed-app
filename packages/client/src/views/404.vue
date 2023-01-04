<template>
  <Nav />
  <div class="page-container-wrapper">
    <div class="container-image">
      <img src="@/assets/images/404.webp" alt="404" />
    </div>
    <div class="container-content">
      <div class="content-title">Oops!</div>
      <div class="content-subtitle">
        We can't seem to find the page you are looking for.
      </div>
      <el-button type="primary" text size="large" @click="goBack"
        >Go Back</el-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useRouter} from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.push('/')
}
</script>

<style lang="stylus" scoped>
.page-container-wrapper
  min-height calc(100vh - 51px)
  display flex
  align-items center
  justify-content center
  flex-direction column
  background-color #fff
.container-image
  width 460px
  img
    max-width 100%
    max-height 100%
.container-content
  margin-top 30px
  display flex
  justify-content center
  align-items center
  flex-direction column
  gap 10px
.content-title
  font-size 30px
  font-weight bold
  color #ED6D68
.content-subtitle
  font-size 16px
  color #3F3F3F
  text-align center
.el-button
  font-size 17px

@media screen and (max-width 1024px)
  .page-container-wrapper
    padding 0 22px
  .container-image
    max-width 65%
  .content-subtitle
    font-size 13px
</style>
