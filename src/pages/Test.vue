<template>
  <!-- 测试使用 -->
  <div class="test-c">
    <chat-input v-model="testVal" @enter="onEnter" ></chat-input>
  </div>
</template>

<script>
import ChatInput from '@/components/Chat/ChatInput.vue'
export default {
  data () {
    return {
      testVal: ''
    }
  },

  components: {
    ChatInput
  },

  methods: {
    onEnter () {
      console.log('onEnter', this.testVal)
      this.testVal = ''
    },

    onInput () {
      console.log('outer onInput', this.testVal)
    }
  }

}
</script>

<style lang="scss" scoped>
.test-c {
  background: #fff;
}
</style>
