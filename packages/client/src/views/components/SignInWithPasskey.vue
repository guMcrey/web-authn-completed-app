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
  data: signInResponseData,
  confirmHandler: signInResponseHandler,
} = useSignInResponse()

const signInHandler = async () => {
  await signInRequestHandler(props.username || '')
  if (!signInRequestData?.id) return
  await signInResponseHandler(signInRequestData, props.username || '')
  if (!signInResponseData?.credId) return
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
