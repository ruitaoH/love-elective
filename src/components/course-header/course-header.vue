<template>
  <div class="course-header">
    <div class="back" @click="back">
      <i class="icon-arrow_lift"></i>
    </div>
    <h1 class="name">{{ name }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  methods: {
    back () {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
@import "~common/stylus/variable"

.course-header
  position: relative
  height: 0.98rem
  font-size: 0
  background: #fff
  border-bottom: 0.02rem solid $color-border
  .back
    position: absolute
    top: 0
    left: 0
    height: 0.98rem
    padding: 0 0.5rem
    .icon-arrow_lift
      line-height: 0.98rem
      font-size: $font-size-large-x
  .name
    line-height: 0.98rem
    text-align: center
    font-size: $font-size-large-x
</style>
