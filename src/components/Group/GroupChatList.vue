<template >
  <div class="groupChatList_box">

    <div class="toggleBox">
      <ListTitle class="ListTitle" @hasClick="goGetGroup()">
        <template slot="groupName">
          <span>认领群</span>
        </template>
      </ListTitle>
    </div>

    <div class="toggleBox">
      <ListTitle class="ListTitle"  @hasClick="showMyGroup()">
        <template slot="groupName">
          <span>我的群组</span>
        </template>
        <template slot="groupNameNumber">&nbsp;({{flockNumber}})</template>
      </ListTitle>

      <div class="otherList" :class="{active: activeGroup}">
        <div>
          <ul>
            <li v-for="(item, index) in flockData"
              :key="index"
              :class="{actived: changeActived1 == index}"
              @click="cutMyGroup(item,index)">
              <span class="border_box">
                <img :src="getAvatar(item)" alt>
                <span>{{item.pmName}}</span>
                <span class="arrow_bottom">
                  <img :class="[isRotate ? 'go' :'aa']" src="../../../static/img/arrow_bottom.png" />
                </span>
              </span>
              <div class="sildermun" v-show="item.showFlag">
                <ul>
                  <!-- 循环2 -->
                    <li v-for="(list,index1) in childItems[index]" @click.stop="cutMyFlock(list,index1)" :key="index1">
                      <span>
                        <img class="childImg" :src="getAvatar(item)" alt="">
                        <span>{{list.roomNickName}}</span>
                      </span>
                    </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="toggleBox">
      <ListTitle class="ListTitle" @hasClick="showMyFlock()">
        <template slot="groupName">
          <span>我的群聊</span>
        </template>
        <template slot="groupNameNumber">&nbsp;({{groupNumber}})</template>
      </ListTitle>

      <div class="otherList" :class="{active: activeFlock}">
        <div>
          <ul class="groupList">
            <li v-for="(item, index) in renderData"
            :key="index"
            :class="{actived: changeActived2 == index}"
            @click="cutMyFlock(item,index)"
            >
              <div class="news_img">
                <img :src="getAvatar(item)" alt>
              </div>
              <div class="new_box">
                <p class="show_Name" :title="item.roomNickName">{{item.roomNickName}}</p>
              </div>

            </li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import ListTitle from "../core/ListTitle"
import SelectItems from "../core/SelectItems"
import { mapGetters, mapActions } from 'vuex'
import { getAssetPath } from '@/tools/resourceTool'
import Bus from '../Data/bus.js'

