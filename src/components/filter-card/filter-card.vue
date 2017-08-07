<template>
  <div class="filter-card" :class="filterType">
    <ul>
      <li class="filter-item" v-for="(filter, index) in filterList" @click="select(index)">
        <div class="checkbox" :class="{ selected: filter.value }"></div>
        <span class="text">{{ filter.type }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    filterType: {
      type: String,
      default: ''
    },
    filterList: {
      type: Array,
      default: null
    }
  },
  methods: {
    select (index) {
      this.setFilter({
        type: this.filterType,
        index: index
      })
    },
    ...mapMutations({
      setFilter: 'SET_FILTER'
    })
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
@import "~common/stylus/variable"

.filter-card
  position: absolute
  z-index: 50
  top: 0.64rem
  width: 2.82rem
  box-sizing: border-box
  padding: 0.06rem 0 0.12rem
  background: #fff
  border-radius: $border-radius-m
  .filter-item
    display: flex
    justify-content: space-between
    height: 0.26rem
    padding: 0.2rem 0.76rem
    font-size: 0
    .checkbox
      flex: 0 0 0.26rem
      width: 0.26rem
      height: 0.26rem
      box-sizing: border-box
      border: 0.02rem solid $color-border-green
      border-radius: $border-radius-s
      &.selected
        background: $color-border-green
    .text
      line-height: 0.26rem
      font-size: $font-size-medium
      color: $color-text-d

.category
  left: 0
.assessment
  right: 0
.time, .place, .rollcall
  left: 50%
  transform: translateX(-50%)
.rollcall // 不点名不签到 ---> 布局有问题
  .filter-item
    display: block
    height: 0.26rem
    padding: 0.2rem 0 0.2rem 0.4rem
    font-size: 0
    text-align: left
    .checkbox, .text
      display: inline-block
      vertical-align: middle
    .checkbox
      margin-right: 0.3rem
</style>
