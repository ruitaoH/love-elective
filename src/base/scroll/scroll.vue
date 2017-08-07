<template>
  <div ref="scrollWrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    },
    enable: {
      type: Boolean,
      default: true
    },
    beforeScroll: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    _initScroll () {
      if (!this.$refs.scrollWrapper) {
        return
      }

      this.scroll = new BScroll(this.$refs.scrollWrapper, {
        probeType: this.probeType,
        click: this.click
      })

      if (!this.enable) {
        this._disable()
      }

      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScroll')
        })
      }
    },
    _enable () {
      this.scroll && this.scroll.enable()
    },
    _disable () {
      this.scroll && this.scroll.disable()
    }
  },
  watch: {
    data () {
      setTimeout(() => {
        this.refresh()
      }, 20)
    },
    enable (newVal) {
      if (newVal) {
        this._enable()
      } else {
        this._disable()
      }
    }
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
</style>
