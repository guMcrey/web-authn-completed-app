<template>
  <el-button
    round
    type="warning"
    :icon="Unlock"
    :loading="loading"
    size="large"
    @click="clickLogoutHandler"
  >
    {{ t('home.logout') }}
  </el-button>
</template>

<script lang="ts" setup>
import {Unlock} from '@element-plus/icons-vue'
import {ElMessageBox} from 'element-plus'
import {useLogout} from '@/apis/useLogin'
import {useI18n} from 'vue-i18n'

const {t} = useI18n()

const {loading, logoutHandler} = useLogout()

const clickLogoutHandler = () => {
  ElMessageBox.confirm(t('message.logoutConfirm'), t('message.tips'), {
    confirmButtonText: t('message.confirmBtn'),
    cancelButtonText: t('message.cancelBtn'),
    type: 'warning',
  }).then(async () => {
    await logoutHandler()
  })
}
</script>
