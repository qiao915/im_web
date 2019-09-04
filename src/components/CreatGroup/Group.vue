
<template >
  <div class="">
    <MaskLayer :isShowBox="isShowBox">
        <template slot="MaskBox">
          <div class="propBox">
            <span class="delete" @click="closeBox()"></span>
            <div class="step_box">
              <span v-if="steps == 1">
                <input type="text" v-model="searchMemberNick" placeholder="输入微信昵称"/>
              </span>
            </div>
            <div class="stepList_box">
              <div v-if="steps == 1">
                <ul>
                  <li v-for="item in memberDataList" :key="item.noWx">
                  <input type="checkbox" :value="item.noWx" v-model="checkboxList"/>
                  <img class="headImg" :src="item.headAddress" alt="">
                  <span class="flex_box">
                    <p>
                    {{item.nickNameRemarkWx || item.memberName}}
                      <span v-if="item.sex == 'FEMALE'">
                        <img src="../../../static/img//icon/woman.png" alt="">
                      </span>
                      <span v-if="item.sex == 'MALE'">
                        <img src="../../../static/img//icon/man.png" alt="">
                      </span>
                    </p>
                    <!-- <p class="time">{{item.dateTime}}</p> -->
                  </span>
                  </li>
                </ul>
		              <div class="noData" v-if="memberData.length == 0">
                    暂无客户
                  </div>
              </div>
              <div v-if="steps == 3">

                  <el-form ref="form" :model="form" :rules="rules" label-width="120px" label-position="left" style="padding:20px;">
                    <el-form-item label="请输入群名称：" prop="groupName">
                      <el-input v-model="form.groupName" style="width:380px;"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="选择群聊人数："  prop="groupNum">
                        <el-select v-model="form.groupNum" placeholder="请选择" style="width:380px;">
                            <el-option label="10-19" value="1"></el-option>
                            <el-option label="20-29" value="2"></el-option>
                            <el-option label="30-39" value="3"></el-option>
                        </el-select>
                    </el-form-item> -->

                  </el-form>
              </div>
              <div class="finishBox" v-if="steps == 4">
                  <img src="../../../static/img/icon/duigou.png" alt="">
                  <p style="margin-top:60px;"></p>
                  <el-button type="success" size="mini" @click="continueGroup()">继续建群</el-button>
                  <el-button type="success" size="mini" @click="downWell()">完成</el-button>
              </div>
            </div>

            <div class="footer1 cf"  v-if="steps != 4">
              <span class="quanxuan" v-if="steps == 1">
                <input type="checkbox" v-model="checked" @click="checkedAll()"/>
                <span>全选</span>
              </span>
              <span v-if="steps == 1">已选：{{checkNumber}}</span>
              <span v-if="steps == 1"  style="float:right;">
                <el-button @click="nextSteps($event)" type="success" size="mini">下一步</el-button>
              </span>
              <span v-if='steps == 3' style="float:right;">
                <el-button @click="prevpSteps()" type="success" size="mini">上一步</el-button>
                <el-button @click="saveSubmit('form')" type="success" size="mini">建群</el-button>
              </span>
            </div>
          </div>
        </template>

    </MaskLayer>
  </div>
</template>

