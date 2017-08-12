<template>
  <div id="app">
    <m-header></m-header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <transition name="fade">
      <div class="toast-wrapper" v-show="showToast">
        <toast></toast>
      </div>
    </transition>
  </div>
</template>

<script>
import Header from 'components/header/header'
import Toast from '@/base/toast/toast'

import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'showToast'
    ])
  },
  components: {
    'm-header': Header,
    Toast
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
.toast-wrapper
  position: fixed
  width: 100%
  top: 50%
  transform: translateY(-50%)
  &.fade-leave-active
    transition: all 0.3s
  &.fade-leave-to
    opacity: 0
</style>
