<template>
  <div class="product-introduction-page">
    <div class="page-left">
      <div class="page-title">{{ t('product.title') }}</div>
      <div :class="locale === 'en' ? 'page-subtitle' : 'page-subtitle-zh'">
        {{ t('product.subtitle1') }}
        <el-link href="https://simplewebauthn.dev/docs">SimpleWebAuthn</el-link>
        {{ t('product.subtitle2') }}
      </div>
      <div class="page-buttons">
        <el-button
          type="primary"
          :size="clientType() === 'PC' ? 'large' : 'default'"
          :icon="Monitor"
          @click="tryDemo"
        >
          {{ t('product.tryDemo') }}
        </el-button>
        <el-button
          :size="clientType() === 'PC' ? 'large' : 'default'"
          @click="viewGithub"
        >
          <template #icon>
            <img
              class="github-icon"
              src="@/assets/images/github.svg"
              alt="github"
            />
          </template>
          {{ t('product.viewGithub') }}
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
          {{ data.latestUser }} {{ t('product.and') }}
          <strong v-loading="loading">{{ data.count }}</strong>
          {{ t('product.users') }}
        </div>
      </div>
      <div class="page-working-best">
        <div class="working-best-title">
          {{ t('product.workBestTitle') }}
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
import {clientType} from '@/lib/functions'
import {useI18n} from 'vue-i18n'

const {t, locale} = useI18n()
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
.page-subtitle-zh
  margin-top 35px
  font-size 16px
  line-height 34px
  color #2c2c2c
.page-subtitle
  margin-top 35px
  font-size 18px
  line-height 32px
  color #333
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
@media screen and (max-width 1024px)
  .product-introduction-page
    position relative
    display flex
    flex-direction column
  .page-left
    max-width 100%
  .page-title
    font-size 36px
  .page-subtitle
    margin-top 25px
    font-size 17px
  .page-buttons
    margin-top 25px
    width 100%
    display flex
    align-items center
  .page-users
    margin-top 45px
    margin-left 0
    .users-avatar
      display none
    .users-title
      flex-wrap wrap
  .page-working-best
    margin-bottom 30px
    .working-best-list
      display flex
      align-items flex-start
      flex-direction column
    .working-best-item
      display flex
      align-items center
      gap 8px
      font-size 16px
      img
        max-width 24px
        max-height 24px
  .page-right
    display none
  :deep(.el-button)
    font-size 16px
</style>
