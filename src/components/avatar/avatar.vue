<template>
  <div class="avatar">
    <img class="img" :src="src" v-if="!isAnonymous" />
    <img class="img" src="./anonymous.png" v-else />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ''
    },
    isAnonymous: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
@import "~common/stylus/variable"

.avatar
  width: 100%
  height: 100%
  font-size: 0
  .img
    width: 100%
    height: 100%
    border-radius: 50%
</style>
