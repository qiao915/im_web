<template>
  <div class="userDetailBox">
    <div class="userBox">
      <span :class="{'active':itemActive == 1}" @click="itemActiveFn(1)">客户资料</span>
      <span :class="{'active':itemActive == 2}" @click="itemActiveFn(2)">通话记录</span>
    </div>
    <div class="main" v-show="itemActive == 1">
      <div class="userInfo">
        <ul class="userInfo_ul">
          <li>
            <span v-if="showEdit">{{personMemberDetail.nickNameRemarkWx || personMemberDetail.memberName}}</span>
            <input
              @blur="blurInput()"
              @keyup.enter="blurInput()"
              class="changeName"
              maxlength="16"
              ref="changeInput"
              type="text"
              v-else
              v-model="changeName"
            >
            <i :class="[personMemberDetail.sex == 'MALE' ? 'man' : 'woman']" class="gender"></i>
            <span @click="editMemberNickName" class="editInfo cf" v-if="showEditButton"></span>
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
              @blur="blurInput_editMobile()"
              @keyup.enter="blurInput_editMobile()"
              class="changeName"
              maxlength="11"
              ref="changeInput_changeMobile"
              type="text"
              v-else
              v-model="changeMobile"
            >
            <span @click="editMobile" class="editInfo cf"></span>
          </li>
          <li>补充资料：
            <span class="emtype" v-if="showEditRemark">{{personMemberDetail.remark}}</span>
            <input
              @blur="blurInput_editRemark()"
              @keyup.enter="blurInput_editRemark()"
              class="changeName"
              maxlength="50"
              ref="changeInput_changeRemark"
              type="text"
              v-else
              v-model="changeRemark"
            >
            <span @click="editRemark" class="editInfo cf"></span>
          </li>
          <li>朋友圈提醒周期:
            <span class="emtype" v-if="showEditCycle">{{personMemberDetail.cycle}}</span>
            <input
              @blur="blurInput_editCycle()"
              @keyup.enter="blurInput_editCycle()"
              class="changeName"
              ref="changeInput_changeCycle"
              type="number"
              v-else
              v-model.number="changeCycle"
            >
            <span @click="editCycle" class="editInfo cf"></span>
          </li>
        </ul>
      </div>
      <div class="userFrom">
        <!-- <span class>客户分组</span> -->
        <span class="">客户分组<span @click="edit_member_group" class="editInfo cf"></span></span>
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
        <span class="">客户标签<span @click="edit_member_tags" class="editInfo cf"></span></span>
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
              @change="stickTop()"
              active-color="#20ab1f"
              active-value="1"
              inactive-color="#c9c9c9"
              inactive-value="0"
              v-model="switchValue1"
            ></el-switch>
          </div>
          <span @click="checkCircleFriends()" class="checkCircle">查看朋友圈</span>
        </div>
      </div>
    </div>
    <div class="main audioList" v-show="itemActive == 2">
      <div class="block">
        <el-date-picker
          :picker-options="pickerOptions"
          align="right"
          end-placeholder="结束日期"
          range-separator="至"
          size="mini"
          start-placeholder="开始日期"
          type="daterange"
          unlink-panels
          v-model="selectData">
        </el-date-picker>
        <el-button class="searchBtn" size="mini" type="success">搜索</el-button>
      </div>
      <div class="timeline">
        <div v-for="item in 6">
          <span class="time">2019/9/16</span>
          <el-timeline>
            <el-timeline-item
              color="#ff7c7c"
              icon="el-icon-s-help">
              <div class="itemConten">
                <p class="time">
                  <el-popover
                    placement="top-start"
                    trigger="hover"
                    width="200">
                    <div class="popoverContent">
                      <span>客户电话：18123954667</span>
                      <span>本机号码：19928789776</span>
                    </div>
                    <i class="el-icon-phone-outline cursorP" slot="reference"></i>
                  </el-popover>
                  22:30
                </p>
                <div class="audioBox">
                  <div class="audioContent">
                    <audio-weixin :audio-src='audioSrc' ></audio-weixin>
                    <!--                    <audio src="http://192.168.0.188:8000/audio.mp3"></audio>-->
                  </div>
                </div>
              </div>
            </el-timeline-item>
            <el-timeline-item
              color="#ff7c7c"
              icon="el-icon-s-help">
              <div class="itemConten">
                <p class="time">
                  <el-popover
                    placement="top-start"
                    trigger="hover"
                    width="200">
                    <div class="popoverContent">
                      <span>客户电话：18123954667</span>
                      <span>本机号码：19928789776</span>
                    </div>
                    <i class="el-icon-phone-outline cursorP" slot="reference"></i>
                  </el-popover>
                  21:40
                </p>
                <div class="audioBox">
                  <div class="audioContent">
                    <audio-weixin :audio-src='audioSrc' ></audio-weixin>
