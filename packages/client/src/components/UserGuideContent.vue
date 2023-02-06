<template>
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
      <source src="@/assets/videos/Edge108-WIN10.webm" type="video/webm" />
      <source src="@/assets/videos/Edge108-WIN10.mp4" type="video/mp4" />
    </video>
    <video v-if="deviceType === 'mobile-ios'" controls>
      <source
        src="@/assets/videos/MobileSafari14-IOS14.webm"
        type="video/webm"
      />
      <source src="@/assets/videos/MobileSafari14-IOS14.mp4" type="video/mp4" />
    </video>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'

const deviceType = ref('win10')
const deviceOptions = [
  {value: 'win10', label: 'Windows 10', browser: 'Edge 108.0.1462.76'},
  {value: 'mobile-ios', label: 'IOS 14', browser: 'Mobile Safari 14.1.1'},
]
</script>

<style lang="stylus" scoped>
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
</style>
