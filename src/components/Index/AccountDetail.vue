<template >
  <div class="control-con">
    <div class="client_serviceHead">
        <img id="serviceHead_img" :src="headAddress">
        <div class="wxNickname" id="wxNickname">{{wxNickname}}</div>
        <el-dropdown trigger="click" @command="dropDownList">
          <span class="el-dropdown-link">
            <i class="arrowRight"><img src="../../../static/img/more.png" alt=""></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">发起群聊</el-dropdown-item>
            <el-dropdown-item command="2">添加朋友</el-dropdown-item>
            <el-dropdown-item command="3">我的二维码</el-dropdown-item>
            <el-dropdown-item command="4">批量分组</el-dropdown-item>
            <el-dropdown-item command="5">批量添加标签</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div class="search_box">
        <div class="search_border">
          <input type="text" @keyup.enter="changeSearch()" class="searchTh"  autocomplete="new-password" v-model="searchVal" :disabled="disableIndex != 0">
          <a class="icon_search" @click="changeSearch()"></a>
        </div>
      </div>

      <ul class="head-nav-ul">
        <li
          v-for="(item, index) in headNavUl"
          :key="index"
          :title="item.name"
          :class="['icon-' + item.icon, {active: headNavActiveIndex == index}]"
          @click="showComponent(item, index)"
        ></li>
      </ul>

      <div class="showList">
        <component
          :is="componentName">
        </component>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { SET_PERSON_CATEGORY_INDEX } from '@/store/type'

export default {
  name: 'AccountDetail',
  data () {
    return {
      headNavUl: [
        {
          name: '消息',
          icon: 'message',
          componentName: 'MessageList'
        },
        {
          name: '群',
          icon: 'group',
          componentName: 'GroupChatList'
        },
        {
          name: '朋友圈',
          icon: 'circle',
          componentName: 'CircleFriendsList'
        },
        {
          name: '联系人',
          icon: 'contact',
          componentName: 'AddressBookList'
        }
      ],

      headAddress: '', // 头像
      wxNickname: '', // 微信昵称
      searchVal: '',
      noWx: '',
      hideBar:true,
      disableIndex:0

    }
  },

  components: {
    MessageList: () => import('@/components/Group/MessageList'),
    CircleFriendsList: () => import('@/components/Group/CircleFriendsList'),
    GroupChatList: () => import('@/components/Group/GroupChatList'),
    AddressBookList: () => import('@/components/Group/AddressBookList')
  },

  computed: {
    ...mapGetters([
      'serviceInfo',
      'searchChatName',
      'is_messageList',
      'is_circleFriendsList',
      'personCategoryIndex'
    ]),

    headNavActiveIndex: {
      get () {
        return this.personCategoryIndex
      },

      set (val) {
        this.setPersonCategoryIndex(val)
      }
    },

    // 当前显示组件的名称
    componentName () {
      return this.headNavUl[this.headNavActiveIndex].componentName
    },

    // isAdmin(){
    //   if(this.serviceInfo && this.serviceInfo._role.indexOf('admin') > -1){
    //     return true;
    //   }else{
    //     return false;
    //   }
    // },

    // isGuide(){
    //   if(this.serviceInfo && this.serviceInfo._role.indexOf('ShoppingGuide') > -1){
    //     return true;
    //   }else{
    //     return false;
    //   }
    // },

  },

  watch: {
    serviceInfo (val) {
      this.headAddress = val.headAddress;
      this.wxNickname = val.wxNickname;

      // if(!this.isGuide){
      //   this.headNavActiveIndex = 2;
      // }
    }
  },

  mounted () {
    let self = this
    try {
      var info = this.$cfg.nowSelectInfo
      self.defaultActived = true
      self.headAddress = info.headAddress
      self.wxNickname = info.wxNickname
      self.noWx = info.noWx
    } catch (e) {
      console.log('data has error!')
    }
  },

  methods: {
    ...mapMutations({
      setPersonCategoryIndex: SET_PERSON_CATEGORY_INDEX
    }),

    dropDownList (val) {
      let self = this

      if (val == 1) {
        this.$showPopOperating('Group', {
          closeFun: () => {
            self.$hidePopOperating()
          }
        })
      } else if (val == 2) {
        this.$showPopOperating('AddFriends', {
          closeFun: () => {
            self.$hidePopOperating()
          }
        })
      } else if (val == 3) {
        this.$showPopOperating('ShowScancode', {
          closeFun: () => {
            self.$hidePopOperating()
          }
        })
      } else if (val == 4) {
        this.$showPopOperating('BatchGroup', {
          closeFun: () => {
            self.$hidePopOperating()
          }
        })
      } else {
        this.$showPopOperating('BatchTags', {
          closeFun: () => {
            self.$hidePopOperating()
          }
        })
      }
    },

    showComponent (obj, index) {
      // console.log(obj)
      // console.log(index)
      // if(!this.isGuide){
      //   this.headNavActiveIndex = 2;
      //
      //   return;
      // }
      this.headNavActiveIndex = index
      this.searchVal = ''

      if(index === 0){
        this.disableIndex = 0
      } else {
        this.disableIndex = 1
      }

    },

    changeSearch () {
      this.$store.dispatch('searchChatName', this.searchVal)
      // console.log(this.searchVal)
    },



  }
}
</script>

