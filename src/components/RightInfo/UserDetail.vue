<template >
  <div class="userDetailBox">
    <div class="userBox">
      <span>客户资料</span>
    </div>
    <div class="userInfo">
      <ul class="userInfo_ul">
        <li>
          <span v-if="showEdit">{{personMemberDetail.nickNameRemarkWx || personMemberDetail.memberName}}</span>
          <input
            class="changeName"
            type="text"
            ref="changeInput"
            v-else
            v-model="changeName"
            maxlength="16"
            @blur="blurInput()"
            @keyup.enter="blurInput()"
          >
          <i class="gender" :class="[personMemberDetail.sex == 'MALE' ? 'man' : 'woman']"></i>
          <span class="editInfo cf" v-if="showEditButton" @click="editMemberNickName"></span>
        </li>
        <li>微信昵称：
          <span class="emtype">{{personMemberDetail.nickNameWx}}</span>
        </li>
        <li>备注：
          <span class="emtype">{{personMemberDetail.nickNameRemarkWx}} </span>
        </li>
        <li>手机：
          <span class="emtype" v-if="showEditMobile">{{personMemberDetail.mobile}}</span>
          <input
            class="changeName"
            type="text"
            ref="changeInput_changeMobile"
            v-else
            v-model="changeMobile"
            maxlength="11"
            @blur="blurInput_editMobile()"
            @keyup.enter="blurInput_editMobile()"
          >
          <span class="editInfo cf" @click="editMobile"></span>
        </li>
        <li>补充资料：
          <span class="emtype" v-if="showEditRemark">{{personMemberDetail.remark}}</span>
          <input
            class="changeName"
            type="text"
            ref="changeInput_changeRemark"
            v-else
            v-model="changeRemark"
            maxlength="50"
            @blur="blurInput_editRemark()"
            @keyup.enter="blurInput_editRemark()"
          >
          <span class="editInfo cf" @click="editRemark"></span>
        </li>
        <li>朋友圈提醒周期:
          <span class="emtype" v-if="showEditCycle">{{personMemberDetail.cycle}}</span>
          <input
            class="changeName"
            type="number"
            ref="changeInput_changeCycle"
            v-else
            v-model.number="changeCycle"
            @blur="blurInput_editCycle()"
            @keyup.enter="blurInput_editCycle()"
          >
          <span class="editInfo cf" @click="editCycle"></span>
        </li>
      </ul>
    </div>
    <div class="userFrom">
      <!-- <span class>客户分组</span> -->
      <span class="">客户分组<span class="editInfo cf" @click="edit_member_group"></span></span>
      <ul class="userInfo_ul">
        <li>所属导购：
          <span class="emtype">{{personMemberDetail.memberNameGm}}</span>
        </li>
        <li>客户分组：
          <span class="emtype">{{personMemberDetail.pmTypeName}}</span>
        </li>
        <li>添加日期：
          <span class="emtype">{{personMemberDetail.createDate}}</span>
        </li>
      </ul>
    </div>
    <div class="userFrom">
      <!-- <span class="">客户标签</span> -->
      <span class="">客户标签<span class="editInfo cf" @click="edit_member_tags"></span></span>
      <ul class="user_label">
        <li v-for="item in tagsData">{{item.labelName}}</li>
      </ul>
      <div class="clearFix">
      </div>
    </div>
    <div class="userFrom">
      <span>设置</span>
      <div style="margin-top:20px;">
        <div class="stickTop">
          <span>置顶：</span>
          <el-switch
            v-model="switchValue1"
            active-value="1"
            inactive-value="0"
            active-color="#20ab1f"
            inactive-color="#c9c9c9"
            @change="stickTop()"
            > </el-switch>
        </div>
        <span class="checkCircle" @click="checkCircleFriends()">查看朋友圈</span>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { chatWindowType } from '@/components/Chat/chatWindowType'
import { findPersonMember } from '@/api'
import Bus from '../Data/bus.js'

