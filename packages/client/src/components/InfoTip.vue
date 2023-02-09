<template>
  <div class="info-tip-container">
    <el-icon><InfoFilled /></el-icon>
    {{ content || t('home.noSupport') }}
  </div>
</template>

<script lang="ts" setup>
import {InfoFilled} from '@element-plus/icons-vue'
import {useI18n} from 'vue-i18n'

const {t} = useI18n()

defineProps({
  content: {
    type: String,
    default: '',
  },
})
</script>

<style lang="stylus">
.info-tip-container
  margin-top 8px
  display flex
  align-items flex-start
  gap 8px
  font-size 13px
  color #888
  .el-icon
    margin-top 5px
</style>
