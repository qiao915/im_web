<template>
  <section class="get-customer-con">
    <header class="this-header" style="border-right: 1px solid #d1d1d1">
      <ul class="header-ul">
        <li :class="{active: activeIndex == 0}" @click="selectModel(0)">待认领</li>
        <li :class="{active: activeIndex == 1}" @click="selectModel(1)">已认领</li>
        <li :class="{active: activeIndex == 2}" @click="selectModel(2)">我的认领</li>
      </ul>
      <span class="classClime" v-if="!showCheckBox && renderData.length">
          <div class="do-but fix_bottom" v-if="activeIndex == 0" @click="batchGetCustomer()">批量认领</div>
          <div class="do-but fix_bottom" v-if="activeIndex == 1 && isAdmin" @click="batchGetCustomer()">批量取消</div>
          <div class="do-but fix_bottom" v-if="activeIndex == 2" @click="batchGetCustomer()">批量取消</div>
      </span>
    </header>

    <section class="customer-con" style="border-right: 1px solid #d1d1d1">
      <ul class="customer-ul">
        <li v-for="(item) in renderData" :key="item.id">
          <label v-if="showCheckBox"><input type="checkbox" :value="item" v-model="checkboxList"/></label>
          <img class="head" :src="createMessageAvatar(item)" alt>
          <section class="customer-info">
            <p class="name">{{item.nickNameWx}}</p>
            <p class="validation">{{item.validation}}</p>
          </section>
          <section class="do-com">
            <div class="do-but" v-if="activeIndex == 0" @click="addFlag(item)">立即认领</div>

            <span v-if="activeIndex == 1">
              <div class="do-but" v-if="isAdmin" @click="removeFlag(item)">取消认领</div>
              <p v-if="item.memberNoGm == memberNoGuid">我已认领</p>
              <p v-if="item.memberNoGm != memberNoGuid">{{item.memberNameGm}}已认领</p>
            </span>

            <span v-if="activeIndex == 2 ">
              <div class="do-but" v-if="item.memberNoGm == memberNoGuid" @click="removeFlag(item)">取消认领</div>
            </span>

          </section>
        </li>
        <div class="noresult" v-if="renderData.length == 0">
          暂无数据
        </div>
      </ul>



      <div class="fix_btn" v-if="renderData.length">
        <span v-if="showCheckBox">
          <input type="checkbox" v-model="checked" @click="checkedAll()"/>
          <span>全选</span>
          <span>已选：{{checkNumber}}</span>
          <span class="fix_bottom" style="float:right;">
            <el-button @click="showCheckBox = false" type="success" size="mini">取消</el-button>
            <el-button @click="batClimeCustomer()" type="success" size="mini" v-if="activeIndex == 0 ">认领</el-button>
            <el-button @click="batCancleCustomer()" type="success" size="mini" v-if="activeIndex != 0 ">取消认领</el-button>
          </span>

        </span>
      </div>
    </section>



  </section>
</template>

<script>
import Bus from '../Data/bus.js'
import { createUploadUrl, getAssetPath } from '@/tools/resourceTool'

