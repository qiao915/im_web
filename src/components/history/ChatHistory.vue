<template >
  <div class="chat-history">
    <section class="chat-container">
      <chat-window class="chat-info-window" :historyData="historyData" :type="chatWindowTypeInner" ></chat-window>
    </section>
    <aside class="chat-target-info">
      <group-detail v-if="isGroup" ></group-detail>
      <user-detail v-else :historyData="historyData" :type="chatWindowTypeInner"></user-detail>
    </aside>
  </div>
</template>
<script>
import ChatWindow from '@/components/Chat/ChatWindow.vue'
import UserDetail from '@/components/RightInfo/UserDetail.vue'
import GroupDetail from '@/components/RightInfo/GroupDetail.vue'
import { chatWindowType } from '@/components/Chat/chatWindowType.js'

const GROUP = 'group'

export default {
  components: {
    ChatWindow,
    UserDetail,
    GroupDetail
  },

  created () {
    console.log('chat history')
  },

  computed: {
    isGroup () {
      return this.$route.params.type === GROUP
    },

    historyData () {
      let params = this.$route.params
      return {
        chatRoomFlag: params.type === GROUP,
        code: params.code,
        memberNoGm: params.memberNoGm
      }
    },

    chatWindowTypeInner () {
      return chatWindowType.history
    }

  }
}
</script>

<style lang="scss" scoped>
.chat-history {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;

  .chat-container {
    width: 1px;
    height: 100%;
    flex: 1;

    .chat-info-window{
      width: 100%;
      height: 100%;
      position: relative;
    }

  }

  .chat-target-info {
    width: 270px;
    height: 100%;
    position: relative;
    border-left: 1px solid #cac5c5;
  }
}
</style>
