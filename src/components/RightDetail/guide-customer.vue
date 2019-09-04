<template>
  <section class="customer-list-con">
    <div class="this-header">
      <span class="">{{nowSelectguide.assistantName}}的客户</span>
      <span class="head_input">
        <input type="text" placeholder="输入客户昵称" v-model="searchMemberName">
      </span>
    </div>

    <section class="customer-con">
      <ul class="customer-ul">
        <li v-for="(item, index) in renderDataList" :key="item.id">
          <span class="head_img">
            <img class="head" :src="item.headAddress">
            <i class="pao" v-if="item.unreadCount">{{item.unreadCount}}</i>
          </span>

          <section class="customer-info-section">
            <p class="name">{{item.memberName}}</p>
            <!-- <p class="time">{{item.unreadCount}}</p> -->
          </section>
          <section class="do-com" @click="selsetCustomer(item)">
            <div class="do-but">查看聊天记录</div>
          </section>
          <section class="do-com" @click="sendChatMessage(item)">
            <div class="do-but">发消息</div>
          </section>
        </li>
      </ul>
      <div class="noresult" v-if="renderData.length == 0">
        暂无数据
      </div>
    </section>

    <!-- <section class="customer-info">
      <h3 class="title"></h3>
      <ul class="info-ul">
        <li>客户昵称：{{selectCustomerInfo.memberName}}</li>
        <li>微信号：{{selectCustomerInfo.noWx}}</li>
        <li>性别：{{selectCustomerInfo.sex == 'MALE' ? '男' : '女'}}</li>
        <li>所在地区：{{selectCustomerInfo.cityWx}}</li>
        <li>客户归属:{{selectCustomerInfo.cityWx}}</li>
        <li>来源：{{source[selectCustomerInfo.addType]}}</li>
      </ul>
    </section> -->

  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      renderDataCopy: [],
      renderData: [],
      nowSelectUser: {},
      selectCustomerInfo: {},
      searchMemberName: '',
      source: {
        1: '导购扫码',
        2: '客户扫码',
        3: '手动新增',
        4: '勾子',
        5: '搜索手机号'
      },
      customerMemberNoArr: [],  //客户memberNo合集
      clearTime: null,
    }
  },
  computed: {
    ...mapGetters([
      'currentPersonMember',
      'currentPersonMemberCode',
      ]),

      nowSelectguide(){
        return this.$store.getters.nowSelectguide
      },

    //模糊搜索
    renderDataList: function() {
      var self = this;
      var renderDataList = []
      if(!self.searchMemberName){
        return self.renderData
      }
      return self.renderData.filter(function(item) {
         return (
           item.memberName
           .toLowerCase()
            .indexOf(self.searchMemberName.toLowerCase()) !== -1
         );
      })
    },

  },
  watch: {
    $route () {
      if (this.$route.name == 'guideCustomer') {
        this.getCustomer()
      }
    }
  },
  methods: {
    getCustomer () {
      var startIndex = 0
      let user = this.$cfg.userInfo
      let nowSelectInfo = this.$cfg.nowSelectInfo
      let params = this.$route.params
      let flag = this.$cfg.userInfo.adminUserId

      // 获取客户列表
      this.$http({
        type: 'get',
        url: '/api/im/contacts/findFriends.do',
        params: {
          // adminUserId: flag,
          memberNoGm: params.memberNo, // mast, 导购编
          merchantNo: user.memberNoMerchant, // mast,商户编号
          noWxGm: nowSelectInfo.noWx, // mast,门店编号
          version: '1',
          start: '', // 群名
          sortBy: startIndex,
          limit: 9999999
        }
      })
        .then(res => {
          if (res.status == '200' && res.data.result) {
            // console.log('导购下的客户～')
            // console.log(res.data.returnObject.rows)
            this.renderDataCopy = res.data.returnObject.rows

            if (this.renderDataCopy) {
              this.renderDataCopy.forEach( (item)=> {
                this.customerMemberNoArr.push(item.memberNo)
              })
            }
            this.getCustomerUnreadCount()
          }
        })
        .catch(error => {})
    },

    selsetCustomer (user) {
      // console.log(user)
      this.nowSelectUser = user
      this.getCustomerInfo()
    },

    getCustomerInfo () {

      this.$http({
        type: 'get',
        url: '/api/imh5/index/findPersonMember.do',
        params: {
          memberNo: this.nowSelectUser.memberNo,
          memberNoGm: this.nowSelectUser.memberNoGm,
          code: this.nowSelectUser.codePm,
        //  pmTypeCode:''
        }
      })
        .then(res => {
          if (res.status == '200' && res.data.result) {
            this.selectCustomerInfo = res.data.returnObject

            let params = this.$route.params

            let path = `/im-web/app/${params.wxId}/chat/history/user/code/${this.selectCustomerInfo.code}/${params.memberNo}`

            this.$router.push({
              path
            })
          }
        })
        .catch(error => {})
    },

    //20190521 合并功能  导购可以给下级的客户发消息
    //并显示未读数量
    //发消息
    sendChatMessage (item) {
      // this.updateThirdHaveRead(item)
      this.$store.commit('SET_CURRENT_PERSON_MEMBER_CODE', item.codePm)
      this.$store.dispatch('currentPersonMember', item)

      let path = `/im-web/app/${this.$cfg.nowSelectInfo.noWx}/user/chat/${item.codePm}/${item.memberNoGm}/${item.memberNo}`
      this.$router.push({
        path
      })
    },

    //获取导购下面的客户未读数量
    getCustomerUnreadCount () {
      window.clearTimeout(this.clearTime)
      let params = {
        memberNoList: this.customerMemberNoArr.join(','),
        shopNo: this.$route.params.memberNo,//导购
        noWxShop: this.$cfg.nowSelectInfo.noWx,
        memberNoGm: this.nowSelectguide.memberNo
      }

      this.$http.post('/api/imh5/index/unreadCountByMember.do',params)
        .then( (res)=>{
          let data = res.data.returnObject
          if(res.data.result && data){

            this.renderDataCopy.forEach( (item)=> {
              data.forEach( (list)=> {
                if(item.memberNo == list.memberNo) {
                  item.unreadCount = list.unreadCount
                }
              })
            })

            this.renderData = this.renderDataCopy
            let that = this;
             that.clearTime = setTimeout( ()=> {
              that.getCustomerUnreadCount()
            },60000)
          }
        })
    },

    //更新第三方已读
    // updateThirdHaveRead (item) {
    //   let params = {
    //     memberNo: item.memberNo,
    //     memberNoGm: item.memberNoGm,
    //     merchantNo: this.$cfg.userInfo.memberNoMerchant,
    //   }
    //
    //   this.$http.post('/api/imh5/index/updateThirdHaveRead.do',params).then( res => {
    //     if(res.data.result){
    //         console.log('更新第三方已读成功')
    //     }
    //   })
    // },

  },
  created () {
    this.getCustomer()

  },
  mounted(){
  },
  destroyed () {
     clearTimeout(this.clearTime);//清除未完成订单定时器
     this.clearTime = null
  },

}
</script>

