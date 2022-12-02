<template>
  <div class="options-list">
    <SignInWithPasskey
      :clickType="clickType"
      :username="username"
      :buttonText="'Try Reauth'"
      :authAvailable="authAvailable"
      :authList="authList"
      :getAuthLoading="getAuthLoading"
      @click="clickTryAuthHandler"
      @clear="clickType = ''"
      @authSuccess="authSuccessCallback"
    />
    <el-button
      type="warning"
      round
      plain
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
import {ref, PropType} from 'vue'
import {Unlock} from '@element-plus/icons-vue'
import SignInWithPasskey from './SignInWithPasskey.vue'
import {IAuthItem} from '@/interfaces/auth'
import {ElMessage, ElMessageBox} from 'element-plus'
import {useLogout} from '@/apis/useLogin'

const props = defineProps({
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
const clickType = ref('')

const clickLogoutHandler = () => {
  ElMessageBox.confirm('Confirm to logout?', 'Tips', {
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    type: 'warning',
  }).then(async () => {
    await logoutHandler()
  })
}

const clickTryAuthHandler = () => {
  if (!props.authList?.length) {
    return ElMessage.warning('Please add a passkey first.')
  }
  clickType.value = 're-auth'
}

const authSuccessCallback = () => {
  ElMessage.success('Authentication successful.')
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
