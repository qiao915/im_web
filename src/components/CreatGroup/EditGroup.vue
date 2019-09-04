<!--批量分组  -->
<template >
  <div class="">
    <MaskLayer :isShowBox="isShowBox">
        <template slot="MaskBox">
          <div class="propBox">
            <span class="delete" @click="closeBox()"></span>
            <div class="step_box">
              <p>编辑分组</p>
            </div>
            <div class="stepList_box">
              <div>
                <ul>
                  <li v-for="(item, index) in pmTypesData" :key="index">
                    <label><input type="radio"  :value="item" v-model="pmTypeName" :checked="item.checked"/></label>
                    <span class="type_name">{{item.typeName}}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="footer1 cf">
              <span class="over_hide">已选：{{pmTypeName.typeName}}</span>
              <span style="float:right;">
                <el-button @click="closeBox()"  type="success" size="mini">取消</el-button>
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
import Bus from '../Data/bus.js'

export default {
  name: 'EditGroup',
  components:{
    MaskLayer,
  },
  props: {
    propsData: {}
  },
  data(){
    return{
      userInfo: this.$cfg.userInfo,
      isShowBox: true,
      pmTypeName: {},
      memberData:[],
      pmTypesData: [],
      have_group: ''
    }
  },
  mounted(){
    this.have_group = this.propsData.pmTypeName
    this.selectPmTypes()
  },
  watch:{

  },
  methods:{
   //获取标签列表
   selectPmTypes () {
     this.$http.post('/api/imh5/member/selectPmTypes.do',{
       merchantNo: this.userInfo.memberNoMerchant
     }).then(res=>{
       if(res.data.result){
         let data = res.data.returnObject

           data.forEach( item => {
             if(this.have_group == item.typeName){
                item.checked = true

             } else {
               item.checked = false
             }
           })
         this.pmTypesData = data
          console.log(data)
       }
     })
   },

   sureBtn(){
     let params = {
       pmCodes: this.propsData.memberNo,
       pmTypeCode: this.pmTypeName.code,
       merchantNo: this.userInfo.memberNoMerchant,
     }
     // console.log(params)

     if(this.pmTypeName){
       this.$http.post('/api/imh5/member/addPmType.do',params).then(res=>{
         if(res.data.result){
           this.$message.success('操作成功')
           this.$emit('close')
           Bus.$emit('refreshUserInfo')
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
  .step_box {
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #e2e2e2;
    p{
      padding-left: 20px;
      font-size: 16px;
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
