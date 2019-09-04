<template>
  <div id="app">
    <router-view></router-view>
    <loading v-if="loading"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  computed: mapGetters([
    'loading'
  ]),
  components: {
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="less">
  html, body{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }

  #app{
    width: 100%;
    height: 100%;
    position: relative;
  }

  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  // @font-face {
  //   font-family: 'iconfont';  /* project id 1081081 */
  //   src: url('//at.alicdn.com/t/font_1081081_ywb7fby3fbj.eot');
  //   src: url('//at.alicdn.com/t/font_1081081_ywb7fby3fbj.eot?#iefix') format('embedded-opentype'),
  //   url('//at.alicdn.com/t/font_1081081_ywb7fby3fbj.woff2') format('woff2'),
  //   url('//at.alicdn.com/t/font_1081081_ywb7fby3fbj.woff') format('woff'),
  //   url('//at.alicdn.com/t/font_1081081_ywb7fby3fbj.ttf') format('truetype'),
  //   url('//at.alicdn.com/t/font_1081081_ywb7fby3fbj.svg#iconfont') format('svg');
  // }

</style>
