<!-- 发朋友圈 -->
<template>
  <div class="trusteeship circleFriends">
    <TableBox :isShowBox="isShowBox" @closeBox="closeBox">
      <template slot="tableBox_top">
        <template slot="delete"></template>
      </template>
      <template slot="top_tab">
        <div class="keywords">
          <el-tabs v-model="activeName">
            <!-- <el-tab-pane name="first">
               <span slot="label" ><i class="el-icon-tickets"></i> 朋友圈列表</span>
               <el-form :inline="true" class="demo-form-inline tableSearchForm">
                 <el-form-item  label="发布微信：">
                   <el-input type="text" v-model="params.noWxs"></el-input>
                 </el-form-item>
                 <el-form-item label="发布状态：">
                   <el-select v-model="params.type"  placeholder="请选择">
                     <el-option label="全部" value=""></el-option>
                     <el-option label="未执行" value="1"></el-option>
                     <el-option label="执行中" value="2"></el-option>
                     <el-option label="已完成" value="3"></el-option>
                     <el-option label="失败" value="4"></el-option>
                   </el-select>
                 </el-form-item>
                 <el-form-item  label="分享内容：">
                   <el-input type="text"  v-model="params.content"></el-input>
                 </el-form-item>
                 <el-form-item label="创建时间 :">
                   <el-date-picker v-model="params.createDateBegin" style="width:150px;"  type="date" placeholder="开始日期" value-format="yyyy-MM-dd" :picker-options="maxTime"></el-date-picker>
                   <span>至</span>
                   <el-date-picker v-model="params.createDateEnd" style="width:150px;" type="date" placeholder="结束日期" value-format="yyyy-MM-dd" :picker-options="minTime"></el-date-picker>
                 </el-form-item>
                 <el-button type="success" @click="getCircleFriendsList()">查询</el-button>

               </el-form>
               <el-table ref="multipleTable" :data="circleFriendsData" border tooltip-effect="dark"  stripe align="center" style="width: 100%">
                 <el-table-column label="发布微信号" prop="noWxs">
                   <template slot-scope="scope">
                     <span>{{scope.row.alias || scope.row.noWxs}}</span>
                   </template>
                 </el-table-column>
                 <el-table-column label="类型" width="70px;">
                   <template slot-scope="scope">
                     <span v-if="scope.row.type == 4">纯文字</span>
                     <span v-if="scope.row.type == 1">图文</span>
                     <span v-if="scope.row.type == 2">视频</span>
                     <span v-if="scope.row.type == 3">文章链接</span>
                   </template>
                 </el-table-column>
                 <el-table-column label="分享内容">
                   <template slot-scope="scope">
                   <span v-if="scope.row.content">
                     <div :title="scope.row.content" class="answer">{{scope.row.content}}</div>
                   </span>
                     <span v-if="scope.row.imgAddr">
                     <img class="img_list" v-for="item in (scope.row.imgAddr)" :src="item" alt="">
                   </span>
                     <span v-if="scope.row.type == 2 && scope.row.linkUrl">[视频]</span>
                   </template>
                 </el-table-column>
                 <el-table-column label="创建时间" prop="createDate" width="100px;"></el-table-column>
                 <el-table-column label="预计执行时间" prop="executeTime" width="100px;"></el-table-column>
                 <el-table-column label="实际执行时间" prop="realExecuteTime" width="100px;"></el-table-column>
                 <el-table-column label="发布状态" width="80px;">
                   <template slot-scope="scope">
                     <span v-if="scope.row.jobState == 1">未执行</span>
                     <span v-if="scope.row.jobState == 2">执行中</span>
                     <span v-if="scope.row.jobState == 3">已完成</span>
                     <span v-if="scope.row.jobState == 4">失败</span>
                   </template>
                 </el-table-column>
                 <el-table-column label="自动评论">
                   <template slot-scope="scope">
                     <span class="fail_case" :title="scope.row.autoContent">{{scope.row.autoContent}}</span>
                   </template>
                 </el-table-column>
                 <el-table-column label="失败原因" width="100px;">
                   <template slot-scope="scope">
                     <span class="fail_case" :title="scope.row.remark">{{scope.row.remark}}</span>
                   </template>
                 </el-table-column>
                 <el-table-column align="center" fixed="right" label="操作" width="75">
                   <template slot-scope="scope">
                     <div class="">
                       <el-button type="text" v-if="scope.row.jobState == 4"  style="color:#08A406;" size="mini" @click="sendAgain(scope.row)">重发</el-button>
                       <el-button type="text" style="color:#08A406;" size="mini" @click="deleteFriendsJob(scope.row)">删除</el-button>
                     </div>
                   </template>
                 </el-table-column>
               </el-table>
               <div class="pagination">
                 <el-pagination class="u-pagination" @current-change="handleCurrentChange" :current-page.sync="pageNo" :page-size="pageSize" background layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
               </div>
             </el-tab-pane>-->

            <el-tab-pane name="second">
              <span slot="label"><i class="el-icon-plus"></i> 发朋友圈</span>
              <el-form ref="addform" :model="addform" :rules="rules" label-width="110px" label-position="left" style="">
                <el-form-item label="微信号：" prop="noWx">
                  <el-input v-model="addform.noWx" :disabled="true" style="width:85%;"></el-input>
                  <el-button type="success" @click="chooseNoWx()">选择</el-button>
                </el-form-item>
                <el-form-item label="执行时间：" prop="executeTime">
                  <el-date-picker v-model="addform.executeTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime"
                                  placeholder="选择日期时间" style="width:85%;" :picker-options="minExecuteTime">
                  </el-date-picker>
                </el-form-item>
                <!-- <el-form-item label="类型：">
                   <span>链接</span>
                 </el-form-item>-->
                <el-form-item label="分享内容：" prop="pushContent">
                  <el-input type="textarea" placeholder="这一刻，你想表达什么..." v-model="addform.pushContent"
                            style="width:85%;"></el-input>
                </el-form-item>

                <div>
                  <el-form-item label="链接标题：">
                    <el-input v-model="propsData.shareTitle" :disabled="true" style="width:85%;"></el-input>
                  </el-form-item>
                </div>

                <div>
                  <el-form-item label="链接地址：">
                    <el-input v-model="propsData.shareUrl" :disabled="true" style="width:85%;"></el-input>
                  </el-form-item>
                </div>

                <div v-if="propsData.resourcesPath">
                  <el-form-item label="链接图片：">
                    <div class="imgBox" :style="{background:'url('+ propsData.resourcesPath +') no-repeat 0 0 / 100% 100%'}">
