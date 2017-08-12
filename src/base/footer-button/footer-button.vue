<template>
  <div class="footer-button" @click="clickHandler" ref="footerButton">
    <span class="text">{{ title }}</span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    clickHandler () { // 基础组件将事件分发出去给业务组件
      this.$emit('click')
    }
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
@import "~common/stylus/variable"

.footer-button
  width: 100%
  height: 0.98rem
  text-align: center
  background: $linear-gradient
  font-size: 0
  .text
    line-height: 0.98rem
    font-size: $font-size-largest
    color: $color-text
</style>
