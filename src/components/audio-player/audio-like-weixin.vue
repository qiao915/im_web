!<style rel="stylesheet/scss" lang="scss" scoped>
@charset "utf-8";
@import "~@/assets/bassScss";

.audio-container {
  width: 100%;
  height: 30px;
  line-height: 28px;
  position: relative;

  .player-con {
    width: 100%;
    height: 100%;
    position: relative;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
  }

  .play-icon {
    width: 30px;
    height: 30px;
    position: absolute;
    left: 6px;
    top: 0;
    font-size: 16px;
    line-height: 30px;

    &:before {
      @include iconfont("\e645");
    }
  }

  .active-play {
    color: $inputActive;
    animation: runOpacit 1s linear infinite;
  }

  .time-con {
    height: 30px;
    position: absolute;
    right: 10px;
    top: 0;
    line-height: 30px;
    font-size: 12px;
  }
}
</style>
<template>
  <!-- audio组件 -->
  <div class="audio-container" title="播放/暂停" @click="playOrStop">
    <audio class="audioPlay" :src="audioUrl"></audio>

    <div class="player-con">
      <div class="play-icon" :class="{'active-play':isPlay}"></div>

      <div class="time-con">{{showNowTime}}</div>
    </div>
  </div>
  <!-- audio组件 end!-->
</template>

<script>
import dateStr from '@/utils/date_string_utils.js'

const vueComponent = {
  props: {
    audioSrc: {
      type: String,
      default: 'http://www.uncle-yang.com/music/Klave%20-%20EuroDancer.mp3'
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    initVolume: {
      type: Number,
      default: 1
    },

  },
  data: function () {
    return {
      audio: null, // audio对象
      isPlay: false, // 正在播放
      audioUrl: '',

      allTime: 0, // 总时长

      nowTime: 0, // 当前时长
      showNowTime: '00:01' // 显示的当前时长
    }
  },

  components: {},
  // 执行的方法
  methods: {
    // 初始化变量
    initVal () {
      var self = this

      // 实例化audio
      self.audio = this.$el.querySelector('.audioPlay')

      // 音量
      self.audio.volume = self.initVolume

      // 自动播放
      if (self.autoPlay) {
        self.playOrStop()
      }
    },

    // 播放或者暂停
    playOrStop () {
      var self = this
      var audio = self.audio

      if (audio.paused) {
        // 如果暂停了
        audio.play()
      } else {
        audio.pause()
      }
    },

    // audio 添加监听事件
    audioAddListener () {
      var self = this
      var audio = self.audio

      // audio监听,播放
      audio.addEventListener(
        'play',
        function () {
          self.isPlay = true
        },
        false
      )

      // 暂停
      audio.addEventListener(
        'pause',
        function () {
          self.isPlay = false
        },
        false
      )

      // 当audio结束
      audio.addEventListener(
        'ended',
        function () {
          self.showNowTime = dateStr.changeMillisecondToStrEn(self.allTime)
        },
        false
      )

      // 当audio开始播放的时候，获取总时长
      audio.addEventListener(
        'canplay',
        function () {
          self.allTime = this.duration
          self.showAllTime = dateStr.changeMillisecondToStrEn(this.duration)
          self.showNowTime = dateStr.changeMillisecondToStrEn(this.duration)
        },
        false
      )

      // 时间轴改变事件
      audio.addEventListener(
        'timeupdate',
        function () {
          // 获取现在的时间
          self.nowTime = this.currentTime
          self.showNowTime = dateStr.changeMillisecondToStrEn(
            self.allTime - this.currentTime
          )
        },
        false
      )
    },

    externalEvent () {
      var self = this
      var audio = self.audio

      this.$on('$basePlay:playOrPause', () => {
        // console.log("外部调用！");
        self.playOrStop()
      })

      this.$on('$basePlay:play', arg => {
        // console.log("外部调用！");
        // console.log(arg);
        audio.play()
      })

      this.$on('$basePlay:pause', () => {
        // console.log("外部调用！");
        audio.pause()
      })

      this.$on('$basePlay:setVolume', val => {
        // console.log("外部调用！");
        // console.log("设置音量");
        // console.log(val);
        audio.volume = val
      })

      this.$on('$basePlay:changeUrl', val => {
        audio.audioUrl = val
      })
    }
  },
  // 计算属性
  computed: {},
  // 监听
  watch: {
    // 如果外部音频变化了~
    audioSrc: function (src) {
      var self = this
      var audio = self.audio

      audio.pause()
      self.isPlay = false
      self.audioUrl = self.audioSrc
    }
  },

  // 创建实例前
  beforeCreate: function () {},

  // 创建实例，执行的钩子
  created: function () {},

  // 渲染前
  beforeMount: function () {},

  // 渲染的时候执行
  mounted: function () {
    var self = this

    // dom渲染成功后
    self.$nextTick(function () {
      // 初始化变量
      self.initVal()
      // 添加audio监听事件
      self.audioAddListener()
      // 添加对外暴露的方法方法
      this.externalEvent()

      self.audioUrl = self.audioSrc
    })
  },
  // 数据更新前调用
  beforeUpdate: function () {},

  // 数据更新时调用
  update: function () {},

  // keep-alive，被激活时调用
  activated: function () {},

  // keep-alive,被停用时调用
  deactivated: function () {},
  // 组件销毁前执行
  beforeDestory: function () {},

  destoryed: function () {}
}
export default vueComponent
</script>