<script>
import Bus from '../Data/bus.js'
import MaskLayer from "../core/MaskLayer"
import {mapGetters} from "vuex"
export default {
  components:{
    MaskLayer,
  },
  data(){
    return{
      limitNum:39,
      isShowBox: true,
      searchMemberNick:'',//搜索备注名
      checkboxList:[], //选中数组value
      checked: false, //重置全选按钮
      checkNumber: 0,
      steps: 1,
      memberNoGm:'',//导购编号
      memberData:[],//客户列表
      memberGmData:[],//导购列表
      form:{
        groupName: '',
        groupNum:'',
      },
      rules:{
        groupName: [
           { required: true, message: '请输入群名称', trigger: 'blur' },
         ],
         groupNum: [
            { required: true, message: '请选择群聊人数', trigger: 'blur' },
          ],
      },
    }
  },
  computed:{
    ...mapGetters([
      'contactMySales',
    ]),
    //模糊搜索
    memberDataList: function() {
      var self = this;
      var memberDataList = []
      if(!self.searchMemberNick){
        return self.memberData
      }
      return this.memberData.filter(item=> {
        return (
          item.memberName
            .toLowerCase()
            .indexOf(self.searchMemberNick.toLowerCase()) !== -1
        );
      });
    },
  },
  created(){
     this.getCustomer()
     console.log(this.$cfg.userInfo.adminUserId)
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
    }
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
       // console.log(res)
       if(res.status == '200' && res.data.result){
         this.$store.commit('CONTACT_MY_CUSTOMER', res.data.returnObject.rows);
         this.memberData = res.data.returnObject.rows
       }

     })
   },

   //提交
   saveSubmit(formName) {

     let info  = this.$cfg
     let noWxZk = info.nowSelectInfo.noWx
     let userNames = this.checkboxList.join(',')
     let url;

     if(this.checkboxList && this.checkboxList.length > this.limitNum ){
       url = '/api/im/chatroom/createChatRoomGroup.do'
     }else{
       url = '/api/im/chatroom/createChatRoom.do'
     }
     this.$refs[formName].validate((valid) => {
       if (valid) {
         this.$http({
           type: 'post',
           url: url,
           params: {
               noWxZk: noWxZk,//中控微信号
               memberNoGm: info.userInfo.memberNoGuid, //mast, 导购编号
               roomNickName: this.form.groupName, //群昵称
               userNames: userNames, //群成员微信号 逗号分隔
           }

         }).then((res)=>{

           if(res.data.result == true){
             this.$message({
               type: 'success',
               message: "建群成功"
             });
             this.checkboxList = []
             this.steps = 4
           }else{
             this.$message({
               type: 'error',
               message: res.data.errorMessage || "建群失败"
             });
           }
         }).catch((error)=>{

         });
       } else {
         console.log('error submit!!');
         return false;
       }
     });
   },
   goBack(formName){
     this.steps = 2
     this.$refs[formName].resetFields();
   },
    //全选
    checkedAll(){
      if(this.checked){
        this.checkboxList =[]
      }else{
        this.checkboxList = []
        this.memberData.forEach( (item) => {
          this.checkboxList.push(item.noWx)
        })
      }
      this.checkNumber = this.checkboxList.length
    },
    nextSteps(event){
      if(this.checkNumber){
        if(this.checkNumber < 2){
          this.$message({
            type: 'error',
            message: '至少选择2名客户'
          });
        } else{
          this.steps = 3
        }
      }else{
        this.$message({
          type: 'error',
          message: '请先选择客户'
        });
      }
    },
    //继续分组
    continueGroup(){
      this.steps = 1
      this.checkboxList = []
      this.memberNoGm = ''
    },
    //
    downWell () {
      this.$emit('close');
      Bus.$emit("refreshMessageList")
    },

    prevpSteps(){
        this.steps = 1
    },
    closeBox(){
      this.$emit('close');
    },
  },
  destroyed(){
    Bus.$off('refreshMessageList')
  },
}
</script>

<style lang="less" scoped>
.propBox{
  width: 620px;
  height: 460px;
  position: absolute;
  position: relative;
  left: 50%;
  top: 50%;
  margin-left: -310px;
  margin-top: -230px;
  background-color: #fff;
  box-shadow: #3e3d3d 0 0 15px;
  .delete{
    width: 32px;
    height: 32px;
    background: url('../../../static/img/delete.png') no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
    z-index: 999;
  }
  .step_box{
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #e2e2e2;
    input{
      width: 400px;
      height: 38px;
      line-height: 38px;
      margin-left: 20px;
      text-indent: 20px;
      border-radius: 4px;
      border: 1px solid #d1d1d1;
    }

  }
  .stepList_box{
    width: 100%;
    height: 357px;
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
.steps_active{
  color: #08A406!important;
  border-color: #08A406!important;
}
.finishBox{
  text-align: center;
  margin-top: 70px;
}

.noData{
  width: 100%;
  text-align: center;
  padding-top: 40px;
}
</style>