export default {
  name: 'UserDetail',

  props: {
    type: {
      type: Number,
      default: chatWindowType.chat
    },

    historyData: {
      type: Object,
      default: () => {
        return {
          chatRoomFlag: false,
          code: '',
          memberNoGm: '',
        }
      }
    }
  },

  data () {
    return {
      showEdit: true,
      historyPersonMember: {},
      switchValue1: false,
      changeMobile: '',
      showEditMobile: true,
      changeRemark: '',
      showEditRemark: true,
      changeCycle: 30,
      showEditCycle: true
    }
  },

  computed: {
    ...mapGetters([
      'currentPersonMemberDetail',
      'currentPersonMember'
    ]),
    personMemberDetail () {
      if (this.type === chatWindowType.history) {
        return this.historyPersonMember
      }

      return this.currentPersonMemberDetail

    },
    nickName () {
      return this.personMemberDetail.nickNameRemarkWx
    },
    tagsData () {
      return this.personMemberDetail.lables
    },

    showEditButton () {
      return this.showEdit && this.type === chatWindowType.chat
    }
  },
  watch:{
    $route(){
        this.checkIsstickTop()
        this.getmemberDetail()
    }

  },
  mounted(){
    // console.log(this.$cfg)
    Bus.$on('refreshUserInfo', (e)=>{
      this.getmemberDetail()
    })
    this.getmemberDetail()
    this.checkIsstickTop()
  },
  async created () {
    let params = this.$route.params

    if (this.type === chatWindowType.history) {
      this.showEdit = true
      let ret = await findPersonMember(this.$http, {
        code: params.code,
        memberNo: params.memberNo,
        memberNoGm: params.memberNoGm
      })

      this.historyPersonMember = ret
    }

  },

  methods: {
    ...mapActions(['editNickName']),

    // 修改昵称
    editMemberNickName () {
      // console.log(this.personMemberDetail)
      this.showEdit = false
      this.nickName ? this.changeName = this.nickName : this.changeName = this.personMemberDetail.memberName

      this.$nextTick(() => {
        this.$refs.changeInput.focus()
      })
    },

    // 失去焦点请求数据
    async blurInput () {
      if (!this.changeName) {
        this.$message({
          type: 'error',
          message: '客户昵称不能为空'
        })
        this.showEdit = true
      //  this.$refs.changeInput.focus()
        return false
      }
      if (this.changeName === this.nickName ) {
        this.showEdit = true
        return false
      }

      let res = await this.editNickName({
        code: this.personMemberDetail.code,
        nickName: this.changeName
      })

      if (res.data.result) {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        this.personMemberDetail.nickNameRemarkWx = this.changeName
      } else {
        this.$message({
          type: 'error',
          message: '修改失败'
        })
      }

      this.showEdit = true
    },

    //修改手机号
    editMobile () {
      this.showEditMobile = false
      this.changeMobile = this.personMemberDetail.mobile

      this.$nextTick(() => {
        this.$refs.changeInput_changeMobile.focus()
      })
      console.log(this.personMemberDetail)
    },

    blurInput_editMobile () {
      if(!this.changeMobile) {
        this.$message({
          type: 'error',
          message: '手机号不能为空'
        })
        this.showEditMobile = true
        return false
      }

      if (this.changeMobile === this.personMemberDetail.mobile ) {
        this.showEditMobile = true
        return false
      }

      let params = {
        memberNo: this.personMemberDetail.memberNo,
        memberNoGm: this.personMemberDetail.memberNoGm,
        noWxGm: this.$cfg.nowSelectInfo.noWx,
        mobile: this.changeMobile
      }
      this.$http.post('/api/member/updateMember.do',params).then(res =>{
        if(res.data.result) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.personMemberDetail.mobile = this.changeMobile
        } else {
          this.$message({
            type: 'error',
            message: '修改失败'
          })
        }
        this.showEditMobile = true

      })
    },


    //修改补充资料remark
    editRemark () {
      this.showEditRemark = false
      this.changeRemark = this.personMemberDetail.remark

      this.$nextTick(() => {
        this.$refs.changeInput_changeRemark.focus()
      })
    },

    blurInput_editRemark () {
      if(!this.changeRemark) {
        this.$message({
          type: 'error',
          message: '补充资料不能为空'
        })
        this.showEditRemark = true
        return false
      }

      if (this.changeRemark === this.personMemberDetail.remark ) {
        this.showEditRemark = true
        return false
      }

      let params = {
        memberNo: this.personMemberDetail.memberNo,
        memberNoGm: this.personMemberDetail.memberNoGm,
        noWxGm: this.$cfg.nowSelectInfo.noWx,
        remark: this.changeRemark
      }
      this.$http.post('/api/member/updateMember.do',params).then(res =>{
        if(res.data.result) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.personMemberDetail.remark = this.changeRemark
        } else {
          this.$message({
            type: 'error',
            message: '修改失败'
          })
        }
        this.showEditRemark = true

      })
    },

    //朋友圈提醒周期
    editCycle () {
      this.showEditCycle = false
      this.changeCycle = this.personMemberDetail.cycle

      this.$nextTick(() => {
        this.$refs.changeInput_changeCycle.focus()
      })
    },

    blurInput_editCycle () {
      let boolean = new RegExp("^[1-9][0-9]*$").test(this.changeCycle)
      if (!boolean) {
          this.$message.error("请输入正整数")
          this.changeCycle = ''
          return false
      }

      if(!this.changeCycle) {
        this.$message({
          type: 'error',
          message: '朋友圈提醒周期不能为空'
        })
        this.showEditCycle = true
        return false
      }

      if (this.changeCycle === this.personMemberDetail.cycle ) {
        this.showEditCycle = true
        return false
      }


      let params = {
        memberNo: this.personMemberDetail.memberNo,
        // memberNoGm: this.personMemberDetail.memberNoGm,
        // noWxGm: this.$cfg.nowSelectInfo.noWx,
        cycle: this.changeCycle
      }

      this.$http.post('/api/imh5/member/updateFriendPointCycle.do',params).then(res =>{
        if(res.data.result) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.personMemberDetail.cycle = this.changeCycle
        } else {
          this.$message({
            type: 'error',
            message: '修改失败'
          })
        }
        this.showEditCycle = true

      })
    },


    //置顶
    stickTop () {
      let params = {
        roomType: 1,
        setType: this.switchValue1,
        memberNo: this.$route.params.memberNo,
        roomCode:'',
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

    //查询客户消息是否置顶
    checkIsstickTop () {
      let params = {
        memberNo: this.$route.params.memberNo,
        roomCode: ''
      }
      this.$http.post('/api/im/contacts/selectSetUp.do',params)
        .then(res=>{
          if(res.data.result){
            this.switchValue1 = res.data.returnObject
          }
          Bus.$emit('refreshMessageList')
        })
    },

    //查看朋友圈
    checkCircleFriends(){
      let params = this.$route.params;

      this.$router.push({
        path: `/im-web/app/${params.wxId}/dynamic/customer/${this.personMemberDetail.memberNo}`
      });
    },

    //获取客户详细信息
    getmemberDetail () {
      let params = this.$route.params
      let isGroupChat = params.hasOwnProperty('roomCode')//是否是群聊或群组

      if (!isGroupChat) {
        this.$http.post('/api/imh5/index/findPersonMember.do',{
          code: params.code,
          memberNo: params.memberNo,
          memberNoGm: params.memberNoGm
        }).then(res=>{
          if(res.data.result){
            this.$store.commit('SET_CURRENT_PERSON_MEMBER_DETAIL', res.data.returnObject);
            // console.log(res)
          }
        })
      }
    },

    //编辑客户标签
    edit_member_tags () {
      this.$showPopOperating('EditTags', {
        propsData: this.personMemberDetail,
        closeFun: () => {
          this.$hidePopOperating()
        }
      })
    },

    //编辑客户分组
    edit_member_group () {
      this.$showPopOperating('EditGroup', {
        propsData: this.personMemberDetail,
        closeFun: () => {
          this.$hidePopOperating()
        }
      })
    },

  }
}
</script>

