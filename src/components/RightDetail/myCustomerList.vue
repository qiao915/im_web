<template >
  <div class="group-info-con">
      <div class="detail_head">
        <span>我的客户</span>
        <span class="head_input">
          <input type="text" placeholder="输入客户昵称" v-model="searchMemberName">
        </span>
      </div>
      <section class="customer-con">
          <ul class="customer-ul">
              <li v-for="(item, index) in contactMyCustomerData" :key="index" :class="{actived: activeGroup == index}" @click="getCustomerDetail(item, index)">
                  <img class="head" :src="createMessageAvatar(item)" alt="">
                  <section class="customer-info">
                      <p class="name">{{item.nickNameWx}}</p>
                  </section>
                  <div class="do-but" @click.stop="sendMessage(item)">发消息</div>
              </li>
          </ul>
          <div class="noresult" v-if="contactMyCustomer.length == 0">
            暂无数据
          </div>
      </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { createUploadUrl, getAssetPath } from '@/tools/resourceTool'
import { CHAT_USER_TYPE } from '@/utils/constants'

export default {
  name: 'myCustomerList',
  data () {
    return {
      activeGroup: -1,
      searchMemberName: ''

    }
  },
  computed: {
    ...mapGetters([
      'contactMyCustomer',
      'show_memberDetail'
    ]),

    //模糊搜索
    contactMyCustomerData: function() {
      var self = this;
      var contactMyCustomerData = []
      if(!self.searchMemberName){
        return self.contactMyCustomer
      }
      return self.contactMyCustomer.filter(function(item) {
         return (
           item.nickNameWx
           .toLowerCase()
            .indexOf(self.searchMemberName.toLowerCase()) !== -1
         );
      })
    },

  },
  mounted () {
    this.getCustomer()
  },
  methods: {
    ...mapActions(['prepareChating']),


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

    //给客户发消息
    sendMessage (item) {
      let params = this.$route.params
      this.prepareChating({
        code: item.pmCode,//memberNo
        chatUserType: CHAT_USER_TYPE.user
      })
      this.$router.push({
        path: `/im-web/app/${params.wxId}/user/chat/${item.pmCode}/${item.memberNoGm}/${item.memberNo}`
      })

    },

    getCustomerDetail (item, index) {
      this.activeGroup = index
      let params = this.$route.params

      this.$router.push({
        path: `/im-web/app/${params.wxId}/myCustomerList/${item.pmCode}/${item.memberNo}/${item.memberNoGm}`
      })

      this.$store.dispatch('show_memberDetail', true)
    },

    createMessageAvatar (item) {
      let avatar

      if (item.headAddress) {
        avatar = item.headAddress
      } else {
        avatar = getAssetPath('static/img/default-user.png')
      }
      return avatar
    },



  },
  destroyed(){
    this.activeGroup = -1
    this.$store.dispatch('show_memberDetail', false)
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
  font-size: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space:nowrap;
  display: flex;
  justify-content: space-between;
  .head_input{
    margin-right: 30px;
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
        padding: 5px 30px;
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
            color:#313131;
        }
    }

    .do-com{
        height: 100%;
    }

    .do-but{
        padding: 0 10px;
        min-width: 80px;
        text-align: center;
        height: 35px;
        line-height: 35px;
        color: #fff;
        font-size: 14px;
        margin-top: 5px;
        background-color: #09c106;
        border-radius: 8px;
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
