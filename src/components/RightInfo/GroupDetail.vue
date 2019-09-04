<template>
  <div class="groun-detail-con">
    <div class="groupBox">
      <!-- <div class="group_searchBox">
        <div class="search_border">
          <input type="text" class="searchTh" v-model="searchNickName" placeholder="搜索群成员">
          <img src="../../../static/img/search_2.png" alt>
        </div>
      </div> -->
      <div class="group_memberbox">
        <ul ref="liBox" class="cf" :class="[listLength == true ? 'minHeight' : 'autoHeight']">
          <li @click="addGroupMember()">
            <img src="../../../static/img/icon/tianjia.png" alt>
            <p>添加</p>
          </li>
          <li @click="deleteGroupMember()">
            <img src="../../../static/img/icon/jianqu.png" alt>
            <p>减去</p>
          </li>
          <li
            v-for="(item, index) in memberList"
            :key="index"
            @click="showHover(item,index,$event)"
            :title="item.memberName"
          >
            <img :src="item.headUrl" alt>
            <p>{{item.memberName}}</p>
          </li>
        </ul>
        <p class="watchMore" @click="packUp()">{{showMore}}</p>
      </div>
      <div class="groupName_box">
        <p>群名</p>
        <p>
          <span v-if="showEdit" id="groupName" :title="groupName">{{groupName}}</span>
          <input
            class="changeName"
            type="text"
            ref="changeInput"
            v-else
            v-model="changeName"
            @blur="blurInput()"
            @keyup.enter="blurInput()"
            maxlength="16"
          >
          <span class="editInfo cf" title="修改" v-if="showEdit" @click="editGroupName()"></span>
        </p>
      </div>
      <div class="groupName_box" style="border:none">
        <div style="margin-bottom:15px;">
          <span class="switchTitle">置顶</span>
          <el-switch
            v-model="switchValue1"
            active-value="1"
            inactive-value="0"
            active-color="#20ab1f"
            inactive-color="#c9c9c9"
            @change="stickTop()"
            > </el-switch>
        </div>
        <div style="margin-bottom:15px;" >
          <span class="switchTitle">免打扰</span>
          <!--值为 number 类型 需要在前面加上冒号(:)  -->
          <el-switch
            v-model="switchValue2"
            :active-value="1"
            :inactive-value="0"
            active-color="#20ab1f"
            inactive-color="#c9c9c9"
            @change="setNoDisturbing()"
            > </el-switch>
        </div>
        <p><span>群二维码</span><span class="rightCheck cf" @click="check_groupScanCode()">查看</span></p>
      </div>
      <div class="deleteBox">
        <el-button size="small " type="success" @click="deleteAndExitGroup()">删除并退出</el-button>
      </div>
    </div>


    <div class="hover_box" ref="hoverBox" v-show="showMemberMore" @click="keepStatus()">
      <div class="hover_box_head">
        <span>
          <p>{{showMemberName}}</p>
          <p class="co-gray">微信号：大肥羊</p>
        </span>
        <span>
          <img :src="showMemberImg" alt>
        </span>
      </div>
      <div class="hover_box_con">
        <!--好友  -->
        <span>
          <p>
            <span class="co-gray">备注：</span>
            <span class="cor-po" v-if="showRemarkName" @click.stop="addRemark()">{{textAddRemark}}</span>
            <input
              class="changeName"
              type="text"
              v-model="addMamarkInput"
              v-else
              ref="addInput"
              @keyup.enter="blurInput_addRemark()"
            >
          </p>
          <p>
            <span class="co-gray">地区：</span>广东&nbsp;深圳
          </p>
          <div class="hover_box_icon">
            <img class="cor-po" src="../../../static/img/icon/faxiaoxi.png" alt>
          </div>
        </span>
        <!--非好友  -->
        <!-- <span>
            <p><span class="co-gray">群昵称：</span><span>安红 呃想你</span></p>
            <div class="hover_box_icon">
              <img class="cor-po" src="../../../static/img/icon/jiahaoyou.png" alt="">
            </div>
        </span>-->
      </div>
    </div>
    <!-- 群成员弹窗 -->
    <MaskLayer v-if="isShowBox" :isShowBox="isShowBox">
      <template slot="MaskBox">
        <div class="codeBox">
          <span class="delete" @click="closeBox()"></span>
          <div class="head_box">
            <span>选择客户</span>
            <input type="text" v-model="searchMemberNick" placeholder="输入微信昵称"/>
          </div>
          <div class="memberBox">
            <ul>
              <li v-for="item in memberDataList" :key="item.noWx" v-if="item.userName !== serviceInfo.noWx">
                <input type="checkbox" :value="item" v-model="checkboxList">
                <img class="headImg" :src="item.headAddress || item.headUrl" alt>
                <span class="flex_box">
                  <p>
                    {{item.memberName}}
                    <span v-if="item.sex == 'FEMALE'">
                      <img src="../../../static/img/icon/woman.png" alt>
                    </span>
                    <span v-if="item.sex == 'MALE'">
                      <img src="../../../static/img/icon/man.png" alt>
                    </span>
                  </p>
                </span>
              </li>
            </ul>
          </div>
          <div class="footer1">
            <span class="quanxuan">
              <input type="checkbox" v-model="checked" @click="checkedAll()">
              <span>全选</span>
            </span>
            <span>已选：{{checkNumber}}</span>
            <span style="float:right;" v-if="showAddSubmit">
              <el-button @click="addGroupMember_request()" type="success" size="mini">确定</el-button>
            </span>
            <span style="float:right;" v-if="showDelSubmit">
              <el-button @click="deleteGroupMember_request()" type="success" size="mini">确定</el-button>
            </span>
          </div>
        </div>
      </template>
    </MaskLayer>
  </div>
