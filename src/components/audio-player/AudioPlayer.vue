<template>
  <audio-weixin :auto-play="autoPlay" :init-volume="initVolume" :audio-src="audioUrl"></audio-weixin>
</template>
<script>
import AudioWeixin from './audio-like-weixin.vue'
import { audioConvert } from '@/api'
import { createUploadUrl } from '@/tools/resourceTool'
export default {
  components: {
    AudioWeixin
  },

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

  data () {
    return {
      audioUrl: ''
    }
  },

  watch: {
    audioSrc: {
      async handler (newVal) {
        if (!newVal) {
          this.audioUrl = ''
        }

        let url = await audioConvert(this.$http, { amrUrl: newVal })
        // this.audioUrl = createUploadUrl(url, this.$cfg.userInfo.uploadUrl)
        this.audioUrl = url
      },
      immediate: true
    }
  }
}
</script>