<style lang="less" scoped>
.customer-list-con {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
}

.this-header {
  width: 100%;
  height: 60px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-sizing: border-box;
  line-height: 59px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.head_input{

  input{
    height: 30px;
    line-height: 30px;
    border-radius: 5px;
    border: 1px solid #d1d1d1;
    text-indent: 10px;
    width: 220px;
    font-size: 14px;
    background: transparent
  }
}

.customer-con {
  width: 100%;
  height: 1px;
  flex: 1;
  overflow-y: auto;
}

.customer-ul {
  width: 100%;

  > li {
    width: 100%;
    height: 60px;
    display: flex;
    padding: 0 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin-top: 10px;
  }

  .head_img{
    position: relative;

    .head {
      width: 50px;
      height: 50px;
      display: block;
      border-radius: 10px;
    }

    .pao {
      display: inline-block;
      width: 12px;
      height: 12px;
      position: absolute;
      top: -5px;
      right: -5px;
      padding: 3px;
      color: #fff;
      background-color: #f31919;
      border-radius: 50%;
      font-size: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }


  .customer-info-section {
    flex: 1;
    padding: 0 10px;

    .name {
      padding-top: 4px;
      font-size: 16px;
    }
  }

  // .do-com {
  //   // width: 100px;
  //   height: 100%;
  // }

  .do-but {
    padding:10px;
    text-align: center;
    color: #fff;
    font-size: 14px;
    margin-top: 5px;
    background-color: #08A406;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;
    box-sizing: border-box;
  }
}

.customer-info {
  width: 260px;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;

  .title {
    width: 100%;
    height: 60px;
    text-align: center;
    line-height: 59px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }

  .info-ul {
    background-color: #fff;
    flex: 1;

    > li {
      width: 100%;
      height: 40px;
      padding: 0 20px;
      line-height: 40px;
    }
  }
}
.noresult{
  text-align: center;
  margin-top:30px;
  color: #333;
}
</style>
