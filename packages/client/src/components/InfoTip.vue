<template>
  <div class="info-tip-container">
    <el-icon><InfoFilled /></el-icon>
    {{ content }}
  </div>
</template>

<script lang="ts" setup>
import {InfoFilled} from '@element-plus/icons-vue'

defineProps({
  content: {
    type: String,
    default:
      'This device or browser does not support User Verifying Platform Authenticator.',
  },
})
</script>

<style lang="stylus">
.info-tip-container
  margin-top 8px
  display flex
  align-items flex-start
  gap 8px
  font-size 13px
  color #888
  .el-icon
    margin-top 5px
</style>
