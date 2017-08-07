<template>
  <div class="split">
    <div class="line"></div>
    <div class="text">{{ text }}</div>
    <div class="line"></div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
@import "~common/stylus/variable"

.split
  display: flex
  margin: 0 auto
  padding: 0.34rem 1.5rem
  .line
    flex: 1
    position: relative
    top: 0.1rem
    border-top: 0.02rem solid $color-border
  .text
    padding: 0 0.3rem
    font-size: $font-size-medium
    color: $color-text-l
</style>
