<template>
  <Nav />
  <div class="product-info">
    <ProductIntroduction />
  </div>
</template>

<script lang="ts" setup>
import ProductIntroduction from './components/ProductIntroduction.vue'
</script>

<style lang="stylus" scoped>
.product-info
  margin-top 73px
  min-height calc(100vh - 73px)
  padding 0 10%
  display flex
  align-items center
  background-color #fff
  &:after
    content ""
    display block
    position absolute
    top 0
    right 0
    width 60%
    height 100vh
    background-image url('@/assets/images/product-bg.svg')
    background-position top right
    background-size contain
    background-repeat no-repeat
</style>