<!--                      <img :src="propsData.resourcesPath"/>-->
                    </div>
                  </el-form-item>
                </div>

                <el-form-item label="自动评论：">
                  <el-input type="textarea" v-model="addform.autoContent" style="width:85%;"></el-input>

                </el-form-item>
                <el-form-item align="center" class="formBtn" style="margin-top:-5px;">
                  <el-button type="success" @click="saveSubmit('addform')">发表</el-button>
                </el-form-item>
              </el-form>

            </el-tab-pane>
          </el-tabs>

        </div>
      </template>
    </TableBox>
    <!-- 微信号弹窗 -->
    <div class="propBox" v-if="showNoWx">
      <div class="step_box">
        <span>选择微信号</span>

      </div>
      <div class="stepList_box">
        <div>
          <ul>
            <li v-for="item in wxShopList" :key="item.noWx">
              <!-- 多选 -->
              <input type="checkbox" :value="item.noWx" v-model="checkboxList"/>
              <!-- 单选 -->
              <!-- <label><input type="radio"  :value="item.noWx" name="1" v-model="noWxGm"/></label> -->
              <img class="headImg" :src="item.headAddress" alt="">
              <span class="flex_box">
                <p :class="{tips1: item.onlineFlag == 0}">{{item.wxNickname}}</p>
                <p class="tips1">{{item.onlineFlag == 0 ? '(离线)' : ''}}</p>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer1 cf">
        <input type="checkbox" v-model="checked" @click="checkedAll()"/>
        <span>全选</span>
        <span>已选：{{checkNumber}}</span>
        <span style="float:right;">
          <el-button @click="showNoWx = false" type="success" size="mini">取消</el-button>
          <el-button @click="sureNoWxGm()" type="success" size="mini">确定</el-button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import TableBox from '../core/TableBox'
  import MoreImgUpload from '../core/MoreImgUpload'

  export default {
    components: {
      TableBox,
      MoreImgUpload
    },
    props: {
      propsData: {}
    },
    data() {
      return {
        userInfo: this.$cfg.userInfo,
        nowSelectInfo: this.$cfg.nowSelectInfo,
        baseUrl: this.$cfg.userInfo.uploadUrl,
        isShowBox: false,
        showNoWx: false,
        activeName: 'second',
        addform: {
          noWx: '',
          pushContent: '',
          executeTime: '',
          delayTime: '',
          type: '3',
          autoContent: ''
        },
        rules: {
          noWx: [
            {required: true, message: '请选择微信号', trigger: 'blur'}
          ],
          delayTime: [
            {required: true, message: '请输入延迟时间', trigger: 'blur'}
          ],
          executeTime: [
            {required: true, message: '请选中执行时间', trigger: 'blur'}
          ]
        },
        wxShopList: [],
        noWxGm: '',
        checkboxList: [],
        checked: false,
        checkNumber: 0,
        limitNumber: 9,
        minExecuteTime: {
          disabledDate(time) {
            return time.getTime() < Date.now()
          }
        },
        steps: 0
      }
    },
    watch: {
      checkboxList: {
        handler: function (val, oldVal) {
          this.checkNumber = val.length
          if (this.checkboxList.length === this.wxShopList.length) {
            this.checked = true
          } else {
            this.checked = false
          }
          deep: true
        }
      }
    },
    mounted() {
      this.isShowBox = true
      this.addform.pushContent = this.propsData.shareDes
    },
    methods: {
      //选择微信号
      chooseNoWx() {
        this.showNoWx = true
        this.wxShopList = this.$cfg.serviceInfoOrigin
      },

      //确认选择
      sureNoWxGm() {
        if (this.checkNumber) {
          this.addform.noWx = this.checkboxList.join(',')
          this.showNoWx = false
        } else {
          this.$message({
            type: 'error',
            message: '请选择微信号！'
          })
        }
      },
      //发朋友圈
      saveSubmit(formName) {
        if (!this.addform.noWx) {
          this.$message({
            type: 'error',
            message: '请选择微信号'
          })
          return false
        }

        /*
        * {"noWxGm":"ljkj6485",
        * "memberNoGm":"40fc7136e05a469e9cf2977d468faeb4",
        * "merchantNo":"e96f64d736564a768c9ab9f23f4962df",
        * "noWxs":"ljkj6485",
        * "executeTime":"2019-09-09 17:54:35",
        * "type":"3",
        * "content":"",
        * "imgAddrs":"http://192.168.0.3/im/image/image/7abf71b8-9d23-4a16-93be-592f53d55520.jpg",
        * "autoContent":"",
        * "resourcePath":"https://start.firefoxchina.cn/",
        * "shareTitle":"你是风儿我是沙"}
        * */



        let params = {
          noWxs: this.addform.noWx,
          executeTime: this.addform.executeTime,
          type: this.addform.type,
          content: this.addform.pushContent,
          resourcePath: this.propsData.shareUrl,
          shareTitle: this.propsData.shareTitle,
          merchantNo: this.userInfo.memberNoMerchant,
          autoContent: this.addform.autoContent
        }
        if(this.propsData.resourcesPath) params.imgAddrs = this.propsData.resourcesPath
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http({
              method: 'post',
              url: '/api/imh5/sendfriendsjob/addSendFriendsJob.do',
              params: params
            }).then(res => {
              if (res.data.result == true && res.data.returnObject.result == 1) {
                this.$message({
                  type: 'success',
                  message: '新增朋友圈任务成功！'
                })
                this.checkboxList = []
                this.$refs[formName].resetFields()
                this.$emit('close')
              } else {
                this.$message.error(res.data.returnObject.msg)
              }
            })
          } else {
            return false
          }
        })
      },
      checkedAll() {
        if (this.checked) {
          this.checkboxList = []
        } else {
          this.checkboxList = []
          this.wxShopList.forEach((item) => {
            this.checkboxList.push(item.noWx)
          })
        }
        this.checkNumber = this.checkboxList.length
      },
      closeBox() {
        this.$emit('close')
      }
    }
  }
