<template>
  <Nav></Nav>
  <div class="product-info">
    <ProductIntroduction />
  </div>
</template>

<script lang="ts" setup>
import Nav from './components/Nav.vue'
import ProductIntroduction from './components/ProductIntroduction.vue'
</script>

<style lang="stylus" scoped>
.product-info
  // TODO: 考虑
  // position relative
  padding 0 10%
  height calc(100vh - 73px)
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
    background-repeat no-repeat;
</style>