<style lang="less" scoped>
.userDetailBox{
  width: 100%;
  height: 100%;
  padding: 0 0 0 10px;
  box-sizing: border-box;
  overflow: auto;
  .userBox {
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #cac5c5;
    padding-top: 20px;
    box-sizing: border-box;
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }
  .userInfo_ul {
    .gender {
      width: 16px;
      height: 16px;
      display: inline-block;
      margin-left: 10px;
      vertical-align: sub;
    }
    .woman {
      background: url("../../../static/img/icon/woman.png") no-repeat;
      background-size: 100% 100%;
    }
    .man {
      background: url("../../../static/img/icon/man.png") no-repeat;
      background-size: 100% 100%;
    }
    li {
      margin-top: 10px;
      font-size: 14px;
      color: #333;
      &:last-child {
        margin-bottom: 10px;
      }
      .changeName {
        width: 160px;
        height: 24px;
        border-radius: 5px;
        border: 1px solid #a2a2a2;
        text-indent: 10px;
      }
    }
  }
  .userFrom {
    border-top: 1px solid #cac5c5;
    padding-top: 10px;
    box-sizing: border-box;
    margin-bottom: 10px;
    & > span {
      font-size: 16px;
      color: #333;
      font-weight: 600;
    }
    .user_label {
      margin-top: 10px;
      li {
        float: left;
        display: inline-block;
        padding: 3px 10px;
        border: 1px solid #e0d7d7;
        color: #3ead38;
        margin-right: 4%;
        border-radius: 4px;
        margin-bottom: 8px;
        background-color: #fff;
        cursor: pointer;
        &:hover {
          background-color: #e2e2e2;
        }
      }
    }
    .checkCircle{
      padding: 4px 8px;
      background-color: #08A406;
      color: #fff;
      font-size: 16px;
      border-radius: 15px;
      cursor: pointer;
      &:hover{
        background-color: #09c106;
      }
    }
  }
  .orderList {
    padding-top: 10px;
    box-sizing: border-box;
    border-top: 1px solid #cac5c5;
    & > span {
      font-size: 16px;
      color: #333;
      font-weight: 600;
    }
  }
}
.editInfo {
  width: 20px;
  height: 20px;
  background: url("../../../static/img/bianji.png") no-repeat;
  background-size: 100% 100%;
  background-position: center;
  display: block;
  float: right;
  cursor: pointer;
  position: relative;
  top: 0;
  right: 10px;
}
.stickTop{
  margin-bottom: 20px;
  line-height: 30px;
}
</style>
