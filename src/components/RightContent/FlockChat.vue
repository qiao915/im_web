<template >
  <div class="chat-con">
      <section class="chat-container">
        <ChatRoom></ChatRoom>
      </section>

      <aside class="chat-target-info">
        <span>
          <FlockDetail></FlockDetail>
        </span>
      </aside>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ChatRoom from '../Index/ChatRoom'
import FlockDetail from '../RightInfo/FlockDetail'
export default {
  components: {
    ChatRoom,
    FlockDetail,
  },
  computed:{
  
  },
  methods: {
    ...mapActions(['changeCurrentMessagePerson'])
  },

  async created () {
    let code = this.$route.params.code
    await this.changeCurrentMessagePerson(code)
  },

  async beforeRouteUpdate (to, from, next) {
    let code = to.params.code
    await this.changeCurrentMessagePerson(code)
    next()
  },

  async beforeRouteLeave (to, from, next) {
    await this.changeCurrentMessagePerson('')
    next()
  }
}
</script>

<style lang="less">
.chat-con{
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;

    .chat-container{
      width: 1px;
      height: 100%;
      flex: 1;
    }

    .chat-target-info{
      width: 270px;
      height: 100%;
      position: relative;
      border-left: 1px solid #cac5c5;
    }
  }
</style>
