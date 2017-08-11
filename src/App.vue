<template>
  <div id="app">
    <m-header></m-header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Header from 'components/header/header'

export default {
  components: {
    'm-header': Header
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
</style>
