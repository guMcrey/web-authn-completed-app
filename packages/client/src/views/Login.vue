<template>
  <Nav />
  <div class="page-container-wrapper">
    <div class="page-container">
      <div class="container-header">
        <img
          src="@/assets/images/fido-passkey-bg.png"
          alt="fido-passkey-image"
        />
      </div>
      <div class="container-content">
        <div class="content-title">Sign in</div>
        <div class="content-detail">
          <SignInWithPasskey
            :username="username || usernameInput"
            :getAuthLoading="getAuthLoading"
            :authList="authList"
            :authAvailable="isAuthenticatorAvailable"
            :clickType="clickType"
            @click="clickSignInWithPasskeyHandler"
            @clear="clickType = ''"
            @authSuccess="authSuccessCallback"
          />
          <InfoTip v-if="!isAuthenticatorAvailable" />
          <div class="or-title">or</div>
          <LoginForm />
        </div>
      </div>
      <div class="tips-text">
        If the username does not exist, it will automatically register the user
        for you.
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted, computed} from 'vue'
import SignInWithPasskey from './components/SignInWithPasskey.vue'
import LoginForm from './components/LoginForm.vue'
import {ElMessageBox, ElMessage} from 'element-plus'
import 'element-plus/es/components/message-box/style/css'
import {useGetAuthByUsername} from '@/apis/useAuth'
import {clientType} from '@/lib/functions'

const {
  data: authList,
  loading: getAuthLoading,
  fetchData: fetchAuthByUsername,
} = useGetAuthByUsername()

const isAuthenticatorAvailable = ref(false)
const clickType = ref('')
const usernameInput = ref('')

const username = computed(() => {
  return localStorage.getItem('username') || ''
})

const credId = computed(() => {
  return localStorage.getItem('credId') || ''
})

const authenticatorAvailable = async () => {
  if (window.PublicKeyCredential) {
    isAuthenticatorAvailable.value = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
  } else {
    isAuthenticatorAvailable.value = false
  }
}

const clickSignInWithPasskeyHandler = async () => {
  if (!isAuthenticatorAvailable.value) return
  if (clientType() === 'Android') {
    useAndroidClickSignInWithPasskeyHandler()
  } else {
    clickType.value = 'login'
  }
}

const useAndroidClickSignInWithPasskeyHandler = async () => {
  if (username.value && !credId.value) {
    ElMessageBox.alert(
      '<p><strong>Please log in with username and password, then add the webAuthn device again.</strong></p><p>( Passkey is unavailable because data may not exist due to clearing cache )</p>',
      'Passkey is not available',
      {
        type: 'info',
        confirmButtonText: 'OK',
        dangerouslyUseHTMLString: true,
      }
    )
    return
  }
  if (!username.value) {
    ElMessageBox.prompt(
      'Please enter the username of the WebAuthn device that has been added. If not, please log in with the username and password first.',
      'Username',
      {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        inputPlaceholder: 'Enter your username',
        inputPattern: /^[a-zA-Z][a-zA-Z0-9_]{3,7}$/,
        inputErrorMessage:
          'Please enter 4-8 characters starting with a letter and consisting of letters, numbers and underscores.',
      }
    )
      .then(async ({value}) => {
        await findAuthAndSignIn(value)
        usernameInput.value = value
      })
      .catch((e) => {
        console.error(e)
      })
    return
  }

  await findAuthAndSignIn(username.value)
}

const findAuthAndSignIn = async (username: string) => {
  await fetchAuthByUsername(username)
  if (!authList.value.length) {
    ElMessageBox.alert(
      "You don't have a passkey yet. Please log in with the username and password first, and then try again after add the WebAuthn device.",
      'No passkey',
      {
        type: 'info',
        confirmButtonText: 'OK',
      }
    )
    return
  }
  clickType.value = 'login'
}

const authSuccessCallback = () => {
  ElMessage.success('Login successful.')
}

onMounted(() => {
  authenticatorAvailable()
})
</script>

<style lang="stylus" scoped>
.page-container-wrapper
  margin-top 51px
  position relative
  min-height calc(100vh - 51px)
  display flex
  align-items center
  justify-content center
  background-color #fff
.page-container
  width 750px
.container-header
  width 120px
  min-height 95px
  border-radius 100%
  margin 0 auto
  img
    max-width 100%
    max-height 100%
    border-radius 100%
.container-content
  flex 100%
  margin-top 40px
  padding 0 27px
.content-title
  font-size 26px
  font-weight bold
.content-detail
  margin 20px 0
  display flex
  align-items center
  justify-content center
  flex-direction column
.or-title
  font-size 18px
  font-weight bold
  margin 30px 0
.tips-text
  position absolute
  right 0
  bottom 1px
  left 0
  padding 6px
  font-size 14px
  font-weight 500
  color #f56c6c
  text-align center
  background-color #fff6f6
@media screen and (max-width 1024px)
  .page-container
    padding-top 10px
    width 100%
  .tips-text
    margin-top 30px
    font-size 13px
    font-weight 400
    position relative
</style>