</script>

<style lang="less" scoped>
  .imgBox{
    width: 70px;
    height: 70px;
/*
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
*/
  }
  .trusteeship .formBtn /deep/ .el-form-item__content {
    margin-left: 0 !important;
  }

  .trusteeship /deep/ .el-tabs__nav-wrap::after {
    display: none;
  }

  .trusteeship /deep/ .el-tabs__active-bar {
    display: none;
  }

  .answer {
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tips {
    color: red;
    display: inline-block;
    width: 280px;
    height: 40px;
    line-height: normal;
    vertical-align: middle;
  }

  .propBox {
    z-index: 99999;
    width: 620px;
    height: 460px;
    position: absolute;
    position: relative;
    left: 50%;
    top: 50%;
    margin-left: -310px;
    margin-top: -740px;
    background-color: #fff;
    box-shadow: #3e3d3d 0 0 15px;

    .delete {
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

    .cursor {
      cursor: pointer;

      &:hover {
        color: #3a8ee6;
      }
    }

    .step_box {
      width: 100%;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #e2e2e2;
      padding-left: 20px;

      input {
        width: 400px;
        height: 38px;
        line-height: 38px;
        margin-left: 20px;
        text-indent: 20px;
        border-radius: 4px;
        border: 1px solid #d1d1d1;
      }

    }

    .stepList_box {
      width: 100%;
      height: 357px;
      padding: 10px 20px;
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

    .material_box {
      width: 100%;
      height: 357px;
      box-sizing: border-box;
      overflow: auto;

      ul.paddBox {
        padding: 0 20px;

        .ul_list {
          float: left;
          width: 85px;
          height: 100px;
          margin: 0 15px 15px 0;
          box-sizing: border-box;
          text-align: center;

          &:hover {
            cursor: pointer;
          }

          .img_item {
            width: 70px;
            height: 70px;
            display: inline-block;
            margin-bottom: 14px;
          }

          label {
            position: relative;
            top: 18px;
            right: 34px;
          }

          .iconwenjianjia {
            color: #ffcb05;
            margin-top: 20px;
          }

          .iconshipin2 {
            color: #3a8ee6;
          }

          .iconfont {
            font-size: 70px;
            margin-bottom: 10px;
            display: inline-block;
          }

          p {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
      }

      ul .ul_list_item {
        line-height: 50px;
        display: -webkit-box;
        flex: 1;
        border-bottom: 1px solid #e2e2e2;
        padding: 0 15px;
        vertical-align: middle;
        box-sizing: border-box;

        p {
          width: 92%;
          margin-left: 30px;
          display: flex;
          justify-content: space-between;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          .linkTitle {
            width: 50%;
            overflow: hidden;
          }

          .linkUrl {
            width: 45%;
            overflow: hidden;
            color: #409EFF;
          }
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

  .img_list {
    width: 30px;
    height: 30px;
  }

  .tips1 {
    color: red;
  }

  .noresult {
    text-align: center;
    margin-top: 20px;
    display: block;
  }

  .imgUrl_list {
    margin-right: 20px;
    display: inline-flex;
    flex-direction: column;

    &:hover {
      cursor: pointer;
    }

    span {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      width: 50px;
    }
  }

  .fail_case {
    width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }

  .MoreImgUpload .el-icon-plus {
    vertical-align: text-top;
  }

  .MoreImgUpload .el-icon-plus:before {
    width: 80px;
    height: 80px;
    display: inline-block;
    font-size: 60px;
    text-align: center;
    color: #797979;
  }

  .MoreImgUpload .el-upload-list__item:first-child, .MoreImgUpload .el-upload-list__item-name {
    width: 250px;
  }
</style>
