<template>
  <div>
    <div class="container-header">
      <div class="container-title">{{ t('home.hello') }}, {{ username }}</div>
      <Logout />
    </div>
    <el-card class="passkey-card">
      <div class="card-title">{{ t('home.cardTitle') }}</div>
      <div class="card-subtitle">
        {{ t('home.cardSubtitle') }}
        <strong>FIDO2</strong>
        {{ t('home.cardSubtitle2') }}
      </div>
      <img class="card-icon" src="@/assets/images/focus.jpg" alt="focus" />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import Logout from './Logout.vue'
import {useI18n} from 'vue-i18n'

const {t} = useI18n()

defineProps({
  username: {
    type: String,
    default: '',
  },
})
</script>

<style lang="stylus" scoped>
.container-header
  display flex
  align-items center
  justify-content space-between
  gap 10px
.container-title
  font-size 26px
  font-weight bold
.passkey-card
  position relative
  margin 30px 0
  padding 2px
  background linear-gradient(to right, rgba(233, 236, 247, 0.2) 0%, rgba(233, 236, 247, 0.7) 70%, rgba(233, 236, 247, 0.2) 100%)
  border-radius 20px
.card-title
  margin-left 20px
  font-size 18px
  font-weight 600
  color #2b97ec
  font-style italic
.card-subtitle
  margin 8px 0 0 20px
  font-size 14px
  color #909090
  line-height 18px
.card-icon
  position absolute
  top 8px
  left 10px
  width 22px
  height 22px
@media screen and (max-width 1024px)
  .card-title
    font-size 16px
  .card-subtitle
    font-size 12px
</style>
