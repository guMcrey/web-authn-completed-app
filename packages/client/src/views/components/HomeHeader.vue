<template>
  <div>
    <div class="container-header">
      <div class="container-title">Hello, {{ username }}</div>
      <Logout />
    </div>
    <el-card class="passkey-card">
      <div class="card-title">Passwordless Authentication</div>
      <div class="card-subtitle">
        Follow the <strong>FIDO2</strong> standard to set up your account for
        passwordless authentication.
      </div>
      <img class="card-icon" src="@/assets/images/focus.jpg" alt="focus" />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import Logout from './Logout.vue'

defineProps({
  username: {
    type: String,
    default: '',
  },
  authCount: {
    type: Number,
    default: 0,
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
  background linear-gradient(to right, rgba(233, 236, 247, 0.2) 0%, rgba(233, 236, 247, 0.8) 70%, rgba(233, 236, 247, 0.2) 100%)
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
.card-icon
  position absolute
  top 8px
  left 10px
  width 22px
  height 22px
</style>
