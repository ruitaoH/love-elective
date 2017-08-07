<template>
  <div class="header">
    <router-link tag="div" class="search" to="/search">
      <i class="icon-search"></i>
    </router-link>
    <router-link tag="div" class="tab-item" to="/choice">
      <span class="link-item">选课</span>
      <div class="line"></div>
    </router-link>
    <router-link tag="div" class="tab-item" to="/comment">
      <span class="link-item">评课</span>
      <div class="line"></div>
    </router-link>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
@import "~common/stylus/variable"

.header
  display: flex
  height: 0.96rem
  box-sizing: border-box
  border-bottom: 0.02rem solid $color-border
  .search
    fiex: 0 1 1.2rem
    width: 1.2rem
    text-align: center
    font-size: 0
    color: $color-text-d
    .icon-search
      line-height: 0.94rem
      font-size: $font-size-large-x
  .tab-item
    flex: 1
    text-align: center
    font-size: $font-size-large-x
    color: $color-text-d
    .link-item
      line-height: 0.94rem
    &.router-link-active
      .line
        width: 1.96rem
        margin: 0 auto
        transform: translateY(-0.02rem)
        border-bottom: 0.04rem solid $color-border-green
</style>
