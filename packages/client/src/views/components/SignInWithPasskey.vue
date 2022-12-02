<template>
  <div class="sign-in-button">
    <el-button
      type="primary"
      size="large"
      :loading="getAuthLoading || signInRequestLoading || signInResponseLoading"
      :disabled="!authAvailable"
      round
    >
      <template #icon>
        <img class="identify-icon" src="@/assets/images/identify-icon.svg" />
      </template>
      {{ buttonText }}
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import {watch, PropType} from 'vue'
import {ElMessageBox} from 'element-plus'
import 'element-plus/es/components/message-box/style/css'
import {useSignInRequest, useSignInResponse} from '@/apis/useAuth'
import {IAuthItem} from '@/interfaces/auth'

const props = defineProps({
  buttonText: {
    type: String,
    default: 'Sign in with passkey',
  },
  authAvailable: {
    type: Boolean,
    default: false,
  },
  clickType: {
    type: String,
    default: '',
  },
  authList: {
    type: Array as PropType<IAuthItem[]>,
    default: () => [],
  },
  getAuthLoading: {
    type: Boolean,
    default: false,
  },
  username: {
    type: String,
    default: '',
  },
})

const emits = defineEmits(['clear', 'authSuccess'])

const {
  data: signInRequestData,
  loading: signInRequestLoading,
  confirmHandler: signInRequestHandler,
} = useSignInRequest()

const {
  loading: signInResponseLoading,
  confirmHandler: signInResponseHandler,
} = useSignInResponse()

const signInHandler = async () => {
  await signInRequestHandler(props.username)
  const credId = localStorage.getItem(`credId`)
  const challenge = localStorage.getItem('challenge')
  if (!signInRequestData || !challenge) return
  if (!credId) {
    ElMessageBox.alert(
      'Passkey is unavailable because data may not exist due to clearing cache.',
      'No passkey',
      {
        type: 'info',
        confirmButtonText: 'OK',
      }
    )
    return
  }
  await signInResponseHandler(signInRequestData, props.username)
  emits('authSuccess')
}

watch(
  () => props.clickType,
  () => {
    if (props.clickType) {
      signInHandler()
      emits('clear')
    }
  }
)
</script>

<style lang="stylus" scoped>
.sign-in-button
  width 100%
  .el-button
    width 100%
.identify-icon
  width 22px
</style>
