<template>
  <div v-loading="getAuthLoading" class="page-container-wrapper">
    <div class="page-container">
      <HomeHeader
        :username="username"
        :authCount="authList?.length"
      ></HomeHeader>
      <InfoTip
        v-if="!isAuthenticatorAvailable"
        content="This device or browser does not support User Verifying Platform Authenticator. You can't register a credential."
      />
      <PasskeyList
        v-if="isAuthenticatorAvailable"
        :username="username"
        :authList="authList"
        @change="fetchAuthByUsername(username)"
      ></PasskeyList>
      <TryReauthAndLogout />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, computed, onMounted} from 'vue'
import {useRouter} from 'vue-router'
import HomeHeader from './components/HomeHeader.vue'
import PasskeyList from './components/PasskeyList.vue'
import TryReauthAndLogout from './components/TryReauthAndLogout.vue'
import {useGetAuthByUsername} from '@/apis/useAuth'

const {
  data: authList,
  loading: getAuthLoading,
  fetchData: fetchAuthByUsername,
} = useGetAuthByUsername()

const router = useRouter()
const isAuthenticatorAvailable = ref(false)

const authenticatorAvailable = async () => {
  if (window.PublicKeyCredential) {
    isAuthenticatorAvailable.value = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
  } else {
    isAuthenticatorAvailable.value = false
  }
}

const username = computed(() => {
  const username = localStorage.getItem('username') || ''
  if (!username) {
    router.push('/')
  }
  return username
})

onMounted(async () => {
  await authenticatorAvailable()
  await fetchAuthByUsername(username.value)
})
</script>

<style lang="stylus" scoped>
.page-container-wrapper
  min-height 100vh
  display flex
  justify-content center
  background-color #fff
.page-container
  width 700px
  padding 50px 27px 30px
</style>
