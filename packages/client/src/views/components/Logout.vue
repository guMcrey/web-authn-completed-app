<template>
  <el-button
    round
    type="warning"
    :icon="Unlock"
    :loading="loading"
    size="large"
    @click="clickLogoutHandler"
  >
    Logout
  </el-button>
</template>

<script lang="ts" setup>
import { Unlock } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import { useLogout } from '@/apis/useLogin'

const { loading, logoutHandler } = useLogout()

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
