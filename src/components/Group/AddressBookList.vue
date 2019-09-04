<template>
  <div class="customer-con">
    <section class="item-list">
      <ListTitle class="ListTitle" @hasClick="goGetCustomer">
        <template slot="groupName">
          <span>认领客户</span>
        </template>
        <template
          slot="groupNameNumber"
          v-if="claimedCustomer.length"
        >&nbsp;({{claimedCustomer.length}})</template>
      </ListTitle>

      <!-- <ListTitle class="ListTitle" @hasClick="zombieFans">
        <template slot="groupName">
          <span>僵尸粉</span>
        </template>
        <template
          slot="groupNameNumber"
          v-if="zombieList.length"
        >&nbsp;({{zombieList.length}})</template>
      </ListTitle> -->


      <ListTitle class="ListTitle" @hasClick="showcustomer">
        <template slot="groupName">
          <span>我的客户</span>
        </template>
        <template slot="groupNameNumber">&nbsp;({{contactMyCustomer.length}})</template>
      </ListTitle>

    </section>

    <section class="item-list" v-if="isAdmin">
      <ListTitle class="ListTitle" @hasClick="showMySales">
        <template slot="groupName">
          <span>我的导购</span>
        </template>
        <template slot="groupNameNumber">&nbsp;({{contactMySales.length}})</template>
      </ListTitle>

      <div class="otherList" :class="{active: activeSales}">
        <div class>
          <ul>
            <li
              v-for="(item, index) in contactMySales"
              :key="index"
              :class="{actived: changeActived2 == index}"
              @click="guideCustomer(item,index)"
            >
              <span class="border_box">
                <span class="head_img">
                  <img :src="createMessageAvatar(item)">
                  <i class="pao" v-if="item.unreadCount">{{item.unreadCount}}</i>
                </span>

                <span>{{item.assistantName}}</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import ListTitle from '../core/ListTitle'
import { createUploadUrl, getAssetPath } from '@/tools/resourceTool'
import { mapGetters } from 'vuex'
import Bus from '../Data/bus.js'

