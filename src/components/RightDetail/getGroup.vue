<!-- 认领群 -->
<template>
  <div class="sessionBox">
    <div class="leftBox">
      <section class="get-customer-con">
          <header class="this-header">
              <ul class="header-ul">
                  <li :class="{active: !hasClaimed}" @click="selectModel(false)">待认领</li>
                  <li :class="{active: hasClaimed}" @click="selectModel(true)">已认领</li>
              </ul>
          </header>

          <section class="customer-con">
              <ul class="customer-ul">
                  <li v-for="(item, index) in renderData" :key="index" :class="{actived: activeGroup == index}" @click="checkGroupMember(item.chatRoomName,index)">
                      <img class="head" :src="createMessageAvatar(item)" alt="">
                      <section class="customer-info">
                          <p class="name">{{item.roomNickName}}</p>
                          <!-- <p class="time">{{}}</p> -->
                      </section>
                      <section class="do-com">
                        <div v-if="!hasClaimed">
                            <div class="do-but" v-if="" @click.stop="claimGroup(item)">立即认领</div>
                        </div>
                        <div v-if="hasClaimed">
                          <div class="do-but do-gray" v-if="item.memberNoGm != memberNoGuid">{{item.memberNameGm}}认领</div>
                            <div class="do-but do-gray" v-if="item.memberNoGm == memberNoGuid">我认领</div>
                          <!-- <div class="do-but" v-if="item.memberNoGm === memberNoGuid" @click.stop="cancleClaimGroup(item)">取消认领</div> -->
                        </div>
                      </section>
                  </li>
              </ul>
              <div class="noresult" v-if="renderData.length == 0">
                暂无数据
              </div>
          </section>

      </section>
    </div>

    <!-- <div class="rightBox"  v-if="!is_moreFunction"> -->
    <div class="rightBox">
      <header class="this-header">
          <ul class="header-ul">
              <li>群成员</li>
          </ul>
      </header>

      <section class="groupMemberList">
        <ul>
          <li v-for="(item, index) in memberListData" :title="item.memberName">
            <img :src="item.headUrl" alt="">
            <p>{{item.memberName}}</p>
          </li>
        </ul>
      </section>
    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import { createUploadUrl, getAssetPath } from '@/tools/resourceTool'

export default {
  computed:{
    ...mapGetters([
      'is_moreFunction'
    ])
  },
    data(){
        return {
            renderData: [],
            hasClaimed: false,
            memberListData:[],
            userInfo: this.$cfg.userInfo,
            memberNoGuid:this.$cfg.userInfo.memberNoGuid,
            lab: 1,
            activeGroup: -1,
        }
    },
    mounted() {
      //console.log(this.memberNoGuid)
      this.getData(false);
    },
    methods:{
        selectModel(val){
          this.activeGroup = -1
          this.memberListData = []
          this.hasClaimed = val
          this.getData(val)
        //  console.log(this.renderData)
        },
        getData(flag){
          this.renderData  = []
            let nowSelectInfo = this.$cfg.nowSelectInfo;
            let params = {
            //  shopNo: nowSelectInfo.shopNo,
              merchantNo: this.$cfg.userInfo.memberNoMerchant,
              claimed:flag,
              start: '0',
              limit: 9999999,
            }
            this.$http({
                method: 'post',
                url: '/api/im/chatroom/findChatRoom.do',
                params:params
            }).then((res)=>{
                if(res.status == '200' && res.data.result){
                    this.renderData = res.data.returnObject.rows;
                }
            }).catch((error)=>{


            });
        },
        //认领群
        claimGroup(obj){
            let params = this.$route.params;

            this.$http({
                method: 'post',
                url: '/api/im/chatroom/claimed.do',
                params: {
                    memberNoGm: params.memberNoGm,
                    memberNameGm: params.memberNameGm,
                    code: obj.code,
                }
            }).then((res)=>{
                if(res.data.result){
                  //  console.log(res.data.result);
                    this.$message({
                      type:'success',
                      message:"认领群成功"
                    })
                    this.getData(false);
                    this.activeGroup = -1
                    this.memberListData = []
                }else{
                  this.$message.error(res.data.errorMessage)
                }

            }).catch((error)=>{

            });
        },
        //取消认领群
        cancleClaimGroup(obj){
            let params = this.$route.params;

            this.$http({
                method: 'post',
                url: '/api/im/chatroom/cancelClaimed.do',
                params: {
                    code: obj.code,
                }
            }).then((res)=>{
                if(res.status == '200' && res.data.result){
                  //  console.log(res.data.result);
                    this.$message({
                      type:'success',
                      message:"已取消认领群"
                    })
                    this.getData(true);
                    this.activeGroup = -1
                    this.memberListData = []

                }
            }).catch((error)=>{

            });
        },
        //查询群成员
        checkGroupMember(code,index){
          this.activeGroup = index
          this.$http({
              method: 'post',
              url: '/api/im/chatroom/findChatRoomMember.do',
              params: {
                  chatRoomName: code,
              }
          }).then((res)=>{
              if(res.status == '200' && res.data.result){
                  this.memberListData = res.data.returnObject

              }
          })
        },

        createMessageAvatar (item) {
          let avatar

          if (item.headUrl) {
            avatar = item.headUrl
          } else {
            avatar = getAssetPath('static/img/default-user.png')
          }
          return avatar
        },

    },
    destroyed(){
      this.activeGroup = -1
      this.memberListData = []
    },
}
</script>

