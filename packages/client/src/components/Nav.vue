<template>
  <div
    :class="
      ['/example/login', '/example/home'].includes(route.path)
        ? 'nav-wrapper nav-border'
        : 'nav-wrapper'
    "
  >
    <ul class="nav-wrapper-left">
      <div class="logo-img" @click="router.push('/')">
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
      <li class="nav-item" @click="router.push('/example')">
        <span
          :class="
            ['/example', , '/example/login', '/example/home'].includes(
              route.path
            )
              ? 'nav-item-title active'
              : 'nav-item-title'
          "
          >Example</span
        >
      </li>
    </ul>
    <ul class="nav-wrapper-right">
      <el-tooltip content="User Guide" placement="bottom">
        <li class="right-icon" @click="viewGuide">
          <img src="@/assets/images/guide.svg" alt="guide" />
        </li>
      </el-tooltip>
      <el-tooltip content="Github" placement="bottom">
        <li class="right-icon" @click="viewGithub">
          <img src="@/assets/images/github.svg" alt="github" />
        </li>
      </el-tooltip>
    </ul>
    <el-dialog
      v-model="openGuideVisible"
      title="User Guide"
      width="50%"
      :before-close="handleClose"
    >
      <UserGuideContent />
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import UserGuideContent from '@/components/UserGuideContent.vue'

const openGuideVisible = ref(false)
const route = useRoute()
const router = useRouter()

const viewGithub = () => {
  window.open('https://github.com/guMcrey/web-authn-completed-app')
}

const viewGuide = () => {
  openGuideVisible.value = true
}

const handleClose = () => {
  openGuideVisible.value = false
}
</script>

<style lang="stylus" scoped>
.nav-wrapper
  padding 0 10%
  display flex
  justify-content space-between
  align-items center
  position fixed
  top 0
  right 0
  left 0
  z-index 99
.nav-border
  background-color #fff
  border-bottom 1px solid #dcdfe6
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
.nav-wrapper-right
  display flex
  align-items center
  gap 30px
.right-icon
  width 25px
  height auto
  img
    max-width 100%
    max-height 100%
  &:hover
    transform scale(1.1)
    transition all 0.3s ease-out
    cursor pointer
@media screen and (max-width 1024px)
  .nav-wrapper
    padding 15px 27px
    border-bottom 1px solid #dcdfe6
    background-color #fff
  .nav-item
    display none
</style>
