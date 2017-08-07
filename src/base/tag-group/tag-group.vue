<template>
  <div class="tag-group">
    <span class="title">{{ title }}</span>
    <ul class="tag-list">
      <li class="tag-item"
          v-for="(item, index) in data"
          :class="{ selected: selectIndex === index }"
          @click="select(index)">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: null
    },
    selectString: {
      type: String,
      default: ''
    }
  },
  methods: {
    select (index) {
      // 向父组件传递所选中的值
      this.$emit('select', this.data[index])
    }
  },
  computed: {
    selectIndex () {
      return this.selectString ? this.data.indexOf(this.selectString) : -1
    }
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
@import "~common/stylus/variable"

.tag-group
  display: flex
  align-items: center
  margin-bottom: 0.52rem
  .title
    font-size: $font-size-medium-x
    color: $color-text-d
    margin: 0 0.46rem 0 0.52rem
  .tag-list
    display: flex
    .tag-item
      height: 0.48rem
      line-height: 0.44rem
      box-sizing: border-box
      padding: 0 0.3rem
      text-align: center
      font-size: $font-size-medium-x
      color: $color-border-green
      border: 0.02rem solid $color-border-green
      border-radius: $border-radius-s
      margin-right: 0.32rem
      &:last-child
        margin-right: 0
      &.selected
        color: $color-text
        background: $color-border-green
</style>
