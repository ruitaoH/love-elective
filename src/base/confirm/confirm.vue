<template>
  <transition name="confirm-fade">
    <div class="confirm" v-show="showFlag">
      <div class="confirm-wrapper">
        <div class="confirm-content">
          <p class="text">{{ text }}</p>
          <div class="operate">
            <div @click="cancel" class="operate-btn left">{{ cancelBtnText }}</div>
            <div @click="confirm" class="operate-btn">{{ confirmBtnText }}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    cancelBtnText: {
      type: String,
      default: '取消'
    },
    confirmBtnText: {
      type: String,
      default: '确定'
    }
  },
  data () {
    return {
      showFlag: false
    }
  },
  methods: {
    show () {
      this.showFlag = true
    },
    hide () {
      this.showFlag = false
    },
    cancel () {
      this.hide()
      this.$emit('cancel')
    },
    confirm () {
      this.hide()
      this.$emit('confirm')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"

.confirm
  position: fixed
  top: 0
  bottom: 0
  left: 0
  right: 0
  z-index: 998
  background: $mask
  &.confirm-fade-enter-active
    animation: confirm-fadein 0.3s
    .confirm-content
      animation: confirm-zoom 0.3s
  .confirm-wrapper
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
    z-index: 999
    .confirm-content
      width: 5rem
      margin: 0 auto
      border-radius: 0.12rem
      background: #fff
      .text
        padding: 0.3rem 0
        line-height: 0.4rem
        text-align: center
        font-size: $font-size-large
        color: $color-text-d
      .operate
        display: flex
        align-items: center
        text-align: center
        font-size: $font-size-large
        .operate-btn
          flex: 1
          line-height: 22px
          padding: 10px 0
          border-top: 1px solid $color-border
          color: $color-text-d
          &.left
            border-right: 1px solid $color-border

  @keyframes confirm-fadein
    0%
      opacity: 0
    100%
      opacity: 1

  @keyframes confirm-zoom
    0%
      transform: scale(0)
    50%
      transform: scale(1.1)
    100%
      transform: scale(1)
</style>
