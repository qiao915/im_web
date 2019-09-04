<template >
  <div class="group-info-con">
      <div class="detail_head">
        <span>僵尸粉</span>
        <span style="margin-right:38px;">
          <el-button @click="deleteAll()" type="info" size="mini">一键删除</el-button>
          <el-button @click="" type="success" size="mini">一键检查</el-button>
        </span>
      </div>
      <section class="customer-con">
          <ul class="customer-ul">
              <li v-for="(item, index) in contactMyCustomer" :key="index" :class="{actived: activeGroup == index}" @click="getZombieFansDetail(item, index)">
                  <img class="head" :src="createMessageAvatar(item)" alt="">
                  <section class="customer-info">
                      <p class="name">{{item.nickNameWx}}</p>
                  </section>
                  <i class="iconfont iconshanchu1" @click.stop="delete_single(item)"></i>&nbsp;&nbsp;&nbsp;
                  <i class="iconfont iconzhucetianjiahaoyou" @click.stop="addFriends_again(item)"></i>
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

    }
  },
  computed: {
    ...mapGetters([
      'contactMyCustomer',
      'show_memberDetail'
    ]),

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



    getZombieFansDetail (item, index) {
      this.activeGroup = index
      let params = this.$route.params

      this.$router.push({
        path: `/im-web/app/${params.wxId}/zombieFans/${item.pmCode}/${item.memberNo}/${item.memberNoGm}`
      })

      this.$store.dispatch('show_memberDetail', true)
    },

    // 一键删除
    deleteAll () {
      this.$confirm('确定要删除这两个僵尸粉客户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        type: 'warning'
      }).then(() => {
        this.$message.success('操作成功!')
        // this.$http.post('/api/imh5/smallprogram/delete.do',{
        //   code: row.code
        // }).then( res=>{
        //   // console.log(res)
        //   if(res.data.result){
        //     this.$message.success('操作成功!')
        //   } else {
        //     this.$message.error('删除失败')
        //   }
        // })

      }).catch(() => {
        this.$message.info('已取消操作')
      });
    },

    //删除单个好友
    delete_single (item) {
      this.$confirm('确定删除该僵尸粉吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        type: 'warning'
      }).then(() => {
        this.$message.success('操作成功!')
        // this.$http.post('/api/imh5/smallprogram/delete.do',{
        //   code: row.code
        // }).then( res=>{
        //   // console.log(res)
        //   if(res.data.result){
        //     this.$message.success('操作成功!')
        //   } else {
        //     this.$message.error('删除失败')
        //   }
        // })

      }).catch(() => {
        this.$message.info('已取消操作')
      });
    },

    //重新添加好友
    addFriends_again (item) {
      // let item = this.currentPersonMember

      this.$prompt(
        '你需要发送验证申请，对方通过后你才能添加其为朋友。',
        '对方启用了朋友验证', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center:true
      }).then(({ value }) => {
        this.$message.success('发送请求成功')
        // this.$http.post('/api/imh5/addFriend/doAddFriendAgian.do',{
        //   merchantNo: this.$cfg.userInfo.memberNoMerchant,
        //   scanId: '-101',
        //   noWx: item.noWx,
        //   wxQrCode: item.noWx,
        //   noWxGm: item.noWxGm,
        //   validation: value,
        //   nickNameWx: item.nickNameWx,
        // }).then( res => {
        //   console.log(res)
        //   if (res.data.returnObject.success) {
        //     this.$message.success('发送请求成功')
        //   } else {
        //     this.$message.error('发送请求失败')
        //   }
        // })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
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
        align-items: center;
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
.iconfont:before{
  font-size: 30px;
  display: inline-block;
  color: #08A406;
}
</style>
