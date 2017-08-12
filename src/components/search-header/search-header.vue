<template>
  <div class="search-header">
    <div class="search-box-wrapper">
      <i class="icon-search"></i>
      <input type="search" class="box" ref="query" @click.prevent.stop="focus" v-model="query" :placeholder="placeholder" />
    </div>
    <div class="button" @click="search">
      搜索
    </div>
  </div>
</template>

<script>
import { debounce } from 'common/js/util'

export default {
  props: {
    placeholder: {
      type: String,
      default: '快速搜索课程名或教师名'
    }
  },
  data () {
    return {
      query: ''
    }
  },
  created () {
    this.$watch('query', debounce((newQuery) => {
      if (!newQuery.trim()) {
        this.$emit('setFlag', true)
      }
    }, 800))
  },
  methods: {
    focus () {
      this.$refs.query.focus()
    },
    blur () {
      this.$refs.query.blur()
    },
    search () {
      if (this.query.trim()) {
        this.$emit('setFlag', false)
        this.$emit('click', this.query)
      }
    },
    setQuery (query) {
      this.query = query
      this.search()
    }
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
@import "~common/stylus/variable"

.search-header
  display: flex
  top: 0
  left: 0
  width: 100%
  height: 1.24rem
  box-sizing: border-box
  padding: 0.28rem
  background: #fff
  border-bottom: 0.02rem solid $color-border
  .search-box-wrapper
    flex: 1
    margin-right: 0.1rem
    display: flex
    align-items: center
    background: $color-background
    border-radius: $border-radius-s
    font-size: 0
    .icon-search
      font-size: $font-size-large
      margin: 0 0.18rem
    .box
      flex: 1
      padding: 0.14rem 0 // 增加点击区域
      font-size: $font-size-medium-x
      background: $color-background
      &::placeholder
        color: $color-text-l
  .button
    flex: 0 0 1.3rem
    width: 1.3rem
    line-height: 0.66rem
    text-align: center
    font-size: $font-size-large
    color: $color-text
    background: $linear-gradient
    border-radius: $border-radius-s
</style>
