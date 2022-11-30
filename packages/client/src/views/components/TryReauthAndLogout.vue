<template>
  <div class="options-list">
    <SignInWithPasskey
      clickType="re-auth"
      :username="username"
      :buttonText="'Try Reauth'"
      :authAvailable="authAvailable"
      :authList="authList"
      :getAuthLoading="getAuthLoading"
    />
    <el-button
      type="warning"
      round
      plain
      :icon="Unlock"
      size="large"
      :loading="loading"
      @click="clickHandler"
    >
      Logout
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import {PropType} from 'vue'
import {Unlock} from '@element-plus/icons-vue'
import SignInWithPasskey from './SignInWithPasskey.vue'
import {IAuthItem} from '@/interfaces/auth'
import {ElMessageBox} from 'element-plus'
import {useLogout} from '@/apis/useLogin'

defineProps({
  getAuthLoading: {
    type: Boolean,
    default: false,
  },
  authList: {
    type: Array as PropType<IAuthItem[]>,
    default: () => [],
  },
  username: {
    type: String,
    default: '',
  },
  authAvailable: {
    type: Boolean,
    default: false,
  },
})

const {loading, logoutHandler} = useLogout()

const clickHandler = () => {
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
.add-key-btn
  margin-left 10px
.identify-icon
  width 22px
</style>
