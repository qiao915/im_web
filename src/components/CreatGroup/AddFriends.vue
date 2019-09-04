<template >
  <div class="">
    <MaskLayer :isShowBox="isShowBox">
        <template slot="MaskBox">
          <div class="groupBox">
            <span class="delete" @click="closeBox()"></span>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane name="first">
                <span slot="label">加好友</span>
                <div class="search_box">
                  <div class="search_btn">
                    <el-form ref="form" :model="form" :rules="rules">
                      <el-form-item prop="userName">
                        <el-input v-model="form.userName" placeholder="请输入客户的 手机号/微信号/QQ号" style="width:80%;"></el-input>
                        <el-button type="success" style="margin-left:20px;" @click="saveSubmit('form')">搜索</el-button>
                      </el-form-item>
                      <p style="font-size:12px;color:#8e8e8e;">搜索结果因网络不稳定会导致首次搜索结果为空，可再次点击搜索。</p>
                    </el-form>
                  </div>
                  <div class="search_list">
                    <ul  v-if="showData">
                      <li >
                        <span>
                          <img :src="searchResult.headAddress" alt="">
                        </span>
                        <div class="search_list_info">
                          <span class="search_userName">{{searchResult.nickNameWx}}</span>
                          <span v-if="addBtn" ><textarea v-model="validation" name="name" :placeholder="varidationText"></textarea></span>

                        </div>
                        <span v-if="addBtn"><el-button type="success" size="mini" @click="addWxFriends()">加好友</el-button></span>
                        <span v-if="!addBtn" style="color: #737373">已添加</span>
                      </li>

                      <span v-if="addBtn">
                        <p class="validationInput"><label>备注名：</label><el-input v-model="nickRemark" style="width:335px"></el-input></p>
                        <p class="validationInput"><label>手机号：</label><el-input v-model="mobile" style="width:335px"></el-input></p>
                      </span>
                    </ul>
                    <p v-if="showSerchResult" style="text-align:center;margin-top:20px;">{{searchTips}}</p>
                  </div>
                </div>
              </el-tab-pane>

              <el-tab-pane name="second">
                <span slot="label">历史记录</span>
                <div class="historyData">
                  <ul v-if="!recordTips">
                    <li v-for="item in historyData">
                      <div class="">
                        <img :src="item.headAddress" alt="">
                        <span class="user_time">
                          <span>{{item.nickName}}</span>
                          <span class="time">{{item.acceptTime}}</span>
                        </span>
                      </div>
                      <div class="">
                        <span v-if="item.addStatus == 'Y' " style="color: #737373">已添加</span>
                        <span v-if="item.addStatus == 'N' ">
                            <span><el-button type="info" disabled size="mini" @click="addFriend(item)">未添加</el-button></span>
                        </span>
                      </div>
                    </li>
                  </ul>
                  <p v-if="recordTips" class="tips">暂无数据</p>
                </div>
              </el-tab-pane>
            </el-tabs>


          </div>
        </template>

    </MaskLayer>
  </div>
</template>

<script>
import MaskLayer from "../core/MaskLayer"
import storage from '@/tools/local_storage'

