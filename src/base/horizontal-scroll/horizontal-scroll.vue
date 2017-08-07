<template>
  <div ref="scrollWrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  mounted () {
    setTimeout(() => {
      this._setWidth()
      this._initScroll()
    }, 20)
  },
  methods: {
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    scrollToElement () {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    _setWidth () {
      let scrollWrappr = this.$refs.scrollWrapper
      let scrollGroup = scrollWrappr.children[0]
      let children = scrollGroup.children
      const length = children.length

      if (length <= 2) {
        return
      }

      // const px2rem = parseInt(document.documentElement.style.fontSize)
      let clientWidth = scrollWrappr.clientWidth
      let width = (0.55 * (length - 1) + 0.45) * clientWidth // 设置ul的宽度

      // 设置每个子元素的宽度
      for (let i = 0; i < length - 1; i++) {
        let item = children[i]
        item.style.width = clientWidth * 0.45 + 'px'
        item.style.marginRight = clientWidth * 0.1 + 'px'
      }
      children[length - 1].style.width = clientWidth * 0.45 + 'px'

      scrollGroup.style.width = width + 'px'
    },
    _initScroll () {
      this.scroll = new BScroll(this.$refs.scrollWrapper, {
        scrollX: true,
        scrollY: false
      })

      this.scroll.disable()
    }
  },
  watch: {
    data () {
      setTimeout(() => {
        this._setWidth()
        this.refresh()
      }, 20)
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