<style lang="less" scoped="">
  .control-con{
    width: 300px;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: #292d32;
    border-right: 1px solid #666;

    .showList{
      width: 100%;
      height: 1px;
      flex: 1;
    }

    .head-nav-ul{
      width: 100%;
      height: 46px;
      position: relative;
      display: flex;
      border-bottom: 1px solid #000;

      > li{
        flex: 1;
        text-align: center;
        line-height: 46px;
        position: relative;
        color: #fff;
        font-size: 24px;
        cursor: pointer;

        &:after{
          width: 2px;
          height: 20px;
          position: absolute;
          right: 0;
          top: 8px;
          display: block;
          content: '';
          background-color: #000;
        }

        // &:last-child{
        //   &: after{
        //     display: none;
        //   }
        // }
      }

      .active{
        color: #08A406;
      }

      .icon-message{
        &:before{
          font-family: 'iconfont';
          content: '\e61e';
        }
      }

      .icon-group{
        &:before{
          font-family: 'iconfont';
          content: '\e61b';
        }
      }

      .icon-circle{
        &:before{
          font-family: 'iconfont';
          content: '\e644';
        }
      }

      .icon-contact{
        &:before{
          font-family: 'iconfont';
          content: '\e61c';
        }
      }

    }

    .client_serviceHead{
      width: 100%;
      height: 60px;
      display: flex;
      position: relative;
      align-items: center;
      padding: 10px;
      box-sizing: border-box;

    //  border-bottom: 1px solid #cac5c5;
    #serviceHead_img{width: 40px;height: 40px;border-radius: 3px;}
      .wxNickname{
        color: #fff;
        font-size: 16px;
        width: 55%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        padding: 0 10px;
      }
      .arrowRight{
        width: 16px;
        height: 16px;
        display: inline-block;
        transform: rotate(180edg);
        cursor: pointer;
        // position: absolute;
        // right: -47px;
        // top: -8px;
      }

    }
    .myCode{width: 100%;height: 100%;background-color: red;}
    .search_box{
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
    }
    .search_border{
      width: 96%;
      border-radius: 3px;
    //  border:1px solid #d1d1d1;
      height: 30px;
      display: flex;
      align-items: center;
      margin: 0 auto;
      background-color: #151617;
      position: relative;
      .searchTh{
        width: 80%;
        height: 21px;
        border: none;
        margin-left: 3%;
        border-radius: 20px;
        font-size: 14px;
        background-color:transparent;
        color: #fff;
      }
      .icon_search{
        width: 20px;
        height: 20px;
        position: absolute;
        right: 8px;
        cursor: pointer;
        background: url("../../../static/img/search_1.png") no-repeat;
        background-size: 100% 100%;
      }
    }
  }

  .el-dropdown{
    position: absolute;
    right: 20px;
    top: 25px;
  }
</style>
