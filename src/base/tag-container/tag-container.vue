<template>
  <ul class="tag-container" ref="tagContainer">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  props: {
    marginRightRem: {
      type: Number,
      default: -1
    }
  },
  mounted () {
    this._setMargin()
  },
  methods: {
    _setMargin () {
      let tagContainer = this.$refs.tagContainer
      let tags = tagContainer.children

      let containerWidth = tagContainer.clientWidth
      let marginPX = this.marginRightRem * parseInt(document.documentElement.style.fontSize)

      let index = 0
      let width = tags[index].clientWidth
      let lastLine = 0

      for (let i = 1; i < tags.length; i++) {
        let item = tags[i]
        let newWidth = width + marginPX + item.clientWidth

        if (newWidth <= containerWidth) {
          tags[index].style.marginRight = `${this.marginRightRem}rem`

          width = newWidth
        } else if (width + item.clientWidth <= containerWidth) { // 一行最后一个元素，间隔margin放不下，没有margin能放下 ---> 换行
          tags[index].style.marginRight = `${this.marginRightRem}rem`

          width = item.clientWidth
          lastLine = i
        } else {
          width = item.clientWidth
          lastLine = i
        }
        index = i
      }

      for (let i = lastLine; i < tags.length; i++) {
        let item = tags[i]
        item.style.marginBottom = 0
      }
    }
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
@import "~common/stylus/variable"

.tag-container
  display: flex
  flex-wrap: wrap
  align-content: flex-start
</style>
