<!-- 通讯录好友信息 -->
<template>
  <div class="">
    <div class="detail_head">详细信息</div>
    <div class="detail_content">
      <!-- <img class="detail_img" :src="headImg" alt=""> -->
      <div class="text_box">
        <img class="userHead" :src="userInfo.headAddress" alt="">
        <p class="text_name">{{userInfo.nickNameWx}}</p>
        <p>备注：{{userInfo.nickNameRemarkWx}}</p>
        <p>微信号: {{userInfo.noWxAlias || userInfo.noWx}}</p>
        <p>地区：{{userInfo.cityWx}}</p>
        <!-- <p>分组：未分组<i class="editInfo" title="分组" @click="addGroup()"></i></p> -->
        <!-- <p>标签：vip客户 至尊vip 死胖子<i class="editInfo" title="标签" @click="addTags()"></i></p> -->
      </div>
      <p class="btnList">
        <span @click="sendMessage(userInfo)">发消息</span>
        <!-- <span>查看朋友圈</span>
        <span @click="transferMember()">转移</span> -->
      </p>
    </div>

    <!-- 分组弹窗 -->
    <MaskLayer :isShowBox="showGroupBox">
        <template slot="MaskBox">
          <div class="propBox">
            <span class="delete" @click="showGroupBox = false"></span>
            <div class="step_box">
              <span v-if="steps == 2">选择分组</span>
              <span v-if="steps == 3">完成</span>
            </div>
            <div class="stepList_box">
              <div v-if="steps == 2">
                <ul>
                  <li>
                    <label><input type="radio"  value="男性客户" name="1" v-model="groupName"/></label>
                    <span>男性客户</span>
                  </li>
                  <li>
                    <label><input type="radio" value="女性客户" name="1" v-model="groupName"/></label>
                    <span>女性客户</span>
                  </li>
                  <li>
                    <label><input type="radio" value="vip客户" name="1" v-model="groupName"/></label>
                    <span>vip客户</span>
                  </li>
                </ul>
              </div>

              <div class="footer1 cf"  v-if="steps == 2">
                <span>已选：{{groupName}}</span>
                <span style="float:right;">
                  <el-button @click="submitAddGroup($event)"  type="success" size="mini">完成</el-button>
                </span>
              </div>

              <div class="finishBox" v-if="steps == 3">
                  <img src="/static/img/icon/duigou.png" alt="">
                  <p class="mt-20 mb-20">该客户已被分到"{{groupName}}"组</p>
                  <el-button size="mini" @click="continueGroup()">重新分组</el-button>
                  <el-button type="success" size="mini" @click="showGroupBox = false">完成</el-button>
              </div>
            </div>
          </div>
        </template>
    </MaskLayer>
    <!--  标签弹窗  -->
    <MaskLayer :isShowBox="showTagsBox">
        <template slot="MaskBox">
          <div class="propBox">
            <span class="delete" @click="showTagsBox = false"></span>
            <div class="step_box">
              <span v-if="tagsSteps == 2">添加标签</span>
              <span v-if="tagsSteps == 3">完成</span>
            </div>
            <div class="">
              <div class="tagBox" v-if="tagsSteps == 2">
                <ul>
                  <li v-for="(item, index) in items" :class="{tagActived :item.actived}" @click="changeTag(item)" :key="index">
                    <span>{{item.tagName}}</span>
                  </li>
                </ul>
              </div>

              <div class="footer1 cf"  v-if="tagsSteps == 2">
                 <span>已选：{{tagNumber}}个标签</span>
                 <span style="float:right;">
                   <el-button @click="submitTags()"  type="success" size="mini">完成</el-button>
                 </span>
              </div>

              <div class="finishBox" v-if="tagsSteps == 3">
                  <img src="/static/img/icon/duigou.png" alt="">
                  <p class="mt-20 mb-20">添加标签成功</p>
                  <el-button size="mini" @click="continueTag()">继续添加</el-button>
                  <el-button type="success" size="mini" @click="showTagsBox = false">查看</el-button>
              </div>
            </div>
          </div>
        </template>
    </MaskLayer>
    <!--转移弹窗-->
    <MaskLayer :isShowBox="showTransferBox">
        <template slot="MaskBox">
          <div class="propBox">
            <span class="delete" @click="showTransferBox = false"></span>
            <div class="step_box">
              <span v-if="transferSteps == 2">员工</span>
              <span v-if="transferSteps == 3">完成</span>
            </div>
            <div class="stepList_box">
              <div v-if="transferSteps == 2">
                <ul>
                  <li>
                    <label><input type="radio"  value="员工1" name="1" v-model="transferName"/></label>
                    <span>员工1</span>
                  </li>
                  <li>
                    <label><input type="radio" value="员工2" name="1" v-model="transferName"/></label>
                    <span>员工2</span>
                  </li>
                  <li>
                    <label><input type="radio" value="员工3" name="1" v-model="transferName"/></label>
                    <span>员工3</span>
                  </li>
                </ul>
              </div>

              <div class="footer1 cf"  v-if="transferSteps == 2">
                <span>已选：{{transferName}}</span>
                <span style="float:right;">
                  <el-button @click="submitTransfer($event)"  type="success" size="mini">完成</el-button>
                </span>
              </div>

              <div class="finishBox" v-if="transferSteps == 3">
                  <img src="/static/img/icon/duigou.png" alt="">
                  <p class="mt-20 mb-20">该客户已被转移给"{{transferName}}"</p>
                  <el-button size="mini" @click="continueTransfer()">重新转移</el-button>
                  <el-button type="success" size="mini" @click="showTransferBox = false">完成</el-button>
              </div>
            </div>

          </div>
        </template>
    </MaskLayer>

  </div>
