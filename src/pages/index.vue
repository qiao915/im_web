<template>
  <section class="main-body">
    <section class="header-con">
      <Navbar></Navbar>
    </section>
    <div class="contentBox">
      <span  v-if="hide_leftBar">
        <LeftBar></LeftBar>
      </span>

      <AccountDetail v-if="showRightContent" ></AccountDetail>
      <RightContent v-if="showRightContent" ></RightContent>
    </div>
    <div class="moreFuc" v-if="is_moreFunction">
      <MoreFunctions></MoreFunctions>
    </div>
    <!-- pop 操作层 -->
    <component
        :is="popOperating.name"
        :propsData="popOperating.propsData"
        @close="popOperating.closeFun"
        @complete="popOperating.completeFun">
    </component>

  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Navbar from '@/components/common/navbar'
import LeftBar from '@/components/Index/LeftBar'
import AccountDetail from '@/components/Index/AccountDetail'
import RightContent from '@/components/Index/RightContent'
import MoreFunctions from "@/components/RightInfo/MoreFunctions"

export default {
  name: 'app',

  components: {
    Navbar,
    LeftBar,
    AccountDetail,
    RightContent,
    MoreFunctions,

    Group: () => import('@/components/CreatGroup/Group'), //建群
    AddFriends: () => import('@/components/CreatGroup/AddFriends'), //添加好友
    ShowScancode: () => import('@/components/CreatGroup/ShowScancode'), //商户二维码
    GroupScanCode: () => import('@/components/CreatGroup/GroupScanCode'), //群二维码
    BatchGroup: () => import('@/components/CreatGroup/BatchGroup'), //批量分组
    BatchTags: () => import('@/components/CreatGroup/BatchTags'), //批量添加标签
    EditGroup: () => import('@/components/CreatGroup/EditGroup'), //编辑客户分组
    EditTags: () => import('@/components/CreatGroup/EditTags'), //编辑客户标签
    Transpond: () => import('@/components/CreatGroup/Transpond'), //转发

    //以下是功能大全
    Trusteeship: () => import('@/components/RightInfo/Trusteeship'),  //托管
    VerbalTrick: () => import('@/components/RightInfo/VerbalTrick'),  //话术
    MassTexting: () => import('@/components/RightInfo/MassTexting'),  //群发
    SensitiveWord: () => import('@/components/RightInfo/SensitiveWord'),  //敏感词
    SmartPush: () => import('@/components/RightInfo/SmartPush'),  //智能推送
    RedPacket: () => import('@/components/MarketFunction/RedPacket'), //红包
    Activity: () => import('@/components/MarketFunction/Activity'), //活动
    DiscountCoupon: () => import('@/components/MarketFunction/DiscountCoupon'), //优惠券
    CircleFriends: () => import('@/components/DataFunction/CircleFriends'), //朋友圈
    Material: () => import('@/components/DataFunction/Material'), //素材
    TencentManage: () => import('@/components/ManageFunction/TencentManage'), //公众号
    AppletManage: () => import('@/components/ManageFunction/AppletManage'), //小程序
    Tag: () => import('@/components/ManageFunction/Tag'), //标签
    EditUserTag: () => import('@/components/ManageFunction/EditUserTag'), //
    Groupe: () => import('@/components/ManageFunction/Groupe'), //
    CommentSetting: () => import('@/components/Setting/CommentSetting'),  //点评
    EmojiSetting: () => import('@/components/Setting/EmojiSetting'),  //表情设置
    VariateSetting: () => import('@/components/Setting/VariateSetting'),  //变量

  },

  computed: {
    ...mapGetters([
      'loading',
      'popOperating',
      'serviceInfo',
      'is_moreFunction',
      'hide_leftBar'
    ])
  },

  data () {
    return {
      componentName: '',
      propsData: { },
      closeFun: null,
      completeFun: null,
      showRightContent: false,
      wxId: ''
    }
  },

  async beforeRouteUpdate (to, from, next) {
    if (to && to.params.wxId === this.wxId) {
      next()
      return
    }

    this.wxId = to.params.wxId
    this.selectService(to.params.wxId);

    await this.initChating()
    next()
  },

  async created () {
    this.wxId = this.$route.params.wxId
    await this.initChating()
  },

  methods: {
    ...mapActions(['fetchPersonMemberList', 'setPersonMemberList']),

    async initChating () {
      this.showRightContent = false

      if (this.checkIsGuide(this.serviceInfo)) {
        await this.fetchPersonMemberList({})
      } else {
        await this.setPersonMemberList({ list: [] })
      }
      // 加载会话列表后再初始化右侧
      this.showRightContent = true
    },

    selectService(wxId){
      let items = this.$cfg.serviceInfo[wxId];
      this.$store.dispatch('serviceInfo', items);
      this.$cfg.set('nowSelectInfo', items);
    },

    checkIsGuide (serviceInfo) {
      return serviceInfo && serviceInfo._role.indexOf('ShoppingGuide') > -1
    },
  },
}
</script>

<style lang="less" scoped>
  .main-body{
    width: 100%;
    height:100%;
    position: relative;
    background-color:#fff;
    display: flex;
    flex-direction: column;
  }
  .header-con{
    width: 100%;
    height: 68px;
  }
  .contentBox{
    width: 100%;
    background-color: #fdfdfd;
    display: flex;
    flex: 1;
    overflow: auto;
  }
  .moreFuc{
    width: 270px;
    height: 100%;
    border-left: 1px solid #cac5c5;
    position: fixed;
    right: 0;
    top: 70px;
    background-color: #ededed;
  }
</style>
