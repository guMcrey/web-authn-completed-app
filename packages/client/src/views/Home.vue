<template>
  <Nav />
  <div class="page-container-wrapper">
    <div class="page-container">
      <HomeHeader :username="username"></HomeHeader>
      <InfoTip
        v-if="!isAuthenticatorAvailable"
        :content="`${t('home.noSupport')}${t('home.noAdd')}`"
      />
      <PasskeyList
        v-if="isAuthenticatorAvailable"
        v-loading="getAuthLoading"
        :username="username"
        :authList="authList"
        @change="fetchAuthByUsername(username)"
      ></PasskeyList>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, computed, onMounted} from 'vue'
import {useRouter} from 'vue-router'
import HomeHeader from './components/HomeHeader.vue'
import PasskeyList from './components/PasskeyList.vue'
import {useGetAuthByUsername} from '@/apis/useAuth'
import {useLoginUser} from '@/apis/useLogin'
import {useI18n} from 'vue-i18n'

const {t} = useI18n()
const {fetchData} = useLoginUser()

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
    router.replace('/')
  }
  return username
})

onMounted(async () => {
  fetchData()
  if (!username.value) return
  await authenticatorAvailable()
  await fetchAuthByUsername(username.value)
})
</script>

<style lang="stylus" scoped>
.page-container-wrapper
  margin-top 73px
  position relative
  min-height calc(100vh - 73px)
  display flex
  justify-content center
  background-color #fff
.page-container
  width 750px
  padding 50px 27px 30px

@media screen and (max-width 1024px)
  .page-container
    width 100%
    padding 30px 22px
</style>
