<template >
  <div class="dialogBox">
    <ChatWindow class="chat-info-window"></ChatWindow>
    <InputWindow class="chat-input-con"></InputWindow>
  </div>
</template>

<script>
import ChatWindow from '../Chat/ChatWindow'
import InputWindow from '../Chat/InputWindow'

export default {
  name: 'ChatRoom',
  components: {
    InputWindow,
    ChatWindow
  }
}
</script>

<style lang="less" scoped>
.dialogBox{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .chat-info-window{
    width: 100%;
    height: 1px;
    flex: 1;
    position: relative;
  }

  .chat-input-con{
    width: 100%;
    height: 200px;
    position: relative;
    background-color: #ededed;
  }
}
</style>
