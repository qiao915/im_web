<template >
  <div class>
    <MaskLayer :isShowBox="showTranspondBox">
      <template slot="MaskBox">
        <div class="propBox">
          <span class="delete" @click="closeBox()"></span>
          <div class="transpond_head">
            <span class="title">选择转发对象</span>
            <span class="head_input">
              <input type="text" placeholder v-model="searchTranspondName">
            </span>
          </div>
          <div class="stepList_box">
            <div>
              <ul>
                <li v-for="item in memberDataList" :key="item.noWx">
                  <!-- 多选 -->
                <input type="checkbox" :value="item" v-model="checkboxList"/>
                <!-- 单选 -->
                <!-- <label><input type="radio"  :value="item" name="1" v-model="memberInfo"/></label> -->
                <img class="headImg" :src="item.headAddress" alt="">
                <span class="flex_box">
                  <p>{{item.memberName}}</p>
                </span>
                </li>
              </ul>
            </div>
          </div>
          <div class="footer1">
            <span class="quanxuan">
              <input type="checkbox" v-model="checked" @click="checkedAll()"/>
              <span>全选</span>
            </span>
            <span>已选：{{checkNumber}}个联系人</span>
            <span style="float:right;">
              <el-button @click="submitTranspond()" type="success" size="mini">确定</el-button>
              <el-button @click="closeBox()" size="mini">取消</el-button>
            </span>
          </div>
      </div>
      </template>
    </MaskLayer>
  </div>
</template>

<script>
import { chatUtils } from '@/utils/chatUtils';
import { guid } from '@/utils';
import MaskLayer from '../core/MaskLayer';
export default {
  components: {
    MaskLayer
  },
  props: {
    propsData: {}
  },
  data () {
    return {
      showTranspondBox: true,
      memberData: [], // 客户列表
      checkboxList: [], // 多选客户数据
      memberInfo: [], // 单选客户微信、导购编号、客户编号
      searchTranspondName: '',
      checkNumber: 0,
       checked: false, //重置全选按钮
       memberNos: [],
       memberNoGms: [],
       memberNoWxs: []
    }
  },
  computed:{
    //模糊搜索转发对象
    memberDataList: function() {
      var self = this;
      return self.memberData.filter(function(item) {
         return (
           item.memberName
           .toLowerCase()
            .indexOf(self.searchTranspondName.toLowerCase()) !== -1
         );
      })
    },
  },
  watch:{
    checkboxList:{
      handler:function(val,oldVal){
        this.checkNumber = val.length
        if(this.checkboxList.length === this.memberData.length){
          this.checked = true
        }else{
          this.checked = false
        }
        deep: true
      }
    },

  },
  mounted(){
    this.getCustomer()
  },
  methods:{
    // 获取客户列表
    getCustomer(){
     var startIndex = 0;
     let user = this.$cfg.userInfo;
     let nowSelectInfo = this.$cfg.nowSelectInfo;
     let flag = this.$cfg.userInfo.adminUserId

     this.$http({
         type: 'get',
         url: '/api/im/contacts/findFriends.do',
         params: {
           adminUserId: flag,
           merchantNo: user.memberNoMerchant, //mast,商户编号
           noWxGm: nowSelectInfo.noWx, //mast,门店编号
           version: '1',
           start: '', //起始行
           sortBy: startIndex,
           limit: 9999999,
         }
     }).then((res)=>{
      //  console.log(res)
       if(res.status == '200' && res.data.result){
         this.memberData = res.data.returnObject.rows
       }
     }).catch((error)=>{

     });
   },
   //提交转发
   submitTranspond(){

     if(this.checkboxList == 0){
       this.$message.error('请选择转发对象！')
       return
     }
     this.checkboxList.forEach( item=>{
       this.memberNos.push(item.memberNo)
       this.memberNoGms.push(item.memberNoGm)
       this.memberNoWxs.push(item.noWx)
     })

     let msgId = guid() // 随机生成消息id
     let message = {
       memberNo: this.memberNos.join(','),
       memberNoGm: this.memberNoGms.join(','),
       noWx: this.memberNoWxs.join(','),
       chatroomType: 1,
       msgId,
       senderFlag: 1
     }

      message.type = this.propsData.type
      const type = parseInt(this.propsData.type)
      if (type === 1) {
        Object.assign(message, {
          content: this.propsData.content
        })
      } else if (type === 3) {
        Object.assign(message, {
          resources: this.propsData.resourcesPath
        })
      } else if (type === 49) {
        // 文章
        Object.assign(message, {
          content: '文章',
          shareTitle: this.propsData.shareTitle,
          shareUrl: this.propsData.shareUrl,
          resources: this.propsData.resourcesPath,
          shareDes: this.propsData.shareDes
        })
      }
      // else if (type === 494) {
      //   //小程序
      //   Object.assign(message, {
      //     type: 494,
      //     code: this.propsData.code,
      //     // shareTitle: this.propsData.shareTitle,
      //     // resources: this.propsData.resourcesPath
      //   })
      // }
      // else if (type === 492) {
      //   // 活动
      //   Object.assign(message, {
      //     shareTitle: this.propsData.shareTitle,
      //     shareUrl: this.propsData.shareUrl,
      //     resources: this.propsData.resourcesPath,
      //     shareDes: this.propsData.shareDes
      //   })
      // }else if (type === 490) {
      //   // 素材
      //   Object.assign(message, {
      //     type: 490,
      //     shareTitle: this.propsData.shareTitle,
      //     shareUrl: this.propsData.shareUrl,
      //     resources: createUploadUrl(
      //       this.propsData.resourcesPath,
      //       this.userInfo.uploadUrl
      //     ),
      //     shareDes: this.propsData.shareDes
      //   })
      // }  else if (type === 43 || type === 495) {
      //   Object.assign(message, {
      //     shareTitle: this.propsData.shareTitle,
      //     resources: this.propsData.resourcesPath
      //   })
      // }
      else {
        let message = '无法转发此类型的消息'
        this.$message({
          type: 'error',
          message
        })
        console.log(message)
        return
      }

      chatUtils.sendMessageAsync(message)

      this.closeBox()
      this.$message.success("转发成功")
    },

    closeBox () {
      this.$emit('close')
    },

    //全选
    checkedAll(){
      if(this.checked){
        this.checkboxList =[]
      }else{
        this.checkboxList = []
        this.memberData.forEach( (item) => {
          this.checkboxList.push(item)
        })
      }
      this.checkNumber = this.checkboxList.length
    },

  },

}
</script>

