<template>
  <div class="header-container">
    <div class="container-left" @click="jumpToIndex">
      <div class="container-left-icon">
        <img src="@/assets/images/logo.svg" alt="logo" />
      </div>
      <div class="container-left-title">
        WebAuthn Completed App
      </div>
    </div>
    <div class="container-right">
      <el-tooltip content="User Guide" placement="bottom">
        <div class="container-right-item" @click="viewGuide">
          <img src="@/assets/images/guide.svg" alt="guide" />
        </div>
      </el-tooltip>
      <el-tooltip content="Github" placement="bottom">
        <div class="container-right-item" @click="jumpToGithub">
          <img src="@/assets/images/github.svg" alt="github" />
        </div>
      </el-tooltip>
    </div>
  </div>
  <el-dialog
    v-model="openGuideVisible"
    title="User Guide"
    width="50%"
    :before-close="handleClose"
  >
    <div class="device-type-select">
      <div class="device-type-title">Device type</div>
      <el-select
        v-model="deviceType"
        placeholder="Select Device Type"
        size="large"
        style="flex: 1;"
      >
        <el-option
          v-for="item in deviceOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
          <div class="device-options">
            <span>{{ item.label }}</span>
            <span class="device-type-browser">{{ item.browser }}</span>
          </div>
        </el-option>
      </el-select>
    </div>

    <div class="video-area">
      <video v-if="deviceType === 'win10'" controls>
        <source
          src="@/assets/videos/Edge108-WIN10.webm"
          type="video/webm"
        />
        <source
          src="@/assets/videos/Edge108-WIN10.mp4"
          type="video/mp4"
        />
      </video>
      <video v-if="deviceType === 'mobile-ios'" controls>
        <source
          src="@/assets/videos/MobileSafari14-IOS14.webm"
          type="video/webm"
        />
        <source
          src="@/assets/videos/MobileSafari14-IOS14.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'

const router = useRouter()
const openGuideVisible = ref(false)
const deviceType = ref('win10')
const deviceOptions = [
  {value: 'win10', label: 'Windows 10', browser: 'Edge 108.0.1462.76'},
  {value: 'mobile-ios', label: 'IOS 14', browser: 'Mobile Safari 14.1.1'},
]

const viewGuide = () => {
  openGuideVisible.value = true
}

const handleClose = () => {
  openGuideVisible.value = false
}

const jumpToGithub = () => {
  window.open('https://github.com/guMcrey/web-authn-completed-app')
}

const jumpToIndex = () => {
  router.push('/')
}
</script>

<style lang="stylus" scoped>
.header-container
  position fixed
  top 0
  right 0
  left 0
  padding 0 40px
  height 50px
  background-color rgba(255, 255, 255, 0.8)
  backdrop-filter blur(10px)
  display flex
  align-items center
  justify-content space-between
  border-bottom 1px solid #dcdfe6
  z-index 99
.container-left
  display flex
  align-items center
  justify-content center
  gap 10px
  cursor pointer
.container-left-icon
  width 24px
  height 24px
  overflow hidden
  img
    max-width 100%
    max-height 100%
.container-left-title
  font-size 15px
  font-weight 500
  color #303133
.container-right
  display flex
  align-items center
  justify-content space-between
  gap 26px
.container-right-item
  width 24px
  height auto
  overflow hidden
  &:hover
    transition all 0.3s
    transform scale(1.2)
    cursor pointer
  img
    max-width 100%
    max-height 100%
.device-type-select
  display flex
  align-items center
  gap 10px
.device-options
  display flex
  justify-content space-between
  gap 20px
.device-type-browser
  color #909399
  font-size 13px
.device-type-title
  font-size 15px
  font-weight 500
.video-area
  margin-top 20px
  border 1px solid #e5e5e5
  display flex
  justify-content center
  video
    max-width 100%
  .video-mobile
    max-width 50%

@media screen and (max-width 1024px)
  .header-container
    padding 0 20px
  .container-left-icon
    width 18px
    height 18px
  .container-left-title
    font-size 13px
  .container-right-item
    width 18px
</style>