<!--                    <audio src="http://192.168.0.188:8000/audio.mp3"></audio>-->
                  </div>
                </div>
              </div>
            </el-timeline-item>
            <el-timeline-item
              color="#ff7c7c"
              icon="el-icon-s-help">
              <div class="itemConten">
                <p class="time">
                  <el-popover
                    placement="top-start"
                    trigger="hover"
                    width="200">
                    <div class="popoverContent">
                      <span>客户电话：18123954667</span>
                      <span>本机号码：19928789776</span>
                    </div>
                    <i class="el-icon-phone-outline cursorP" slot="reference"></i>
                  </el-popover>
                  20:46
                </p>
                <div class="audioBox">
                  <div class="audioContent">
                    <audio-weixin :audio-src='audioSrc' ></audio-weixin>
                    <!--                    <audio src="http://192.168.0.188:8000/audio.mp3"></audio>-->
                  </div>
                </div>
              </div>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import {chatWindowType} from '@/components/Chat/chatWindowType'
  import {findPersonMember} from '@/api'
  import Bus from '../Data/bus.js'
  import AudioWeixin from '@/components/audio-player/audio-like-weixin.vue'
  export default {
    name: 'UserDetail',
    components: {
      AudioWeixin
    },
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

    data() {
      return {
        audioSrc:"http://192.168.0.188:8000/audio.mp3",
        showEdit: true,
        historyPersonMember: {},
        switchValue1: false,
        changeMobile: '',
        showEditMobile: true,
        changeRemark: '',
        showEditRemark: true,
        changeCycle: 30,
        showEditCycle: true,
        itemActive: 1,
        selectData: "",
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        }
      }
    },

    computed: {
      ...mapGetters([
        'currentPersonMemberDetail',
        'currentPersonMember'
      ]),
      personMemberDetail() {
        if (this.type === chatWindowType.history) {
          return this.historyPersonMember
        }

        return this.currentPersonMemberDetail

      },
      nickName() {
        return this.personMemberDetail.nickNameRemarkWx
      },
      tagsData() {
        return this.personMemberDetail.lables
      },

      showEditButton() {
        return this.showEdit && this.type === chatWindowType.chat
      }
    },
    watch: {
      $route() {
        this.checkIsstickTop()
        this.getmemberDetail()
      }

    },
    mounted() {
      // console.log(this.$cfg)
      Bus.$on('refreshUserInfo', (e) => {
        this.getmemberDetail()
      })
      this.getmemberDetail()
      this.checkIsstickTop()
    },
    async created() {
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
      itemActiveFn(n) {
        if (n != this.itemActive) this.itemActive = n;
      },
      ...mapActions(['editNickName']),

      // 修改昵称
      editMemberNickName() {
        // console.log(this.personMemberDetail)
        this.showEdit = false
        this.nickName ? this.changeName = this.nickName : this.changeName = this.personMemberDetail.memberName

        this.$nextTick(() => {
          this.$refs.changeInput.focus()
        })
      },

      // 失去焦点请求数据
      async blurInput() {
        if (!this.changeName) {
          this.$message({
            type: 'error',
            message: '客户昵称不能为空'
          })
          this.showEdit = true
          //  this.$refs.changeInput.focus()
          return false
        }
        if (this.changeName === this.nickName) {
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
      editMobile() {
        this.showEditMobile = false
        this.changeMobile = this.personMemberDetail.mobile

        this.$nextTick(() => {
          this.$refs.changeInput_changeMobile.focus()
        })
        console.log(this.personMemberDetail)
      },

      blurInput_editMobile() {
        if (!this.changeMobile) {
          this.$message({
            type: 'error',
            message: '手机号不能为空'
          })
          this.showEditMobile = true
          return false
        }

        if (this.changeMobile === this.personMemberDetail.mobile) {
          this.showEditMobile = true
          return false
        }

        let params = {
          memberNo: this.personMemberDetail.memberNo,
          memberNoGm: this.personMemberDetail.memberNoGm,
          noWxGm: this.$cfg.nowSelectInfo.noWx,
          mobile: this.changeMobile
        }
        this.$http.post('/api/member/updateMember.do', params).then(res => {
          if (res.data.result) {
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
      editRemark() {
        this.showEditRemark = false
        this.changeRemark = this.personMemberDetail.remark

        this.$nextTick(() => {
          this.$refs.changeInput_changeRemark.focus()
        })
      },

      blurInput_editRemark() {
        if (!this.changeRemark) {
          this.$message({
            type: 'error',
            message: '补充资料不能为空'
          })
          this.showEditRemark = true
          return false
        }

        if (this.changeRemark === this.personMemberDetail.remark) {
          this.showEditRemark = true
          return false
        }

        let params = {
          memberNo: this.personMemberDetail.memberNo,
          memberNoGm: this.personMemberDetail.memberNoGm,
          noWxGm: this.$cfg.nowSelectInfo.noWx,
          remark: this.changeRemark
        }
        this.$http.post('/api/member/updateMember.do', params).then(res => {
          if (res.data.result) {
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
      editCycle() {
        this.showEditCycle = false
        this.changeCycle = this.personMemberDetail.cycle

        this.$nextTick(() => {
          this.$refs.changeInput_changeCycle.focus()
        })
      },

      blurInput_editCycle() {
        let boolean = new RegExp("^[1-9][0-9]*$").test(this.changeCycle)
        if (!boolean) {
          this.$message.error("请输入正整数")
          this.changeCycle = ''
          return false
        }

        if (!this.changeCycle) {
          this.$message({
            type: 'error',
            message: '朋友圈提醒周期不能为空'
          })
          this.showEditCycle = true
          return false
        }

        if (this.changeCycle === this.personMemberDetail.cycle) {
          this.showEditCycle = true
          return false
        }

        let params = {
          memberNo: this.personMemberDetail.memberNo,
          // memberNoGm: this.personMemberDetail.memberNoGm,
          // noWxGm: this.$cfg.nowSelectInfo.noWx,
          cycle: this.changeCycle
        }

        this.$http.post('/api/imh5/member/updateFriendPointCycle.do', params).then(res => {
          if (res.data.result) {
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
      stickTop() {
        let params = {
          roomType: 1,
          setType: this.switchValue1,
          memberNo: this.$route.params.memberNo,
          roomCode: '',
        }
        this.$http.post('/api/im/contacts/setUpUser.do', params)
          .then(res => {
            if (res.data.result) {
              this.$message.success('操作成功')
              Bus.$emit('refreshMessageList')
            } else {
              this.$message.error(res.data.errorMessage)
            }
          })
      },

      //查询客户消息是否置顶
      checkIsstickTop() {
        let params = {
          memberNo: this.$route.params.memberNo,
          roomCode: ''
        }
        this.$http.post('/api/im/contacts/selectSetUp.do', params)
          .then(res => {
            if (res.data.result) {
              this.switchValue1 = res.data.returnObject
            }
            Bus.$emit('refreshMessageList')
          })
      },

      //查看朋友圈
      checkCircleFriends() {
        let params = this.$route.params;

        this.$router.push({
          path: `/im-web/app/${params.wxId}/dynamic/customer/${this.personMemberDetail.memberNo}`
        });
      },

      //获取客户详细信息
      getmemberDetail() {
        let params = this.$route.params
        let isGroupChat = params.hasOwnProperty('roomCode')//是否是群聊或群组

        if (!isGroupChat) {
          this.$http.post('/api/imh5/index/findPersonMember.do', {
            code: params.code,
            memberNo: params.memberNo,
            memberNoGm: params.memberNoGm
          }).then(res => {
            if (res.data.result) {
              this.$store.commit('SET_CURRENT_PERSON_MEMBER_DETAIL', res.data.returnObject);
              // console.log(res)
            }
          })
        }
      },

      //编辑客户标签
      edit_member_tags() {
        this.$showPopOperating('EditTags', {
          propsData: this.personMemberDetail,
          closeFun: () => {
            this.$hidePopOperating()
          }
        })
      },

      //编辑客户分组
      edit_member_group() {
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
  .userDetailBox {
    width: 100%;
    height: 100%;
    padding: 0 0 0 10px;
    box-sizing: border-box;
    /*overflow: auto;*/
    display: flex;
    flex-direction: column;

    .userBox {
      width: 100%;
      height: 60px;
      border-bottom: 1px solid #cac5c5;
      padding-top: 20px;
      box-sizing: border-box;
      font-size: 15px;
      font-weight: 600;
      color: #333;
      cursor: pointer;

      span {
        margin-right: 10px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      .active {
        color: #08A406
      }
    }

    .main {
      flex: 1;
    }

    /*.audioList /deep/ .el-date-editor{
      width: 100%;
    }*/

    .audioList {
      margin-top: 10px;
      display: flex;
      flex-direction: column;

      .block {
        width: 100%;
        display: flex;

        /deep/ .el-date-editor {
          .el-input__icon {
            width: 16px;
          }

          .el-range-separator {
            width: 11%;
          }

          .el-range-input {
            width: 40%;
          }
        }

        .searchBtn {
          margin: 0 5px;
        }
      }

      .timeline {
        flex: 1;
        margin-top: 10px;
        padding-right: 10px;
        box-sizing: border-box;
        /*height: 100%;*/
        overflow-x: visible;
        overflow-y: auto;

        .time {
          display: block;
          margin-bottom: 10px;
          font-size: 15px;
        }
        .audioBox{
          display: flex;
          align-items: center;
          .audioContent{
            width: 60%;
            height: 30px;
            background: white;
            margin-right: 5px;
            /*border: 1px solid #ebeef5;*/
            box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
            border-radius: 5px;
          }
        }
        .el-icon-phone-outline{
          font-size: 18px;
          color: #08A406;
        }
        /deep/ .el-card__body {
          padding: 5px;
        }

        /deep/ .el-timeline-item__tail {
          border-left-color: #ff7c7c;
          border-left-style: dashed;
          border-left-width: 1px;
          left: 6px;
        }

        /deep/ .el-timeline-item__node--normal {
          left: 0;
          width: 14px;
          height: 14px;
        }
      }
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

      .checkCircle {
        padding: 4px 8px;
        background-color: #08A406;
        color: #fff;
        font-size: 16px;
        border-radius: 15px;
        cursor: pointer;

        &:hover {
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

  .stickTop {
    margin-bottom: 20px;
    line-height: 30px;
  }
</style>
