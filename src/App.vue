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

import qs from 'qs'
import axios from 'axios'

export default {
  created () {
    axios.post('/api/v1/admin/login', qs.stringify({
      username: 'admin',
      password: 'ixuanxiu87542701'
    })).then((res) => {
      console.log(res)
    })
  },
  components: {
    'm-header': Header
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>

</style>
