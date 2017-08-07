<template>
  <div class="filter-tab">
    <div class="tab-item" v-for="(value, key) in filters" @click="selectFilter(key)">
      <span class="filter">{{ value.tag }}</span>
      <filter-card v-show="filterShow && filterShowType === key"
                   :filter-type="key"
                   :filter-list="value.list"></filter-card>
    </div>
  </div>
</template>

<script>
import FilterCard from 'components/filter-card/filter-card'

import { mapGetters, mapActions } from 'vuex'

export default {
  methods: {
    selectFilter (type) {
      this.showFilter(type)
    },
    ...mapActions([
      'showFilter'
    ])
  },
  computed: {
    ...mapGetters([
      'filters',
      'filterShow',
      'filterShowType'
    ])
  },
  components: {
    FilterCard
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
@import "~common/stylus/variable"

.filter-tab
  display: flex
  height: 0.64rem
  box-sizing: border-box
  border-bottom: 0.02rem solid $color-border
  .tab-item
    flex: 1
    position: relative
    text-align: center
    font-size: $font-size-medium
    color: $color-text-l
    .filter
      line-height: 0.64rem
</style>