</template>

<script>
import MaskLayer from '../core/MaskLayer'
import { mapGetters } from 'vuex'
import Bus from '../Data/bus.js'
import qs from 'qs'

export default {
  name: 'GroupDetail',
  components: {
    MaskLayer
  },
  computed:{
    ...mapGetters(['loading']),
  },

  data () {
    return {
      searchNickName: '',
      listLength: false, // true超出隐藏  false自适应高度
      showMore: '', // 查看更多群成员文字
      showEdit: true, // 群名显示状态
      groupName: '聊天吹水群',
      // changeNameL: '',
      textAddRemark: '点击添加备注',
      addMamarkInput: '', // 备注框的值
      showMemberMore: false, // 群成员信息弹出框
      showMemberName: '', //
      showMemberImg: '',
      showRemarkName: 'true', // 备注的状态
      memberList: [],
      switchValue1: false,
      switchValue2: false,
      isShowBox: false, // 客户弹窗
      checkboxList: [], // 选中数组value
      checked: false, // 重置全选按钮
      checkNumber: 0,
      memberData: [],
      showAddSubmit: false,
      showDelSubmit: false,
      searchMemberNick:'',
      countTime: 5,
      loopCheckName: null
    }
  },
  computed: {
    ...mapGetters(['currentPersonMember', 'serviceInfo']),
    //模糊搜索转发对象
    memberDataList: function() {
      var self = this;
      var memberDataList = []
      if(!self.searchMemberNick){
        return self.memberData
      }
      return this.memberData.filter(item=> {
         return (
           (item.memberName).toLowerCase().indexOf((self.searchMemberNick).toLowerCase()) !== -1
         );
      })
    },
  },

  watch: {
    $route () {
      this.getGroupMemberList()
      this.checkIsstickTop()
    },
    checkboxList: {
      handler: function (val, oldVal) {
        this.checkNumber = val.length
        if (this.checkboxList.length === this.memberData.length) {
          this.checked = true
        } else {
          this.checked = false
        }
      },
      deep: true
    }
  },
  created(){
    this.checkIsstickTop()
    this.getGroupMemberList()
  },
  mounted () {
    // let te = this.$refs.liBox.offsetHeight
    // // 高度超过5行
    // if (te > 405) {
    //   this.showMore = '查看更多群成员'
    //   this.listLength = true
    // } else {
    //   this.showMore = ''
    // }
    document.removeEventListener('click', this.docClick.bind(this), false)
  },
  methods: {
    // 获取群成员列表
    getGroupMemberList () {
      this.groupName = this.currentPersonMember && this.currentPersonMember.nickNameWx // 群名称
      var info = this.$route.params
      let isGroupChat = info.hasOwnProperty('roomCode')//是否是群聊或群组

      if (isGroupChat) {
        this.$http.post('/api/im/chatroom/findChatRoomMember.do', {
          chatRoomName: info.chatRoomName,
          //roomCode: info.roomCode
        }).then(res => {
          if (res.data.result) {
            this.memberList = res.data.returnObject
            this.$store.dispatch('groupMembersList', res.data.returnObject) 
            //免打扰状态 获取成员列表字段 noDisturb
            if(res.data.returnObject.length > 0){
              this.$nextTick(()=>{
                this.switchValue2 = res.data.returnObject[0].noDisturb
                // console.log(typeof(this.switchValue2))
              })
            }

          }
        })
      }
    },

    // 添加群成员
    addGroupMember () {
      this.isShowBox = true
      this.showAddSubmit = true
      this.showDelSubmit = false
      this.getCustomer()
    },
    // 确认添加群成员
    addGroupMember_request () {
      if (this.checkboxList.length < 1) {
        this.$message({
          type: 'error',
          message: '请选择要添加的客户'
        })
        return false
      }
      var groupChat = this.$route.params
      var noWxZk = this.$cfg.nowSelectInfo.noWx

      var userNames = []
      var nickNames = []
      var us
      var ni

      this.checkboxList.forEach(item => {
        userNames.push(item.noWx)
        nickNames.push(item.memberName)
      })
      us = userNames.join(',')
      ni = nickNames.join(',')

      this.$http({
        type: 'post',
        url: '/api/im/chatroom/addChatRoomMember.do',
        params: {
          noWxZk: noWxZk, //  中控微信号
          chatRoomName: groupChat.chatRoomName, // 微信群code
          userNames: us, // 群成员微信号
          nickNames: ni // 群成员昵称
        }
      }).then(res => {
        if (res.data.result) {
          this.$message({
            type: 'success',
            message: res.data.returnObject
          })

          this.showbox = false
          setTimeout(() => {
            this.getGroupMemberList() // 重新获取群成员
          }, 3000)

          this.closeBox()
        }else{
          this.$message.error(res.data.errorMessage)
        }
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error.data.errorMessage
        })
        this.closeBox()
      })
    },

    // 删除群成员
    deleteGroupMember () {
      this.isShowBox = true
      this.showDelSubmit = true
      this.showAddSubmit = false
      this.memberData = this.memberList.slice(1)
    },

    // 请求删除群成员
    deleteGroupMember_request () {
      var groupChat = this.$route.params
      var noWxZk = this.$cfg.nowSelectInfo.noWx
      var userNamesArr = []
      var nickNamesArr = []
      var us, ni

      this.checkboxList.forEach(item => {
        userNamesArr.push(item.userName)
        nickNamesArr.push(item.memberName)
      })
      us = userNamesArr.join(',')
      ni = nickNamesArr.join(',')
      this.$http({
        type: 'post',
        url: '/api/im/chatroom/delChatRoomMember.do',
        params: {
          noWxZk: noWxZk, //  中控微信号
          chatRoomName: groupChat.chatRoomName, // 微信群code
          userNames: us, // 群成员微信号
          nickNames: ni // 群成员昵称
        }
      })
        .then(res => {
          if (res.data.result) {
            this.$message({
              type: 'success',
              message: res.data.returnObject
            })
            this.isShowBox = false
            // this.getGroupMemberList() // 重新获取群成员

            setTimeout(() => {
              this.getGroupMemberList() // 重新获取群成员
            }, 3000);
            this.closeBox()
          }else{
            this.$message({
              type: 'error',
              message: res.data.errorMessage
            })
          }

        })
        .catch(error => {
          this.$message({
            type: 'error',
            message: error.data.errorMessage
          })
          this.closeBox()
        })
    },


        //删除并退出群聊
    deleteAndExitGroup () {
      let params = this.$route.params;

      this.$http({
          method: 'post',
          url: '/api/im/chatroom/dismissChatRoom.do',
          params: {
              chatRoomName: params.chatRoomName,
              noWxZk: this.$cfg.nowSelectInfo.noWx
          }
      }).then((res)=>{
          if(res.status == '200' && res.data.result){
              //console.log(res.data);
              this.$message({
                type:'success',
                message:"已退出群聊"
              })
              Bus.$emit("refreshMessageList")
              this.$router.push({
                path: `/im-web/app/${params.wxId}`
              })
          }else{
            this.$message({
              type:'error',
              message:res.data.errorMessage
            })
          }
      })
    },


    // 获取我的客户列表
    getCustomer () {
      var startIndex = 0
      let user = this.$cfg.userInfo
      let nowSelectInfo = this.$cfg.nowSelectInfo
      let flag = this.$cfg.userInfo.adminUserId

      this.$http({
        type: 'get',
        url: '/api/im/contacts/findFriends.do',
        params: {
          adminUserId: flag,
          merchantNo: user.memberNoMerchant, // mast,商户编号
          noWxGm: nowSelectInfo.noWx, // mast,门店编号
          version: '1',
          start: '', // 起始行
          sortBy: startIndex,
          limit: 9999999
        }
      }).then(res => {
        if (res.data.result) {
          // 添加群成员时 群成员列表有的 不能再显示在客户列表
          let arr = res.data.returnObject.rows;

          let idArr = this.memberList.map((item) => {
            return item.userName;
          });

          this.memberData = arr.filter((item, index) => {
            return idArr.indexOf(item.noWx) == -1;
          });
          // console.log(this.memberData )
        }
      })
    },

    //置顶
    stickTop () {
      let room = this.$route.params

      let params = {
        roomType: 2,
        setType: this.switchValue1,
        memberNo: '',
        roomCode: room.roomCode,
      }
      this.$http.post('/api/im/contacts/setUpUser.do',params)
        .then(res=>{
          if(res.data.result){
            this.$message.success('操作成功')
            Bus.$emit('refreshMessageList')
          } else {
            this.$message.error(res.data.errorMessage)
          }


        })
    },

    //查询群消息是否置顶
    checkIsstickTop () {
      let room = this.$route.params
      let params = {
        memberNo: '',
        roomCode: room.roomCode
      }
      this.$http.post('/api/im/contacts/selectSetUp.do',params)
        .then(res=>{
          if(res.data.result){
              this.switchValue1= res.data.returnObject
             // console.log(typeof(this.switchValue1))
          }

          Bus.$emit('refreshMessageList')
        })
    },

    //免打扰
    setNoDisturbing () {
      let room = this.$route.params

      let params = {
        noDisturb: this.switchValue2,
        code: room.roomCode,
      }
      this.$http.post('/api/im/chatroom/setNoDisturb.do',params)
        .then(res=>{
          // console.log(res)
          if(res.data.result){
            this.$message.success('操作成功')
            Bus.$emit('refreshMessageList')
          } else {
            this.$message.error(res.data.errorMessage)
          }
        })
    },

    // 全选
    checkedAll () {
      if (this.checked) {
        this.checkboxList = []
      } else {
        this.checkboxList = []
        this.memberData.forEach(item => {
          this.checkboxList.push(item)
        })
      }
      this.checkNumber = this.checkboxList.length
    },

    showHover: function (item, index, $event) {
      // this.showMemberMore = true
      // this.showMemberName = item.memberName
      // this.showMemberImg = item.memberImg
      //   this.resetRect($event)
    },
    resetRect ($event) {
      document.removeEventListener('click', this.docClick.bind(this), false)
      let bounding = $event.target.getBoundingClientRect()
      let scrollTop =
        document.documentElement.scrollTop + document.body.scrollTop
      let scrollLeft =
        document.documentElement.scrollLeft + document.body.scrollLeft
      this.$refs.hoverBox.style.left =
        bounding.x / 2 + bounding.width * 6 + scrollLeft + 'px'
      this.$refs.hoverBox.style.top =
        bounding.y - bounding.height * 4 + scrollTop + 'px'
      document.addEventListener('click', this.docClick, true)
      this.showRemarkName = true // 显示备注名
    },
    docClick (e) {
      this.showMemberMore = false
    },
    // 保持弹出框状态
    keepStatus () {
      this.showMemberMore = true
    },
    // 添加备注
    addRemark () {
      this.showMemberMore = true // 弹出框保持显示
      this.showRemarkName = false // 显示备注框
      this.$nextTick(() => {
        this.$refs.addInput.focus()
      })
    },
    //
    blurInput_addRemark () {
      console.log(111)
      if (this.addMamarkInput) {
        this.textAddRemark = this.addMamarkInput
      }
      this.showRemarkName = true
    },

    editGroupName () {
      this.showEdit = false
      this.changeName = this.groupName
      this.$nextTick(() => {
        this.$refs.changeInput.focus()
      })
    },

    //修改群名
    blurInput () {
      let UrlParams = this.$route.params

      if (this.changeName === '') {
        this.$message({
          type: 'error',
          message: '群名称不能为空'
        })
        this.$refs.changeInput.focus()
        return false
      }
      if (this.changeName === this.groupName) {
        this.showEdit = true
        return false
      }

      let self = this
      //修改群昵称
      self.$store.dispatch('showLoading')
      self.$http.post('/api/im/chatroom/getChatRoomQRCode.do',{
          chatRoomName: UrlParams.chatRoomName,
          roomNickName: self.changeName,
          noWxGm: UrlParams.wxId,
          memberNoGm: UrlParams.memberNoGm,

      }).then(res=>{
        if(res.data.result){

          self.loopCheckName = window.setInterval(function(){
            if(self.countTime == 0){
              window.clearInterval(self.loopCheckName)
              self.loopCheckName = null
              self.countTime = 5
              self.$message.error('修改失败')
              self.$store.dispatch('hideLoading')
              self.showEdit = true
            }else{
              self.countTime--
              self.checkChangeName()
              console.log(self.countTime)
            }
          },3000)
        } else {
          this.$store.dispatch('hideLoading')
          this.$message.error('修改失败')
          this.showEdit = true
        }

      })

    },

    //查询群名称是否修改成功
    checkChangeName () {
      this.$http.post('/api/im/chatroom/getUpdatedChatRoom.do',{
        chatRoomName: this.$route.params.chatRoomName,
        merchantNo: this.$cfg.userInfo.memberNoMerchant
      }).then(res=>{
        if(res.data.result){
          if(res.data.returnObject.roomNickName == this.changeName){

            this.$store.dispatch('hideLoading')
            window.clearInterval(this.loopCheckName)
            self.loopCheckName = null
            this.countTime = 5
            Bus.$emit('refreshMessageList')
            this.groupName = res.data.returnObject.roomNickName
            this.showEdit = true
          }

        } else {

          this.$store.dispatch('hideLoading')
          this.$message.error('修改失败')
          window.clearInterval(this.loopCheckName)
          self.loopCheckName = null

        }
      })
    },


    packUp () {
        this.listLength = !this.listLength
        if (this.listLength) {
          this.showMore = '查看更多群成员'
        } else {
          this.showMore = '收起'
        }
    },

    closeBox () {
      this.isShowBox = false
      this.memberData = false
      this.showAddSubmit = false
      this.showDelSubmit = false
      this.checkNumber = 0;
      this.checkboxList = [];
    },

    //查看群二维码
    check_groupScanCode () {
      let params = this.$route.params
          params.groupName = this.groupName

      this.$showPopOperating('GroupScanCode', {
        propsData: params,
        closeFun: () => {
          this.$hidePopOperating()
        }
      })
    },

  },
  destroyed(){
    Bus.$off('refreshMessageList')
  },
}
</script>

