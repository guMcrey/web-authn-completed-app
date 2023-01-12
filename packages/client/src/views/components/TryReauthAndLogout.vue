<template>
  <div class="options-list">
    <el-button
      type="warning"
      round
      :icon="Unlock"
      size="large"
      :loading="loading"
      @click="clickLogoutHandler"
    >
      Logout
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import {Unlock} from '@element-plus/icons-vue'
import {ElMessageBox} from 'element-plus'
import {useLogout} from '@/apis/useLogin'

const {loading, logoutHandler} = useLogout()

const clickLogoutHandler = () => {
  ElMessageBox.confirm('Confirm to logout?', 'Tips', {
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    type: 'warning',
  }).then(async () => {
    await logoutHandler()
  })
}
</script>

<style lang="stylus" scoped>
.options-list
  position absolute
  bottom 10%
  display flex
  align-items center
  gap 12px
  .el-button
    width 125px
</style>