</template>

<script>
// import Bus from '../Data/bus.js'
import MaskLayer from "../core/MaskLayer";
import { mapActions } from "vuex"
import { CHAT_USER_TYPE } from '@/utils/constants'

export default {
  components:{
    MaskLayer,
  },
  data(){
    return{
      userInfo: {},

      item:{},
      headImg: '',
      userName: '',
      steps: 2,
      tagsSteps: 2,
      transferSteps:2,
      showGroupBox: false,
      groupName: '',
      showTagsBox: false,
      tagNumber: 0,
      showTransferBox:false,
      transferName:'',
      items: [
        {tagName: '你好', actived:false},
        {tagName: 'VIP客户', actived:false },
        {tagName: '五星大神', actived:false },
        {tagName: '神壕抱大腿', actived:false},
      ],
      chooseTagsArr:[],

    }
  },
  watch: {
    $route () {
      if (this.$route.name === 'userInfo') {
        this.getUserInfo()
      }
    }
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    ...mapActions(['prepareChating']),

    getUserInfo () {
      let params = this.$route.params

      // 获取客户详细信息
      this.$http({
        type: 'get',
        url: '/api/imh5/index/findPersonMember.do',
        params: {
          code: params.code,
          memberNo: params.memberNo,
          memberNoGm: params.memberNoGm,
        //  pmTypeCode:''
        }
      }).then((res) => {

        if (res.status === 200 && res.data.result) {
          this.userInfo = res.data.returnObject
        } else {
          this.$message.error(res.data.errorMessage)
        }
      })
    },

    sendMessage (item) {
      let params = this.$route.params
    //  console.log(item.code)

      this.prepareChating({
        code: item.code,//memberNo
        chatUserType: CHAT_USER_TYPE.user
      })
      this.$router.push({
        path: `/im-web/app/${params.wxId}/user/chat/${item.code}/${params.memberNoGm}/${item.memberNo}`
      })
    },

    addGroup () {
      this.showGroupBox = true
      this.steps = 2
    },
    submitAddGroup(){
       console.log(this.groupName)
      if(this.groupName){
        this.steps = 3
      }else{
        this.$message({
          type: 'error',
          message: '请先选择分组'
        });
      }
    },
    // 继续分组
    continueGroup(){
      this.steps = 2
      this.groupName = ''
    },
    addTags(){
      this.showTagsBox = true
      this.tagsSteps = 2
    },
    //点击标签 改变状态
    changeTag(item){
      if(typeof item.actived == 'undefined'){
        this.$set(item,"actived",true)
      }else {
        item.actived = !item.actived
      }
      //保存选中的标签
      let arr1 = []
      this.items.forEach(item=>{
        if(item.actived == true){
            arr1.push(item.tagName)
        }

      })
      this.tagNumber = arr1.length
      console.log(arr1)
      this.chooseTagsArr = arr1
    },
    submitTags(){
      if(this.tagNumber){
        this.tagsSteps = 3
      }else{
        this.$message({
          type: 'error',
          message: '请先选择标签'
        });
      }
      console.log(this.chooseTagsArr)
      //请求
    },
    //继续添加标签
    continueTag(){
      this.tagsSteps = 2
      //重置标签状态 可重新获取标签列表
    },
    //转移
    transferMember(){
      this.showTransferBox = true
      this.transferSteps = 2
    },
    //提交转移请求
    submitTransfer(){
      console.log(this.transferName)
     if(this.transferName){
       this.transferSteps = 3
     }else{
       this.$message({
         type: 'error',
         message: '请先选择员工'
       });
     }
    },
    //重新转移
    continueTransfer(){
      this.transferSteps = 2
      this.transferName = ''
    },
  }
}
</script>

