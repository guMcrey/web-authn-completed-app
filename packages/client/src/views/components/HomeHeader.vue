<template>
  <div>
    <div class="container-title">Hello, {{ username }}</div>
    <div class="passkey-card">
      <div class="card-title">Passkeys count</div>
      <div class="card-value">
        {{ authCount }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
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
.container-title
  font-size 26px
  font-weight bold
.passkey-card
  margin 30px 0
  padding 20px
  background-color #409eff
  border-radius 20px
  display flex
  align-items center
  justify-content space-between
.card-title, .card-value
  font-size 18px
  font-weight 500
  color #fff
</style>
