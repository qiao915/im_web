<template>
  <div class="circleFriends_box">
      <ul v-if="!showListBox">
        <li @click="circleFriends(1)">朋友圈动态</li>
        <li @click="circleFriends(2)">我的朋友圈</li>
      </ul>
      <div v-if="showListBox" class="messageScrollBox">
        <div class="serviceDetail" v-for="(item, index) in InteractMessageList" @click="cutList(index,item)" :class="{actived: changeActived == index}" :key="index">
          <div class="news_img">
            <img :src="item.headImg || defaultHeadImg" alt="">
            <!-- <img :src="defaultHeadImg" alt=""> -->
          </div>
          <div class="new_box">
            <p class="show_Name">{{item.memberName}}</p>
            <p class="show_news">{{item.friendsContent}}</p>
          </div>
          <div class="newsTime_box">
            <p class="news_time">{{item.createDate}}</p>
          </div>
        </div>
      </div>

  </div>
</template>

<script>
import Bus from '../Data/bus.js'
export default {
  name: 'CircleFriendsList',
  data(){
    return{
      defaultHeadImg:'/static/img/default-head.png',
      showCircle: true,
      InteractMessageList:[],
      changeActived: -1,
      userInfo:this.$cfg.userInfo,
      nowSelectInfo:this.$cfg.nowSelectInfo,
      pageNo:1,
      pageSize:99999,
      showListBox: false,

    }
  },
  mounted(){
    this.$store.dispatch('is_messageList',2)
    this.$store.dispatch('is_circleFriendsList',1)
    Bus.$on('newList', e=>{
      console.log('新消息')
      this.getInteractMessage()
      this.showListBox = true
    })
    //动态详情返回到朋友圈列表
    Bus.$on('changeLeftList', e=>{
      this.showListBox = false
    })
  },
  methods:{
    circleFriends(index){

      if(index ==1){
        //朋友圈动态
        let params = this.$route.params;
        this.$router.push({
          path: `/im-web/app/${params.wxId}/dynamic/friends/${this.nowSelectInfo.noWx}`
        });
        //this.$store.dispatch('is_circleFriendsList',1)
      }else{
        //我的朋友圈
        let params = this.$route.params;
        this.$router.push({
          path: `/im-web/app/${params.wxId}/dynamic/mine/${this.nowSelectInfo.noWx}`
        });
        //this.$store.dispatch('is_circleFriendsList',2)
      }
    },
    getInteractMessage(){
      this.$http({
        type:'post',
        url:'/api/firend/messageList.do',
        params:{
          noWxShop: this.nowSelectInfo.noWx,  //必填 中控微信号
          pageNo:this.pageNo,
          pageSize:this.pageSize,
          //shopNo: this.nowSelectInfo.shopNo,    //
        }
      }).then((res)=>{
        if(res.data.result == true){
          let data = res.data.returnObject
          this.InteractMessageList = data.rows
        }
      })
    },
    cutList(index,item){
      this.changeActived = index
      let params = this.$route.params;
      this.$router.push({
        path: `/im-web/app/${params.wxId}/dynamic/detail/${item.friendsCode}`
      });
    },
    destroyed(){
      this.changeActived = -1
      this.InteractMessageList = []
    },
  },
}
</script>

<style lang="less" scoped>
.circleFriends_box{
  width: 100%;
  box-sizing: border-box;
  li{
    width: 100%;
    height: 60px;
    line-height: 60px;
    padding: 0 10px 0 20px;
    box-sizing: border-box;
    color: #fff;
    font-size: 14px;
    border-bottom: 1px solid #000;
    cursor: pointer;
    &:hover{background-color: #3a3f45;}
  }
  .messageScrollBox{
    height:760px;
    width: 100%;
    overflow-y: auto;

  }
  .serviceDetail{
    width:100%;
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    box-sizing: border-box;
    cursor: pointer;
    &:hover{background-color: #3a3f45;}
    &.actived{background-color: #3a3f45;}
    .news_img{
      width: 40px;
      height: 40px;
      img{
        width: 100%;
        height: auto;
        min-width: 32px;
        min-height: 32px;
        max-width: 50px;
        max-height: 50px;
        border-radius: 3px;
      }
    }
    .new_box{
      width: 40%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  .show_Name{
    color: #fff;
    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 0 10px;
  }
  .show_news{
    color: #d2cccc;
    font-size: 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 0 10px;
  }
  .newsTime_box{
    width: 40%;
    text-align: right;
    .news_time{
      font-size: 12px;
      color: #fff;
    }

  }
}
</style>