<style lang="less" scoped>
  .sessionBox{
    width: 100%;
    height: 100%;
    display: flex;
    flex: 1;

    .leftBox{
      flex: 1;
      height: 100%;
    }
    .rightBox{
      width:318px;
      height: 100%;

      .groupMemberList{
        padding: 0 0 0 15px;
        ul{
          height: 100%;
          overflow: auto;

            li{
                width: 45px;
                height: 70px;
                overflow: hidden;
                margin: 15px 15px 0 0;
                float:left;
                cursor: pointer;

                img{width: 45px;height: 45px;}
                p{font-size: 12px;text-overflow:ellipsis;white-space: nowrap;overflow: hidden;text-align: center;margin-top: 5px;}
              }
        }
      }

    }
  }

    .get-customer-con{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        border-right: 1px solid #d1d1d1;
    }

    .this-header{
        width: 100%;
      //  height: 60px;
        border-bottom: 1px solid rgba(0,0,0,0.2);
    }

    .header-ul{
        width: 140px;
        height: 40px;
        overflow: hidden;
        margin: 10px auto;
        border-radius: 10px;

        > li{
              float: left;
              width: 70px;
              text-align: center;
              line-height: 40px;
              cursor: pointer;
            }

        .active{
            background-color: #2e3238;
            color: #fff;
        }
    }

    .customer-con{
        width: 100%;
        flex: 1;
        height: 1px;
        overflow-y: auto;
    }

    .customer-ul{
        width: 100%;

        > li{
            width: 100%;
            height: 60px;
            display: flex;
            padding: 5px 20px;
            box-sizing: border-box;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);

            cursor: pointer;
            &.actived{background-color: #dadada;}
        }

        .head{
            width: 50px;
            height: 50px;
            display: block;
            border-radius: 10px;
        }

        .customer-info{
            flex: 1;
            padding: 0 10px;
            overflow: hidden;
            .name{
                padding-top: 4px;
                font-size: 16px;
            }
        }

        .do-com{
            height: 100%;
        }

        .do-but{
            padding: 0 10px;
            min-width: 100px;
            text-align: center;
            line-height: 40px;
            color: #fff;
            font-size: 14px;
            margin-top: 5px;
            background-color: #09c106;
            border-radius: 10px;
            cursor: pointer;
        }

        .do-gray{
          background-color: #b7b7b7!important;
        }
    }
    .noresult{
      text-align: center;
      margin-top:30px;
      color: #333;
    }

</style>
