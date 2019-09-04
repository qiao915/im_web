<template>
  <div class="group-info-con">
      <div class="detail_head">
        <p :title="nowSelectGroup.roomNickName || '群'">{{nowSelectGroup.roomNickName || '群'}}</p>
      </div>
      <div class="detail_box cf">
        <ul>
          <li v-for="(item, index) in renderData" :key="index">
            <img :src="item.headUrl" alt="">
            <p>{{item.nickName}}</p>
          </li>
        </ul>
      </div>
      <div class="clickBtn">
        <el-button type="success" @click="sendMessage">发消息</el-button>
        <el-button type="info" @click="cancleClaimGroup()">取消认领</el-button>
        <el-button type="info" @click="deleteAndExitGroup()">删除并退出</el-button>
        <!-- <p class="tips">注：群组中发布消息，消息将被自动发送到所包含的所有子群中！群成员回复内容请在子群中查看！</p> -->
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { CHAT_USER_TYPE } from '@/utils/constants'
import Bus from '../Data/bus.js'

export default {
  data(){
    return{
      renderData: [],
    }
  },
  mounted(){

  },
  computed:{
    ...mapGetters([
      'nowSelectGroup'
    ])
  },
  watch: {
    $route(){
      if(this.$route.name == 'groupInfo'){
          this.getData();
      }
    }
  },
  created(){
    this.getData();
  },
  methods:{
    ...mapActions(['prepareChating']),
    getData(){
      var startIndex = 0;
      let params = this.$route.params;

      this.$http({
          type: 'get',
          url: '/api/im/chatroom/findChatRoomMember.do',
          params: {
            roomCode: params.roomCode,
            chatRoomName: params.chatRoomName,
          }
      }).then((res)=>{

        if(res.status == '200' && res.data.result){
        //  console.log(res.data.returnObject);
          this.renderData = res.data.returnObject;
        }

      })
    },

    sendMessage () {
      let params = this.$route.params

      this.prepareChating({
        code: params.roomCode,
        chatUserType: CHAT_USER_TYPE.group
      })
      this.$router.push({
        path: `/im-web/app/${params.wxId}/group/chat/${params.roomCode}/${params.chatRoomName}/${params.memberNoGm}`
      })
    },

    //取消认领群
    cancleClaimGroup(){
        let params = this.$route.params;

        this.$http({
            method: 'post',
            url: '/api/im/chatroom/cancelClaimed.do',
            params: {
                code: params.roomCode,
            }
        }).then((res)=>{
            if(res.status == '200' && res.data.result){
                //console.log(res.data.result);
                this.$message({
                  type:'success',
                  message:"已取消认领群"
                })
                Bus.$emit("refreshMessageList")
                this.$router.push({
                  path: `/im-web/app/${params.wxId}`
                })
            }else{
              this.$message({
                type:'error',
                message:res.data.errorMessage
              })
            }
        })
    },

          //删除并退出群聊
      deleteAndExitGroup () {
        let params = this.$route.params;
        this.$http({
            method: 'post',
            url: '/api/im/chatroom/dismissChatRoom.do',
            params: {
                chatRoomName: params.chatRoomName,
                noWxZk: this.$cfg.nowSelectInfo.noWx
            }
        }).then((res)=>{
            if(res.status == '200' && res.data.result){
                //console.log(res.data);
                this.$message({
                  type:'success',
                  message:"已退出群聊"
                })
                Bus.$emit("refreshMessageList")
                this.$router.push({
                  path: `/im-web/app/${params.wxId}`
                })
            }else{
              this.$message({
                type:'error',
                message:res.data.errorMessage
              })
            }
        })
      },
  },
  destroyed(){
    Bus.$off('refreshMessageList')
  },
}
</script>

<style lang="less" scoped>
.group-info-con{
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}

.detail_head{
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: left;
  border-bottom: 1px solid #e2e2e2;
  padding-left: 30px;
  box-sizing: border-box;
  max-width: 1380px;
  p{
    width: 100%;
    font-size: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
  }
}
.detail_box{
  width: 100%;
  padding: 20px 40px 0 0;
  overflow-y: auto;
  // flex: 1;
  box-sizing: border-box;
  ul li{
    width: 70px;
    height: 95px;
    float: left;
    margin: 0 0 30px 45px;

    img{
      width: 70px;
      height: 70px;
    }
    p{
      text-align: center;
      margin-top: 5px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

    }
  }
}
.clickBtn{
  text-align: center;
  margin: 20px 0;

  .tips{
    padding-left: 30px;
    text-align: left;
    color: red;
    font-size: 14px;
    margin-top: 20px;
  }
}
</style>