export default {
  name : 'GroupChatList',
  components:{
    ListTitle,
    SelectItems
  },
  computed:{
    ...mapGetters([
      'messageListInfo',
      'serviceInfo',
    ]),
  },
  data() {
    return {
      userInfo:this.$cfg.userInfo,
      nowSelectInfo:this.$cfg.nowSelectInfo,
      activeIndex: -1,
      activeGroup:false,
      activeFlock:false,
      changeActived1: -1,
      changeActived2: -1,
      flockData:[], //群组列表
      childItems:[],//小群列表
      renderData:[],//群聊列表
      groupNumber:0,
      flockNumber:0,
      isRotate: false,
    }
  },
  created(){
      this.getGroupData();
      this.getFlockData()

  },
  mounted() {
    Bus.$on('refreshMessageList', (e)=>{
      this.renderData = []
      this.getGroupData()
    })
  },
  methods: {

    //获取我的群聊列表
    getGroupData(){
        let params = {
          memberNoGm: this.userInfo.memberNoGuid,
          merchantNo: this.userInfo.memberNoMerchant,
          claimed:true,
          start: '0',
          limit: 9999999,
        }
        this.$http({
            method: 'post',
            url: '/api/im/chatroom/findChatRoom.do',
            params:params
        }).then((res)=>{
            if(res.status == '200' && res.data.result){
              let data = res.data.returnObject.rows
              data.forEach( (item) =>{
                if(item.memberNoGm == this.userInfo.memberNoGuid){
                  this.renderData.push(item)
                }
              })
              this.groupNumber = this.renderData.length
            //  console.log(this.renderData)
            }else{
              this.$message({
                type:'error',
                message:res.data.errorMessage
              })
            }
        })
    },
    //获取我的群组列表
    getFlockData(){
        this.$http({
          method:'post',
          url:'/api/im/chatroom/findChatRoomPm.do',
          params:{
            memberNoGm:this.userInfo.memberNoGuid,
          }
        }).then(res=>{
        //  console.log(res)
          if(res.data.result == true){
            let data = res.data.returnObject
            data.forEach( (item) =>{
              item.showFlag = false
            })
            this.flockData = data
            this.flockData ? this.flockNumber = this.flockData.length : 0

          }
          //console.log(this.flockData)
        })
    },

    getAvatar (item) {
      let avatar = item.headUrl
      if (!avatar) {
        avatar = getAssetPath('static/img/default-group.png')
      }
      return avatar
    },
    //认领群
    goGetGroup(){
      let params = this.$route.params

      this.$router.push({
        path: `/im-web/app/${params.wxId}/group/claim/${this.userInfo.memberNoGuid}/${this.userInfo.memberNameGuid}`
      })
    },
    showMyGroup(){
      this.activeGroup = !this.activeGroup
    },
    showMyFlock(){
      this.activeFlock = !this.activeFlock
    },

    //查看群组
    cutMyGroup(item, index) {
      this.changeActived1 = index
      this.isRotate= !this.isRotate;

      //查看群组下面的分群
      this.$router.push({
         path: `/im-web/app/${this.nowSelectInfo.noWx}/flock/info/${item.pmCode}/${item.code}`
      })

      this.$http({
          type: 'post',
          url: '/api/im/chatroom/findChatRoomByPmCode.do',
          params: {
            pmCode:item.pmCode,
          }
      }).then((res)=>{
      //  console.log(res);
        if(res.status == '200' && res.data.result){
          this.childItems[index] = res.data.returnObject.rows;
          this.flockData[index].showFlag = !this.flockData[index].showFlag;
        }
      })
    },

    //查看群聊
    cutMyFlock(item,index){
      this.activeIndex = index
      this.$store.dispatch('messageListInfo',item)
      this.$cfg.set('nowSelectGroupChatInfo', item); //  存储当前群聊对象
      this.$store.commit('NOE_SELECT_GROUP', item)

      this.$router.push({
        path: `/im-web/app/${this.nowSelectInfo.noWx}/group/info/${item.code}/${item.chatRoomName}/${item.memberNoGm}`
      });
    },

  },
  destroyed(){
    this.activeIndex = -1;
  },
}
</script>

<style lang="less" scoped>
.aa{transition: all 0.8s;}
.go{transform:rotate(-180deg);transition: all 0.8s;}
.groupChatList_box{
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.group-list-ul{
  width: 100%;
  li{
    width: 100%;
    height: 60px;
    position: relative;
    display: flex;
    padding: 10px;
    border-bottom: 1px solid #1f1c1c;
    cursor: pointer;
    &:hover{background: #2e3238;}
    &.actived{background-color: #3a3f45;}
  }

  .childImg{
    width: 40px;
    height: 40px;
  }

  .name{
    flex: 1px;
    line-height: 40px;
    color: #fff;
    padding: 0 10px;
  }
}
.otherList {
  width: 100%;
  height: 0;
  overflow-y: hidden;

  ul {
    height: auto;
    width: 100%;
    box-sizing: border-box;
    font-size: 14px;
    color: #fff;
    .actived {
      background-color: #3a3f45;
    }
    li {
    //  height: 60px;
      line-height: 60px;
      list-style: none;
      background: #2e3238;
      &:hover {
        background: #3b4047;
        cursor: pointer;
      }
      &>span{
        padding: 0 10px;
      }
      .border_box {
        width: 100%;
        box-sizing: border-box;
        display: inline-block;
        border-bottom: 1px solid #1f1c1c;
        position: relative;
        img {
          display: inline-block;
          width: 40px;
          height: 40px;
          vertical-align: middle;
          margin-right: 10px;
        }
        span{
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: inline-flex;
          max-width: 200px;
        }
        .arrow_bottom img{
          width: 20px;
          height: 20px;
          position: absolute;
          top: 20px;
          right: 15px;
        }
      }
      .sildermun ul li{
        .childImg{
          width: 40px;
          height: 40px;
          vertical-align: middle;
          margin-left: 20px;
        }
      }


    }
  }
}
.active {
  height: auto;
}
.groupList li{
  width:100%;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    background-color: #3a3f45;
  }
  .news_img {
    width: 32%;
    max-width: 54px;
    img {
      width: 100%;
      height: auto;
      display: block;
      min-width: 32px;
      min-height: 32px;
      max-width: 40px;
      max-height: 40px;
      border-radius: 3px;
    }
  }
  .new_box {
    width: 60%;
    .show_Name {
      color: #fff;
      font-size: 14px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      padding: 0 10px;
    }
  }
}
</style>