export default {
  name: 'AddressBookList',
  components: {
    ListTitle
  },
  data () {
    return {
      changeActived1: -1,
      changeActived2: -1,
      selectVal: '',
      isAdmin:false,
      activeSales: false,
      claimedCustomer: [],  //认领客户
      memberList:[],
      zombieList: [], //僵尸粉
      clearTime: null,
      memberNoGms: [],//导购memberNo合集
    }
  },
  created () {
    this.initData()
  },
  mounted () {
    if(this.$cfg.userInfo.adminUserId){
      this.isAdmin = true
    }
    Bus.$on("refreshClaimedCustomer",(e)=>{
      this.getClaimadUser()
      this.getCustomer()
    })
  },
  computed: {
    ...mapGetters([
      'contactMyCustomer',
      'contactMySales',
      'serviceInfo',
      'claimedCustomerHasChange',
    ]),

  },
  watch: {
    // claimedCustomerHasChange () {
    //   this.getClaimadUser()
    // },
    serviceInfo () {
      this.clearData()
      this.initData()
    }
  },
  methods: {
    initData () {
      this.getCustomer()
      this.getSalse()
      this.getClaimadUser()
    },
    clearData () {
      this.$store.commit('CONTACT_MY_CUSTOMER', [])
      this.$store.commit('CONTACT_MY_SALES', [])
    },
    chooseSelect (selectVal) {
      //  console.log(selectVal)
    },

    getCustomer () {
      var startIndex = 0
      let user = this.$cfg.userInfo
      let nowSelectInfo = this.$cfg.nowSelectInfo

      // 获取客户列表
      this.$http({
        type: 'get',
        url: '/api/im/contacts/findMemberClaimPage.do',
        params: {
          currentMemberNoGm: user.memberNoGuid,
          memberNoGmFlag: true,
          start: '0',
          sortBy: startIndex,
          limit: 9999999
        }
      })
        .then(res => {
          if (parseInt(res.status) === 200 && res.data.result) {
            this.$store.commit('CONTACT_MY_CUSTOMER', res.data.returnObject.rows)

          }
        })
    },

    getSalse () {
      let user = this.$cfg.userInfo
      let nowSelectInfo = this.$cfg.nowSelectInfo

      // 获取导购列表
      this.$http({
        type: 'get',
        url: '/api/member/findShopGm.do',
        params: {
          memberNoGm: user.memberNoGuid, // mast, 导购编
          merchantNo: user.memberNoMerchant, // mast,商户编号
          shopNo: user.shopNo, // mast,门店编号
          noWx: nowSelectInfo.noWx
        }
      })
        .then(res => {
          if (parseInt(res.status) === 200 && res.data.result) {
            this.salseList = res.data.returnObject
            this.$store.commit('CONTACT_MY_SALES', res.data.returnObject)
            this.getCustomerUnreadCount()
          }
        })
    },

    getClaimadUser () {
      let user = this.$cfg.userInfo

      this.$http({
        type: 'get',
        url: '/api/im/contacts/findMemberClaimPage.do',
        params: {
          currentMemberNoGm: user.memberNoGuid,
          flag: false,
          start: '0',
          sortBy: 0,
          limit: 9999999
        }
      })
        .then(res => {
          if (parseInt(res.status) === 200 && res.data.result) {
            this.claimedCustomer = res.data.returnObject.rows
          }
        })
    },


    cutList (item, index) {
      this.changeActived1 = index
      this.changeActived2 = -1

      // 到这个人的个人信息
      this.$router.push({
        // path: `/im-web/app/${this.$route.params.wxId}/user/info/${item.mbrCode}/${item.memberNo}/${item.memberNoGm}`
         path: `/im-web/app/${this.$route.params.wxId}/user/info/${item.pmCode}/${item.memberNo}/${item.memberNoGm}`
      })
    },

    // 导购列表
    guideCustomer (item,index) {
      this.changeActived1 = -1
      this.changeActived2 = index
      this.$store.commit('NOW_SELECT_GUIDE', item)
       // console.log(this.$cfg.nowSelectInfo)

      this.$router.push({
        path: `/im-web/app/${this.$route.params.wxId}/guide/customer/${item.memberNo}`
      })
    },

    showMySales () {
      this.activeSales = !this.activeSales
    },

    //认领客户
    goGetCustomer () {
      let params = this.$route.params

      this.$router.push({
        path: `/im-web/app/${params.wxId}/customer/claim/${
          this.$cfg.userInfo.memberNoGuid
        }`
      })
    },

    //获取导购下面的 总 客户未读数量
    getCustomerUnreadCount () {
      this.contactMySales.forEach( (item) =>{
        this.memberNoGms.push(item.memberNo)
      })
      let params = {
        memberNoGms: this.memberNoGms.join(','),
        noWxGm: this.$cfg.nowSelectInfo.noWx,
        // merchantNo: this.$cfg.userInfo.memberNoMerchant,
      }

      this.$http.post('/api/imh5/index/unreadCountByGm.do',params)
        .then( (res)=>{
          let data = res.data.returnObject
          if(res.data.result && data){

            this.contactMySales.forEach( (item)=> {
              data.forEach( (list)=> {
                if(item.memberNo == list.memberNoGm) {
                  item.unreadCount = list.UNREAD_COUNT
                }
              })
            })
            this.$store.commit('CONTACT_MY_SALES', this.contactMySales)

            let that = this;
            that.clearTime = setTimeout( ()=> {
              that.getCustomerUnreadCount()
            },60000)

          }
        })
    },


    createMessageAvatar(item){
      let avatar
      if (item.headUrl) {
        if((item.headUrl).includes('http')){
          avatar = item.headUrl
        }else{
          avatar = createUploadUrl(item.headUrl, this.$cfg.userInfo.uploadUrl)
        }

      } else {
        avatar = getAssetPath('static/img/default-user.png')
      }

      return avatar
    },

    //僵尸粉页面
    zombieFans () {
      let params = this.$route.params

      this.$router.push({
        path: `/im-web/app/${params.wxId}/zombieFans/${params.code}/${params.memberNo}/${params.memberNoGm}`
      })
    },

    //我的客户页面
    showcustomer () {
      let params = this.$route.params

      this.$router.push({
        path: `/im-web/app/${params.wxId}/myCustomerList/${params.code}/${params.memberNo}/${params.memberNoGm}`
      })

    },

  },
  destroyed () {
     clearTimeout(this.clearTime);//清除未完成订单定时器
     this.clearTime = null
  },

  activated(){
    this.clearData()
    this.initData()
  }

}
</script>

<style lang="less" scoped>
.customer-con {
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: auto;
}

.ListTitle {
  cursor: pointer;
}
.select_box {
  width: 100%;
  height: 30px;
  line-height: 30px;
  display: flex;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  background-color: #2e3238;
  color: #fff;
  justify-content: space-between;
  label {
    align-items: center;
  }
  .select_input {
    width: 50%;
    margin-left: 2%;
    border-radius: 2px;
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
      height: 60px;
      line-height: 60px;
      list-style: none;
      padding: 0 10px;
      background: #2e3238;
      &:hover {
        background: #3b4047;
        cursor: pointer;
      }
      .border_box {
        align-items: center;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-flow: row nowrap;
        border-bottom: 1px solid #1f1c1c;

        .head_img{
          position: relative;

          img {
            // flex: 0 0 auto;
            width: 40px;
            height: 40px;
            vertical-align: middle;
            margin-right: 20px;
          }

          .pao {
                display: inline-block;
                width: 12px;
                height: 12px;
                position: absolute;
                top: 6px;
                right: 14px;
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

        span{
          // flex: 1 1 auto;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}

.active {
  height: auto;
}
</style>