<style lang="less" scoped>
.propBox {
  width: 640px;
  height: 500px;
  position: relative;
  left: 50%;
  top: 50%;
  margin-left: -320px;
  margin-top: -250px;
  background-color: #fff;
  box-shadow: #3e3d3d 0 0 15px;
  .delete {
    width: 32px;
    height: 32px;
    background: url("/static/img/delete.png") no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
    z-index: 999;
  }
  .transpond_head{
    height: 50px;
    line-height: 50px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #d1d1d1;
    .title{
      margin-left: 30px;
      font-size: 14px;
      color: #333;
    }
    .head_input{
      margin-right: 90px;
      input{
        height: 30px;
        line-height: 30px;
        border-radius: 5px;
        border: 1px solid #d1d1d1;
        text-indent: 10px;
        width: 220px;
      }
    }
  }
  .stepList_box{
    width: 100%;
    height: 400px;
    padding:0 20px;
    box-sizing: border-box;
    overflow: auto;
    ul li{
      display: -webkit-box;
      // display: flex;
      flex:1;
      border-bottom: 1px solid #e2e2e2;
      margin-top: 10px;
      padding-bottom: 10px;
      vertical-align: middle;
      .flex_box{
        display: flex;
        flex:1;
        justify-content: space-between;
        flex-direction: column;
      }
      .headImg{
        width: 40px;
        height: 40px;
        border-radius: 3px;
        margin: 0 15px 0 10px;
        vertical-align: middle;
      }
      .time{
        color: #737373;
        font-size: 12px;
      }
    }
  }
  .footer1{
    width: 100%;
    height: 45px;
    line-height: 45px;
    background-color: #f2f2f2;
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 0 10px;
    box-sizing: border-box;
    .quanxuan{
      margin-right: 20px;
    }
  }
}
</style>
