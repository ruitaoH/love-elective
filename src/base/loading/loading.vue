<template>
  <div class="loading">
    <img class="img" src="./loading.gif" />
    <p class="text">{{ title }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '正在载入. . .'
    }
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
@import "~common/stylus/variable"

.loading
  width: 100%
  text-align: center
  font-size: 0
  .img
    width: 0.48rem
    height: 0.48rem
  .text
    line-height: 0.56rem
    font-size: $font-size-medium
    color: $color-text-l
</style>