export default {
  components:{
    MaskLayer,
  },
  data(){
    return {
        isShowBox: true,
        activeName: 'first',
        form:{
          userName: '',
        },
        rules:{
          userName:[
            {required: true, message: '请输入搜索条件', trigger: 'blur'}
          ]
        },
        searchResult:[],
        historyData:[],
        validation:'',//备注名
        varidationText: '你好，我是',  //验证消息
        userInfo: this.$cfg.userInfo,
        nowSelectInfo: this.$cfg.nowSelectInfo,
        showData:false,
        showSerchResult: true,
        addBtn: false,   //加好友按钮
        recordTips: false,//暂无数据显示
        searchTips:'',
        num:0,
        countTime:6,
        nickRemark: '',
        mobile: '',
    }
  },
  mounted (){
    let urlParams = storage.get('urlParams')
    if (urlParams && urlParams.phone) {
      this.form.userName = urlParams.phone
      // urlParams.phone = ''
      // storage.put('urlParams', urlParams)
    }
  },
  methods:{

    saveSubmit(formName) {
      // console.log(this.$cfg.nowSelectInfo)
      if(this.$cfg.nowSelectInfo.onlineFlag === 0){
        this.$message.error('中控已离线!')
        return
      }
      this.showData = false
      this.searchResult = []
      this.searchTips = ''
      let self = this

      self.$refs[formName].validate((valid) => {
        if (valid) {
          //搜索好友
          self.$http.post('/api/imh5/addFriend/doSearchFriend.do',{
            merchantNo: self.userInfo.memberNoMerchant, //商户编号
            merchantWxNo: self.nowSelectInfo.noWx, //商户微信号
            qrCode: self.form.userName,    //查询条件
            count: 1,   //调用次数
          }).then( (res)=>{
            if(res.data.result && res.data.errorMessage && res.data.returnObject){
              //已加好友
              self.showData = true
              self.showSerchResult = true
              self.addBtn = false
              self.searchTips = res.data.errorMessage
              self.searchResult = res.data.returnObject
              window.clearInterval(self.loopSearchFriends)

            } else if (res.data.result && res.data.returnObject && res.data.errorMessage == '') {
              //未加好友
              self.searchTips = ""
              self.showData = true
              self.showSerchResult = false
              self.addBtn = true
              self.searchResult = res.data.returnObject
              window.clearInterval(self.loopSearchFriends)

            } else {
              //每隔 3 秒请求一次  共6次
              self.loopSearchFriends = window.setInterval(function(){
                // console.log(self.countTime)
                if(self.countTime == 0){
                    // console.log("取消定时器")
                    window.clearInterval(self.loopSearchFriends)
                    self.showSerchResult = true
                    self.searchTips = "搜索结果不存在"
                }else{
                  self.countTime --
                  self.saveSubmit('form')
                }

              },3000)

            }
              // self.$message.error(res.data.errorMessage)

          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //添加好友请求
    addWxFriends(){
      let params = {
        merchantNo: this.userInfo.memberNoMerchant, //商户编号
        validation: this.validation,    //验证信息
        nickRemark: this.nickRemark,    //备注
        mobile: this.mobile,           //手机号
        scanId: this.searchResult.scanId,
        wxQrCode: this.searchResult.wxQrCode,
        alias: this.searchResult.alias,
        nickNameWx: this.searchResult.nickNameWx,
        headAddress: this.searchResult.headAddress,
        noWx: this.searchResult.noWx,
      }
      console.log(params)

      this.$http.post('/api/imh5/addFriend/doApplayFriend.do',params).then( res =>{
        if(res.data.result && res.data.returnObject.success){
          this.$message({
            type:'success',
            message:'发送好友请求成功',
            duration:2000
          })
        }else{
          this.$message.error(res.data.returnObject.msg)
        }

      })

    },

    //
    addFriend(item){
      console.log(item)
      return
      let params = {
        merchantNo: this.userInfo.memberNoMerchant, //商户编号
        validation: '',
        wxQrCode: item.wxQrCode,
        alias: item.alias,
        nickNameWx: item.nickRemark,
        headAddress: item.headAddress,
        noWx: item.noWx,
      }
      if(item.scanId){
        params.scanId = item.scanId
      }

      this.$http.post('/api/imh5/addFriend/doApplayFriend.do',params).then( res =>{
        if(res.data.result && res.data.returnObject.success){
          this.$message({
            type:'success',
            message:'发送好友请求成功',
            duration:2000
          })
        }else{
          this.$message.error(res.data.returnObject.msg)
        }

      })
    },

    // 加好友  和添加记录切换
    handleClick(tab){
      // console.log(this.historyData)
      if(tab.name == 'second'){
        if (this.historyData && this.historyData.length) {
            return false
        }
        this.addFriendsRecord()
      }
    },

    //添加好友记录
    addFriendsRecord () {
      this.$http.post('/api/imh5/addFriend/applayFriendList.do',{
        merchantNo: this.userInfo.memberNoMerchant, //商户编号
        pageNo: 1,
        pageSize: 9999,
      }).then( res =>{
        // console.log(res)
        if (res.data.result){

          if(res.data.returnObject.rows){
            this.recordTips = false
            this.historyData = res.data.returnObject.rows
          } else {
            this.recordTips = true
          }

        } else {
          this.$message.error(res.data.errorMessage)
        }

      })
    },

    closeBox(){
      this.$emit('close');
    },
  }
}
</script>

<style lang="less" scoped>
.groupBox{
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
  .search_btn{
    padding: 0 20px;
      }
    .search_list {
      width: 100%;
      height: 260px;
      overflow: auto;
      ul li{
        display: flex;
        justify-content:space-between;
        align-items: center;
        vertical-align: middle;
        margin-top: 15px;
        padding: 0 20px;
        img{
          width:68px;
          height: 68px;
          vertical-align: middle;
        }
        .search_list_info{
          width: 335px;
          display: inline-flex;
          flex-direction: column;
          justify-content: space-between;
          box-sizing: border-box;
          .search_userName{
            //margin-left: 20px;
            margin-bottom: 10px;
          }
          textarea{
            max-width: 335px;
            min-width: 335px;
            max-height: 40px;
            min-height: 40px;
            border-radius: 4px;
          }
        }

      }
    }
    .historyData{
      width: 100%;
      height: 360px;
      overflow: auto;

      box-sizing: border-box;
      ul li{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #ededed;
        padding:8px 20px 8px 10px;
        box-sizing: border-box;
        align-items: center;
        img{
          width: 40px;
          height: 40px;
        }
        .user_time{
          display: inline-grid;
          flex-direction: column;
          justify-content: space-between;
          margin-left: 15px;
          color: #242021;
          .time{
            color: #737373;
            font-size: 12px;
          }
        }
      }
    }
}

.tips{
  text-align: center;
  margin-top: 20px;
}

.validationInput label{
    margin: 0 45px 0 20px;
    display: inline-block;
    width: 77px;
    text-align: right;
}

</style>
