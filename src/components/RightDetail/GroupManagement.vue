<!--
  群组列表
-->

<template>
  <div class="group-info-con">
      <div class="detail_head">{{nowSelectGroup.roomNickName || '群组'}}</div>
      <div class="detail_box cf">
        <ul>
          <li v-for="(item, index) in renderData" :key="index">
            <img :src="getAvatar(item)" alt="">
            <p>{{item.roomNickName}}</p>
          </li>
        </ul>
      </div>
      <div class="clickBtn" v-if="renderData && renderData.length">
        <el-button type="success" @click="sendMessage">发消息</el-button>
        <el-button type="info" @click="cancleClaimGroup()">取消认领</el-button>
        <p class="tips">注：群组中发布消息，消息将被自动发送到所包含的所有子群中！群成员回复内容请在子群中查看！</p>
      </div><div class="clickBtn" v-else>
        <p>暂无群组信息</p>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { CHAT_USER_TYPE } from '@/utils/constants'
import { getAssetPath } from '@/tools/resourceTool'

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
      if(this.$route.name == 'flockInfo'){
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
      let params = this.$route.params;

      this.$http({
          type: 'post',
          url: '/api/im/chatroom/findChatRoomByPmCode.do',
          params: {
            pmCode: params.pmCode,
          }
      }).then((res)=>{
        //console.log(res);
        if(res.status == '200' && res.data.result){
          this.renderData = res.data.returnObject.rows;
        }

      })
    },

    sendMessage () {
      let params = this.$route.params

      this.prepareChating({
        code: params.code,
        chatUserType: CHAT_USER_TYPE.flock  //3
      })
      this.$router.push({
        path: `/im-web/app/${params.wxId}/flock/chat/${params.code}/${params.pmCode}`
      })
    },

    //取消认领群
    cancleClaimGroup(){
        let params = this.$route.params;

        this.$http({
            method: 'post',
            url: '/api/im/chatroom/cancelClaimed.do',
            params: {
                code: params.code,
            }
        }).then((res)=>{
            if(res.status == '200' && res.data.result){
                console.log(res.data.result);
                this.$message({
                  type:'success',
                  message:"已取消认领群"
                })
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

    getAvatar (item) {
      let avatar = item.headUrl
      if (!avatar) {
        avatar = getAssetPath('static/img/default-group.png')
      }
      return avatar
    },

  }
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
  font-size: 18px;
}
.detail_box{
  width: 100%;
  padding: 20px 0 0 0;
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
