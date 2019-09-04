<!--批量分组  -->
<template >
  <div class="">
    <MaskLayer :isShowBox="isShowBox">
        <template slot="MaskBox">
          <div class="propBox">
            <span class="delete" @click="closeBox()"></span>
            <div class="step_box">
              <span :class="[defaultClass,steps == 1 ? 'steps_active' : '']">选择客户</span><i class="icon el-icon-back"></i>
              <span :class="[defaultClass,steps == 2? 'steps_active' : '']">选择分组</span><i class="icon el-icon-back"></i>
              <span :class="[defaultClass,steps == 3 ? 'steps_active' : '']">完成</span>
            </div>
            <div class="stepList_box">
              <div v-if="steps == 1">
                <ul>
                  <li v-for="item in memberData" :key="item.memberNo">
                  <input type="checkbox" :value="item.memberNo" v-model="checkboxList"/>
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
              </div>
              <div v-if="steps == 2">
                <ul>
                  <li v-for="(item, index) in pmTypesData" :key="index">
                    <label><input type="radio"  :value="item" v-model="pmTypeName"/></label>
                    <span class="type_name">{{item.typeName}}</span>
                  </li>
                </ul>
              </div>
              <div class="finishBox" v-if="steps == 3">
                  <img src="../../../static/img/icon/duigou.png" alt="">
                  <p class="mt-20 mb-20">{{checkNumber}}个客户已经分到"{{pmTypeName.typeName}}"组</p>
                  <el-button size="mini" @click="continueGroup()">继续分组</el-button>
                  <el-button type="success" size="mini" @click="closeBox()">完成</el-button>
              </div>
            </div>
            <div class="footer1 cf"  v-if="steps != 3">
              <span class="quanxuan" v-if="steps == 1">
                <input type="checkbox" v-model="checked" @click="checkedAll()"/>
                <span>全选</span>
              </span>
              <span v-if="steps == 1">已选：{{checkNumber}}</span>
              <span v-if="steps == 2" class="over_hide">已选：{{pmTypeName.typeName}}</span>
              <span v-if="steps == 1"  style="float:right;">
                <el-button @click="nextSteps($event)" type="success" size="mini">下一步</el-button>
              </span>
              <span  v-if="steps == 2" style="float:right;">
                <el-button @click="prevpSteps($event)" type="success" size="mini">上一步</el-button>
                <el-button @click="sureBtn($event)"  type="success" size="mini">完成</el-button>
              </span>
            </div>
          </div>
        </template>

    </MaskLayer>
  </div>
</template>

<script>
import MaskLayer from "../core/MaskLayer"
export default {
  components:{
    MaskLayer,
  },
  data(){
    return{
      userInfo: this.$cfg.userInfo,
      isShowBox: true,
      checkboxList:[], //选中数组value
      checked: false, //重置全选按钮
      checkNumber: 0,
      defaultClass: 'step_head',
      steps: 1,
      pmTypeName: {},
      memberData:[],
      pmTypesData: [],

    }
  },
  mounted(){
    this.getCustomer()
  },
  watch:{
    checkboxList:{
      handler:function(val,oldVal){
        //console.log(val.length)
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
     let nowSelectInfo = this.$cfg.nowSelectInfo;
     let flag = this.$cfg.userInfo.adminUserId

     this.$http({
         type: 'get',
         url: '/api/im/contacts/findFriends.do',
         params: {
          adminUserId: flag,
           merchantNo: this.userInfo.memberNoMerchant, //mast,商户编号
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

   //获取标签列表
   selectPmTypes () {
     this.$http.post('/api/imh5/member/selectPmTypes.do',{
       merchantNo: this.userInfo.memberNoMerchant
     }).then(res=>{
       if(res.data.result){
         this.pmTypesData = res.data.returnObject
       }
     })
   },

   sureBtn(){
      // console.log(this.pmTypeName.code)
      // console.log(this.checkboxList)
     if(this.pmTypeName){
       this.$http.post('/api/imh5/member/addPmType.do',{
         pmCodes: this.checkboxList.join(','),
         pmTypeCode: this.pmTypeName.code,
         merchantNo: this.userInfo.memberNoMerchant,
       }).then(res=>{
         if(res.data.result){
           this.$message.success('操作成功')
           this.steps = 3
         }else{
           this.$message.error(res.data.errorMessage)
         }
       })
     }else{
       this.$message({
         type: 'error',
         message: '请先选择分组'
       });
     }
   },



    //全选
    checkedAll(){
      if(this.checked){
        this.checkboxList =[]
      }else{
        this.checkboxList = []
        this.memberData.forEach( (item) => {
          this.checkboxList.push(item.memberNo)
        })
      }
      this.checkNumber = this.checkboxList.length
      //console.log(this.checkboxList.length)
    },

    nextSteps(event){
      if(this.checkNumber){
        this.steps = 2
        this.selectPmTypes()
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
      this.pmTypeName = {}
    },
    prevpSteps(){
      this.steps = 1
    },
    closeBox(){
      this.$emit('close');
    },
  }

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
    .icon{
      transform: rotate(180deg);
      font-size: 30px;
      vertical-align: middle;
      margin-left: 20px;
    }
    .step_head{
      margin-left:20px;
      padding: 8px 15px;
      border:1px solid #333;
      color:#333;
    }
  }
  .stepList_box{
    width: 100%;
    height: 340px;
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
      overflow: hidden;
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
  margin-top: 50px;
}
.over_hide{
  width: 380px;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.type_name{
  display: inline-block;
  width:500px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
