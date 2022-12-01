<template>
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
            :username="username"
            :getAuthLoading="getAuthLoading"
            :authList="authList"
            :authAvailable="isAuthenticatorAvailable"
            @clickAuth="clickAuthHandler"
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

const clickAuthHandler = async (name: string) => {
  await fetchAuthByUsername(name || username.value)
}

onMounted(() => {
  authenticatorAvailable()
})
</script>

<style lang="stylus" scoped>
.page-container-wrapper
  min-height calc(100vh - 30px)
  display flex
  align-items center
  justify-content center
  background-color #fff
.page-container
  width 700px
.container-header
  width 120px
  min-height 92px
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
  .tips-text
    margin-top 10px
    font-size 13px
    font-weight 400
    position relative
</style>