<style lang="less" scoped>
.detail_head{
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border-bottom: 1px solid #e2e2e2;
}
.detail_content{
  padding-top: 80px;
  text-align: center;

  .detail_img{
    width: 100px;
    height: 100px;
    border-radius: 5px;
  }

  .text_box{
    // text-align: left;
    // margin-left: 42%;
    margin-top: 20px;

    .userHead{
      width: 100px;
      height: 100px;
      border-radius: 10px;
    }

    .text_name{
      font-size: 20px;
      font-weight:550;
      text-align: center;
      padding-left: 0;
    }
    p {
      line-height: 2;
      text-align: left;
      padding-left: 40%;

      .editInfo{
        width: 20px;
        height: 20px;
        background: url('/static/img/bianji.png')no-repeat;
        background-size: 100% 100%;
        background-position: center;
        display: inline-block;
        cursor: pointer;
        margin-left: 10px;
        vertical-align: sub;
      }
    }
  }
  .btnList {
    margin-top: 40px;

    span{
      padding: 8px 15px;
      border-radius: 3px;
      background-color: #08A406;
      color: #fff;
      // margin-right: 20px;
      &:hover{background-color: #55b710;cursor: pointer;}
    }
  }
}
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
    background: url('/static/img/delete.png') no-repeat;
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
    padding-left: 20px;
    box-sizing: border-box;
  }
  .stepList_box{
    width: 100%;
    height: 340px;
    padding: 0 20px;
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
.finishBox{
  text-align: center;
  margin-top: 50px;
}
.tagBox{
  width: 100%;
  height: 300px;
  padding: 20px 20px;
  box-sizing: border-box;
  ul li{
    display: inline-block;
    padding: 9px 25px;
    border-radius: 5px;
    text-align: center;
    box-sizing: border-box;
    margin-right: 25px;
    cursor: pointer;
    border:1px solid #a7a7a7;
    background-color: #fff;
    color: #a7a7a7;
    &:hover{
      background-color: #efefef;
    }
  }
  .tagActived{
    background-color: #08A406;
    color: #fff;
    border-color: #08A406;
    &:hover{
      background-color: #85ce61;
        border-color: #85ce61;
    }
  }


}
</style>