<style lang="less" scoped="scoped">
.groun-detail-con{
  width: 100%;
  height: 100%;

}
.groupBox {
  width: 100%;
  height: 100%;
  padding: 15px 0 0 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .group_searchBox {
    width: 90%;
    padding-bottom: 15px;
    box-sizing: border-box;
    border-bottom: 1px solid #c7c7c7;
    .search_border {
      width: 95%;
      border-radius: 3px;
      height: 30px;
      display: flex;
      align-items: center;
      margin: 0 auto;
      background-color: #fff;
      .searchTh {
        width: 85%;
        height: 21px;
        border: none;
        margin-left: 4%;
        border-radius: 20px;
        font-size: 12px;
        background-color: transparent;
        color: #000;
      }
      img {
        width: 20px;
        height: 20px;
      }
    }
  }
  .group_memberbox {
    width: 100%;
    flex: 0 1 auto;
    overflow-y: auto;
    box-sizing: border-box;
    height: 510px;
    .minHeight {
      height: 405px;
      overflow: hidden;
    }
    .autoHeight {
      height: auto;
    }

    ul {
      &:after {
        content: "";
        display: block;
        clear: both;
      }

      li {
        width: 45px;
        height: 70px;
        overflow: hidden;
        margin: 15px 15px 0 0;
        float: left;
        cursor: pointer;

        img {
          width: 45px;
          height: 45px;
        }

        p {
          font-size: 12px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          text-align: center;
          margin-top: 5px;
        }
      }
    }
    .watchMore {
      text-align: center;
      font-size: 14px;
      margin-top: 10px;
      &:hover {
        color: #20ab1f;
        cursor: pointer;
      }
    }
  }
  .groupName_box {
    padding: 10px 20px 10px 0;
    box-sizing: border-box;
    border-top: 1px solid #c7c7c7;
    border-bottom: 1px solid #c7c7c7;
    margin-top: 5px;

    .switchTitle{
        width: 45px;
        display: inline-block;
    }

    p {
      line-height: 1.8;

      #groupName{
        width: 82%;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-inline-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .editInfo {
        width: 24px;
        height: 24px;
        background: url("../../../static/img/bianji.png") no-repeat;
        background-size: 100% 100%;
        background-position: center;
        display: inline-block;
        float: right;
        cursor: pointer;
      }

      .rightCheck{
        float: right;
        &:hover{
          cursor:pointer;
          color: #20ab1f;
        }

      }
    }
    .changeName {
      width: 180px;
      height: 30px;
      border-radius: 5px;
      border: 1px solid #a2a2a2;
      text-indent: 10px;
    }
  }
  .deleteBox{
    width: 100%;
    padding-right: 20px;
    button{
      width: 100%;
    }
  }
  .group_otherBox {
    p {
      color: #7d7d7d;
      line-height: 1.8;
    }
  }
}
.hover_box {
  position: absolute;
  width: 270px;
  height: 180px;
  background-color: #fff;
  border: 1px solid #c7c7c7;
  padding: 14px;
  box-sizing: border-box;
  .co-gray {
    color: #afadad;
  }
  .hover_box_head {
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #afadad;
    padding-bottom: 10px;
    p {
      margin-top: 8px;
    }
    img {
      width: 45px;
      height: 45px;
    }
  }
  .hover_box_con {
    .changeName {
      width: 160px;
      height: 22px;
      border-radius: 5px;
      border: 1px solid #a2a2a2;
      text-indent: 10px;
    }
    p {
      margin-top: 10px;
    }
    .hover_box_icon {
      float: right;
    }
  }
}
.codeBox {
  width: 600px;
  height: 460px;
  position: relative;
  left: 58%;
  top: 50%;
  margin-left: -300px;
  margin-top: -230px;
  background-color: #fff;
  z-index: 999;
  box-shadow: #3e3d3d 0 0 15px;
  .delete {
    width: 32px;
    height: 32px;
    background: url("../../../static/img/delete.png") no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
    z-index: 999;
  }
  .head_box {
    width: 100%;
    line-height: 40px;
    font-size: 16px;
    padding: 0 20px;
    box-sizing: border-box;
    border-bottom: 1px solid #e2e2e2;
    padding-bottom: 5px;
    input{
      width: 300px;
      height: 32px;
      line-height: 32px;
      margin-left: 20px;
      text-indent: 20px;
      border-radius: 4px;
      border: 1px solid #d1d1d1;
      font-size: 14px;
    }
  }
  .memberBox {
    width: 100%;
    height: 357px;
    padding: 0 20px;
    box-sizing: border-box;
    overflow: auto;
    ul li {
      display: -webkit-box;
      // display: flex;
      flex: 1;
      border-bottom: 1px solid #e2e2e2;
      margin-top: 10px;
      padding-bottom: 10px;
      vertical-align: middle;
      .flex_box {
        display: flex;
        flex: 1;
        justify-content: space-between;
        flex-direction: column;
      }
      .headImg {
        width: 40px;
        height: 40px;
        border-radius: 3px;
        margin: 0 15px 0 10px;
        vertical-align: middle;
      }
      .time {
        color: #737373;
        font-size: 12px;
      }
    }
  }
  .footer1 {
    width: 100%;
    height: 45px;
    line-height: 45px;
    background-color: #f2f2f2;
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 0 10px;
    box-sizing: border-box;
    .quanxuan {
      margin-right: 20px;
    }
  }
}

</style>
