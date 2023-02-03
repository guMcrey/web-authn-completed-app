<template>
  <div class="nav-wrapper">
    <ul class="nav-wrapper-left">
      <div class="logo-img">
        <img src="@/assets/images/logo.svg" alt="logo" />
      </div>
      <li class="nav-item" @click="router.push('/')">
        <span
          :class="
            route.path === '/' ? 'nav-item-title active' : 'nav-item-title'
          "
          >Product</span
        >
      </li>
      <li class="nav-item" @click="router.push('/login')">
        <span
          :class="
            route.path === '/login' ? 'nav-item-title active' : 'nav-item-title'
          "
          >Example</span
        >
      </li>
    </ul>
    <ul class="nav-wrapper-right">
      <li class="github-icon" @click="">
        <img src="@/assets/images/github.svg" alt="github" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import {useRoute, useRouter} from 'vue-router'

const route = useRoute()
const router = useRouter()
</script>

<style lang="stylus" scoped>
.nav-wrapper
  padding 0 10%
  display flex
  justify-content space-between
  align-items center
.nav-wrapper-left
  display flex
  align-items center
.nav-item
  margin 25px 0 25px 30px
.nav-item-title
  color #1c2b33
  font-size 17px
  font-weight normal
  padding 8px
  font-weight 500
  &:hover
    border-bottom 2px solid #409eff
    transition all 0.3s
    cursor pointer
.active
  border-bottom 2px solid #409eff
.logo-img
  width 30px
  height auto
  padding-right 40px
  display flex
  align-items center
  img
    max-width 100%
    max-height 100%
.github-icon
  width 25px
  height auto
  img
    max-width 100%
    max-height 100%
.search-btn:hover
  background-color #8500FE
  transition all 0.3s linear
  cursor pointer
  .search-icon
    transform translateY(-200px)
    filter drop-shadow(0 200px #fff)
</style>
