<template>
  <div class="sign-in-button">
    <el-button
      type="primary"
      size="large"
      :loading="getAuthLoading"
      :disabled="!isAuthenticatorAvailable"
      round
      @click="clickHandler"
    >
      <template #icon>
        <img class="identify-icon" src="@/assets/images/identify-icon.svg" />
      </template>
      Sign in with passkey
    </el-button>
    <InfoTip v-if="!isAuthenticatorAvailable" />
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted, computed} from 'vue'
import {ElMessageBox} from 'element-plus'
import 'element-plus/es/components/message-box/style/css'
import {useGetAuthByUsername} from '@/apis/useAuth'

const {
  data: authList,
  loading: getAuthLoading,
  fetchData: fetchAuthByUsername,
} = useGetAuthByUsername()

const isAuthenticatorAvailable = ref(false)

const username = computed(() => {
  return localStorage.getItem('username') || ''
})

const authenticatorAvailable = async () => {
  if (window.PublicKeyCredential) {
    isAuthenticatorAvailable.value = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
  } else {
    isAuthenticatorAvailable.value = false
  }
}

const findPasskeyHandler = async (username: string) => {
  await fetchAuthByUsername(username)
  if (!authList.value.length) {
    ElMessageBox.alert(
      "You don't have a passkey yet. Please use username & password to sign in.",
      'No passkey',
      {
        type: 'info',
        confirmButtonText: 'OK',
      }
    )
    return
  }
}

const clickHandler = () => {
  if (!username.value) {
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
        findPasskeyHandler(value)
      })
      .catch((e) => {
        console.error(e)
      })
    return
  }
  findPasskeyHandler(username.value)
}

onMounted(() => {
  authenticatorAvailable()
})
</script>

<style lang="stylus" scoped>
.sign-in-button
  width 100%
  margin-top 30px
  .el-button
    width 100%
.identify-icon
  width 22px
</style>
