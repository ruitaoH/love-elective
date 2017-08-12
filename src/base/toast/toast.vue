<template>
  <transition name="fade">
    <div class="toast">
      <img class="img" src="./tick.png" />
      <p class="text">{{ text }}</p>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '提交成功'
    }
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
@import "~common/stylus/variable"

.toast
  width: 2.4rem
  height: 2.4rem
  margin: 0 auto
  box-sizing: border-box
  padding-top: 0.6rem
  text-align: center
  background: #2e2e2e
  border-radius: 0.1rem
  font-size: 0
  .img
    width: 0.99rem
    height: 0.71rem
  .text
    margin-top: 0.38rem
    font-size: $font-size-medium-x
    color: $color-text
</style>
