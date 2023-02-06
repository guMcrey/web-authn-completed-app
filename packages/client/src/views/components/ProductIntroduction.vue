<template>
  <div class="product-introduction-page">
    <div class="page-left">
      <div class="page-title">WebAuthn Completed App</div>
      <div class="page-subtitle">
        A complete application based on
        <el-link href="https://simplewebauthn.dev/docs">SimpleWebAuthn</el-link
        >. It is a new way to sign in that works completely without passwords,
        it allows websites to authenticate users using built-in authenticators
        such as Apple TouchID and Windows Hello or mobile device biometric
        sensor; and provide users with a more secure and easy login experience.
      </div>
      <div class="page-buttons">
        <el-button type="primary" size="large" :icon="Monitor" @click="tryDemo">
          Try the Demo
        </el-button>
        <el-button size="large" @click="viewGithub">
          <template #icon>
            <img
              class="github-icon"
              src="@/assets/images/github.svg"
              alt="github"
            />
          </template>
          View on Github
        </el-button>
      </div>
      <div class="page-users">
        <div class="users-title">
          <img
            v-for="item in 3"
            class="users-avatar"
            src="@/assets/images/avatar.svg"
            alt="avatar"
          />
          {{ data.latestUser }} and
          <strong v-loading="loading">{{ data.count }}</strong> users have
          experienced it
        </div>
      </div>
      <div class="page-working-best">
        <div class="working-best-title">
          Working with the best
        </div>
        <ul class="working-best-list">
          <li class="working-best-item">
            <img src="@/assets/images/mac.svg" alt="mac" />
            MacOS 13+
          </li>
          <li class="working-best-item">
            <img src="@/assets/images/windows.svg" alt="windows" />
            Windows 10/11
          </li>
          <li class="working-best-item">
            <img src="@/assets/images/ios.svg" alt="ios" />
            IOS 14+
          </li>
          <li class="working-best-item">
            <img src="@/assets/images/android.svg" alt="android" />
            Android 9+
          </li>
        </ul>
      </div>
    </div>
    <div class="page-right" @click="tryDemo">
      <img src="@/assets/images/preview.gif" alt="preview" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted} from 'vue'
import {Monitor} from '@element-plus/icons-vue'
import {useGetLatestUserAndUserCount} from '@/apis/useUser'
import {useRouter} from 'vue-router'

const router = useRouter()

const {data, loading, fetchData} = useGetLatestUserAndUserCount()

const tryDemo = () => {
  router.push('/example')
}

const viewGithub = () => {
  window.open('https://github.com/guMcrey/web-authn-completed-app')
}

onMounted(() => {
  fetchData()
  console.log('data', data)
})
</script>

<style lang="stylus" scoped>
.product-introduction-page
  position relative
  display flex
  align-items flex-start
  justify-content space-between
  gap 60px
.page-left
  max-width 50%
.page-title
  font-size 42px
  font-weight bold
  line-height 45px
.page-subtitle
  margin-top 35px
  font-size 18px
  line-height 30px
.page-buttons
  margin-top 35px
.github-icon
  width 20px
.page-right
  position relative
  z-index 1
  max-width 25%
  filter drop-shadow(1px 2px 30px rgba(15,27,41,.35))
  img
    max-width 100%
    max-height 100%
    border-radius 12px
  &:hover
    cursor pointer
.page-users
  margin-top 75px
  margin-left 12px
  .users-avatar
    width 25px
    height 25px
    margin-left -12px
    border 1px solid #fff
    border-radius 50%
  .users-title
    display flex
    align-items center
    gap 5px
    font-size 16px
    font-weight 500
.page-working-best
  border-top 1px solid #f1f1f1
  margin-top 16px
  padding-top 16px
  .working-best-title
    font-size 16px
    color #ABABAB
  .working-best-list
    margin-top 15px
    display flex
    align-items center
    gap 20px
  .working-best-item
    display flex
    align-items center
    gap 5px
    font-size 16px
    img
      max-width 24px
      max-height 24px
:deep(.el-button)
  font-size 17px
</style>
