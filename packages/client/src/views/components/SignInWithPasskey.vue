<template>
  <div class="sign-in-button">
    <el-button
      type="primary"
      size="large"
      :loading="getAuthLoading || signInRequestLoading || signInResponseLoading"
      :disabled="!authAvailable"
      round
      @click="clickHandler"
    >
      <template #icon>
        <img class="identify-icon" src="@/assets/images/identify-icon.svg" />
      </template>
      {{ buttonText }}
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import {ref, watch, PropType} from 'vue'
import {ElMessage, ElMessageBox} from 'element-plus'
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
    default: 'login',
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

const emits = defineEmits(['clickAuth'])
const currentUsername = ref('')

const {
  data: signInRequestData,
  loading: signInRequestLoading,
  confirmHandler: signInRequestHandler,
} = useSignInRequest()

const {
  loading: signInResponseLoading,
  confirmHandler: signInResponseHandler,
} = useSignInResponse()

const findPasskeyHandler = async () => {
  if (props.clickType === 'login') {
    return ElMessageBox.alert(
      "You don't have a passkey yet. Please use username & password to sign in.",
      'No passkey',
      {
        type: 'info',
        confirmButtonText: 'OK',
      }
    )
  }
  if (props.clickType === 're-auth') {
    return ElMessage.warning('Please add a passkey first.')
  }
}

const signInHandler = async (username: string) => {
  await signInRequestHandler(username)
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
  await signInResponseHandler(signInRequestData, username)
  if (props.clickType === 're-auth') {
    ElMessage.success('Authentication successful.')
  }
}

const clickHandler = () => {
  if (!props.username) {
    ElMessageBox.prompt(
      'Username supports letters, numbers and underscores.',
      'Username',
      {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        inputPlaceholder: 'Enter your username',
        inputPattern: /^[0-9a-zA-Z_]{4,8}$/,
        inputErrorMessage:
          'Please enter a 4-8 characters consisting of letter, number and underscore.',
      }
    )
      .then(async ({value}) => {
        emits('clickAuth', props.username || value)
        currentUsername.value = value
      })
      .catch((e) => {
        console.error(e)
      })
    return
  }
  currentUsername.value = props.username
  emits('clickAuth', props.username)
}

watch(
  () => props.authList,
  async () => {
    if (props.authList.length) {
      await signInHandler(currentUsername.value)
    } else {
      await findPasskeyHandler()
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