export default {
  data () {
    return {
      renderData: [],
      activeIndex: 0,
      memberNoGuid:this.$cfg.userInfo.memberNoGuid,
      isAdmin: false,
      checkboxList: [],
      showCheckBox: false,
      checked: false, //重置全选按钮
      checkNumber: 0,
    }
  },

  watch:{
    checkboxList:{
      handler:function(val,oldVal){
        this.checkNumber = val.length
        if(this.checkboxList.length === this.renderData.length){
          this.checked = true
        }else{
          this.checked = false
        }
        deep: true
      }
    }
  },

  mounted () {
    if(this.$cfg.userInfo.adminUserId){
      this.isAdmin = true
    }
  },
  methods: {
    getData () {
      let startIndex = 0
      let params = this.$route.params

      let paramsData = {
            currentMemberNoGm: params.memberNoGm,
            start: '0',
            sortBy: startIndex,
            limit: 9999999
          }

      if(this.activeIndex == 0){
        paramsData.flag = false
      } else if(this.activeIndex == 1){
        paramsData.flag = true
      } else {
        paramsData.memberNoGmFlag = true
      }

      this.$http({
        type: 'get',
        url: '/api/im/contacts/findMemberClaimPage.do',
        params: paramsData
      }).then(res => {
        if (parseInt(res.status) === 200 && res.data.result) {
          this.renderData = res.data.returnObject.rows
          this.$store.commit(
            'CLAIMED_CUSTOMER_HAS_CHANGE',
            res.data.returnObject.rows
          )
        }
      })
    },

    selectModel (val) {
      this.showCheckBox = false
      this.activeIndex = val
      this.getData()
    },

    addFlag (obj) {
      let params = this.$route.params

      this.$http({
        method: 'get',
        url: '/api/im/contacts/claimMembers.do',
        params: {
          currentMemberNoGm: params.memberNoGm,
          mbrCodes: obj.mbrCode
        }
      })
        .then(res => {
          if (parseInt(res.status) === 200 && res.data.result) {
            this.$message({
              type:'success',
              message:'认领客户' + obj.nickNameWx + '成功'
            })
            this.getData()
            Bus.$emit("refreshClaimedCustomer")
        }else{
          this.$message.error(res.data.errorMessage)
        }
        })
    },

    removeFlag (obj) {
      let params = this.$route.params
      //取消我的认领
      if (obj.memberNoGm == this.memberNoGuid) {

        this.$http({
          method: 'post',
          url: '/api/im/contacts/cancleBingFriends.do',
          params: {
              gmNo: params.memberNoGm,
              wxStr: obj.noWx
          }
        })
          .then(res => {
            if (parseInt(res.status) === 200 && res.data.result) {
              this.$message({
                type:'success',
                message:'已取消认领'
              })
              this.getData()
              Bus.$emit("refreshClaimedCustomer")
            }
          })
      } else {
        //取消别人认领
        this.$http({
          method: 'post',
          url: '/api/im/contacts/cancleBingFriendsAdmin.do',
          params: {
              gmNo: obj.memberNoGm,
              wxStr: obj.noWx
          }
        })
          .then( (res) => {
            if (res.data.result) {
              this.$message({
                type:'success',
                message:'已取消认领'
              })
              this.getData()
              Bus.$emit("refreshClaimedCustomer")
            }
          })
      }

    },

    batchGetCustomer () {
      this.showCheckBox = true
    },

    //批量认领客户
    batClimeCustomer () {
      let params = this.$route.params
      let mbrCodes = []

      this.checkboxList.forEach( (item)=>{
        mbrCodes.push(item.mbrCode)
      })

      this.$http({
        method: 'post',
        url: '/api/im/contacts/claimMembers.do',
        params: {
            currentMemberNoGm: params.memberNoGm,
            mbrCodes: mbrCodes.join(',')
        }
      })
        .then( (res) => {
          if (res.data.result) {
            this.$message({
              type:'success',
              message:'批量认领成功'
            })
            this.checked = false
            this.showCheckBox = false
            Bus.$emit("refreshClaimedCustomer")
            this.getData()
          }
        })

    },


    //批量取消认领客户
    batCancleCustomer () {
      let wxStr = []
      let gmNo = []

      this.checkboxList.forEach( (item)=>{
        wxStr.push(item.noWx)
        gmNo.push(item.memberNoGm)
      })

      this.$http({
        method: 'post',
        url: '/api/im/contacts/cancleBingFriendsAdmin.do',
        params: {
            gmNo: gmNo.join(','),
            wxStr: wxStr.join(',')
        }
      })
        .then( (res) => {
          if (res.data.result) {
            this.$message({
              type:'success',
              message:'批量取消认领成功'
            })
            this.checked = false
            this.showCheckBox = false
            Bus.$emit("refreshClaimedCustomer")
            this.getData()
          }
        })
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

    //全选
    checkedAll(){
      if(this.checked){
        this.checkboxList =[]
      }else{
        this.checkboxList = []
        this.checkboxList = this.renderData
      }
      this.checkNumber = this.checkboxList.length
    },


  },

  created () {
    this.getData()
  },
  destroyed(){
    Bus.$off('refreshClaimedCustomer')
  },
}
</script>

<style lang="less" scoped>
.get-customer-con {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-right: 268px;
  box-sizing: border-box;
}

.this-header {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  position: relative;
}

.classClime {
  position: absolute;
  top: 16px;
  right: 20px;

    .do-but{
        color: #fff;
        font-size: 14px;
        background-color: #09c106;
        cursor: pointer;
        padding: 6px 12px;
    }

    .fix_bottom{
      margin: 0 auto;
      text-align: center;
      border-radius: 3px;
      overflow: hidden;
    }
}

.header-ul {
  width: 210px;
  height: 40px;
  overflow: hidden;
  margin: 10px auto;
  border-radius: 10px;
  > li {
    float: left;
    width: 70px;
    text-align: center;
    line-height: 40px;
    cursor: pointer;

  }

  .active {
    background-color: #2e3238;
    color: #fff;
  }
}

.customer-con {
  width: 100%;
  flex: 1;
  height: 1px;
  position: relative;
}

.fix_btn{
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 32px;
  line-height: 32px;
  padding: 0 10px;
  // background-color: #d1d1d1;
  box-sizing: border-box;
}

.customer-ul {
  width: 100%;
  overflow-y: auto;
  height: 95%;

  > li {
    width: 100%;
    height: 60px;
    display: flex;
    padding: 0 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin-top: 10px;
  }

  label {
    line-height: 40px;
  }

  .head {
    width: 50px;
    height: 50px;
    display: block;
    border-radius: 10px;
    margin-left: 10px;
  }

  .customer-info {
    flex: 1;
    padding: 0 10px;
    overflow: hidden!important;

    .name {
      padding-top: 4px;
      font-size: 16px;
    }

    .validation {
      font-size: 14px;
      margin-top: 5px;
      color: #888888;
    }
  }

  .do-com {
    // width: 100px;
    height: 100%;
    text-align: right;
  }

  .do-but {
    width: 85px;
    height: 30px;
    display: inline-block;
    text-align: center;
    line-height: 30px;
    color: #fff;
    font-size: 14px;
    margin-top: 5px;
    background-color: #09c106;
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
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
