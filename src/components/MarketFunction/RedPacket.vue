<!-- 群发 -->
<template >
  <div class="trusteeship massTexting RedPacket">
    <TableBox :isShowBox="isShowBox" @closeBox="closeBox">
      <template slot="tableBox_top">
        <template slot="delete"></template>
      </template>
      <template slot="top_tab">
        <div class="keywords">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <!-- <el-tab-pane name="first">
            <span slot="label" ><i class="el-icon-tickets"></i>批量发红包</span>
            <el-form ref="addform" :model="addform" :rules="rules" label-width="110px" label-position="left" style="">
              <el-form-item label="微信号：" prop="keyword">
                <el-input v-model="addform.keyword" :disabled="true" style="width:85%;"></el-input>
                <el-button type="success">选择</el-button>
              </el-form-item>
              <el-form-item label="发送对象：" prop="keyword">
                <el-input v-model="addform.keyword" :disabled="true" style="width:85%;"></el-input>
                <el-button type="success">选择</el-button>
              </el-form-item>
              <el-form-item label="单个红包金额:" prop="keyword">
                <el-input v-model="addform.keyword" style="width:50%;">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
              <el-form-item label="红包备注：" prop="pushContent" >
                <el-input type="textarea" v-model="addform.pushContent" placeholder="恭喜发财，大吉大利"  style="width:50%;"></el-input>
                <p style="color:red;">已选客户(<span>{{num}}</span>)人，红包总金额(<span>{{money}}</span>)元</p>
              </el-form-item>
              <el-form-item label="延迟时间：">
                  <el-input v-model="addform.title" style="width:50%;"></el-input>
                  <span class="tips">单位:时间。执行任务随机按照这个时间范围内延迟处理:最小延迟时间不低于60分钟。</span>
              </el-form-item>
              <el-form-item label="执行时间：">
                <el-date-picker v-model="addform.delayTime" type="datetime" placeholder="选择日期时间" style="width:50%;" default-time="12:00:00">
                </el-date-picker>
              </el-form-item>
              <el-form-item align="center" style="margin-top:50px;">
                <el-button type="success" @click="saveSubmit('form')">发送</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane> -->

          <!-- <el-tab-pane name="second">
            <span slot="label"><i class="el-icon-plus"></i> 新客户红包</span>
              <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-position="left" style="">
                <el-form-item label="微信号：" prop="keyword">
                  <el-input v-model="addform.keyword" :disabled="true" style="width:85%;"></el-input>
                  <el-button type="success">选择</el-button>
                </el-form-item>
                <el-form-item label="发红包条件:">
                    <el-select v-model="addform.type" placeholder="请选择" style="width:60%;">
                        <el-option label="话术、问候语" value="1"></el-option>
                        <el-option label="图片" value="2"></el-option>
                        <el-option label="名片" value="3"></el-option>
                        <el-option label="分享" value="4"></el-option>
                        <el-option label="公众号" value="5"></el-option>
                        <el-option label="小程序" value="6"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="随机红包：" prop="keyword">
                  <el-input v-model="addform.keyword" style="width:25%;"></el-input>
                  <span style="margin: 0 20px;">至</span>
                  <el-input v-model="addform.keyword" style="width:25%;"></el-input>
                    <span>元</span>
                </el-form-item>
                <el-form-item label="红包备注：" prop="pushContent" >
                  <el-input type="textarea" v-model="addform.pushContent" placeholder="恭喜发财，大吉大利"  style="width:60%;"></el-input>
                </el-form-item>
                <el-form-item label="执行时间：">
                  <el-date-picker v-model="addform.delayTime" type="datetime" placeholder="选择日期时间" style="width:60%;" default-time="12:00:00">
                  </el-date-picker>
                </el-form-item>
                <el-form-item align="center" style="margin-top:50px;">
                  <el-button type="success" @click="saveSubmit('form')">发送</el-button>
                </el-form-item>
              </el-form>
          </el-tab-pane> -->

          <el-tab-pane name="third">
            <span slot="label" ><i class="el-icon-time"></i>红包记录</span>
            <el-form :inline="true" class="demo-form-inline redList">
              <el-form-item label="时间 :">
                  <el-date-picker v-model="params.beginTime" type="date" placeholder="开始日期" value-format="yyyy-MM-dd" :picker-options="maxTime"></el-date-picker>
                      <span>至</span>
                  <el-date-picker v-model="params.endTime" type="date" placeholder="结束日期" value-format="yyyy-MM-dd" :picker-options="minTime"></el-date-picker>
              </el-form-item>
                <el-form-item  label="微信：">
                    <el-input type="text" v-model="params.noWxShop"></el-input>
                </el-form-item>
                <el-button type="success" @click="getRedPacketRecord()">查询</el-button>
            </el-form>
            <p>
              发送红包总数：&nbsp;<span class="red">{{totalSend}}个</span>&nbsp;&nbsp;
              <!-- 发送红包总额&nbsp;<span class="red">{{successMoney}}个</span>&nbsp;&nbsp; -->
              成功发送红包：&nbsp;<span class="red">{{getInNum}}个</span>&nbsp;&nbsp;
              失败发送红包：&nbsp;<span class="red">{{failNum}}个</span>&nbsp;&nbsp;
              已被领取：&nbsp;<span class="red">{{getInNum}}个</span>&nbsp;&nbsp;
              已被领取：&nbsp;<span class="red">{{transMon(getInTotalMoney)}}元</span>&nbsp;&nbsp;
            </p>
            <p>
              收红包总数：&nbsp;<span class="red">{{succNum}}个</span>&nbsp;&nbsp;
              成功收取红包：&nbsp;<span class="red">{{transMon(succNum)}}元</span>&nbsp;&nbsp;
              失败收取红包：&nbsp;<span class="red">{{ failReceiveNum}}个</span>&nbsp;&nbsp;
              已领取&nbsp;<span class="red">{{transMon(totalMoney)}}元</span>&nbsp;&nbsp;

            </p>
            <el-table ref="multipleTable" :data="recordData" tooltip-effect="dark" border stripe align="center" style="width: 100%">
              <el-table-column label="终端微信" prop="noWxShop" align="center" width="120"></el-table-column>
              <el-table-column label="客户昵称" align="center" width="120">
                <template slot-scope="scope">
                  <span>{{scope.row.memberName || scope.row.noWx}}</span>
                </template>
              </el-table-column>
              <el-table-column label="红包方式" align="center"  width="120;">
                <template slot-scope="scope">
                    <span v-if="scope.row.type == 1 || scope.row.type == 0">任务红包</span>
                    <span v-if="scope.row.type == 2 ">加好友红包</span>
                    <span v-if="scope.row.type == 8 ">收取红包</span>
                    <span v-if="scope.row.type == 9 ">收取转账</span>
                </template>
              </el-table-column>
              <el-table-column label="红包金额" prop="strAmount" align="center"  width="120">
                <template slot-scope="scope">
                    <span v-if="scope.row.type == 1 || scope.row.type == 0 || scope.row.type == 2 " class="color_red">
                      -{{scope.row.strAmount}}
                    </span>
                    <span v-if="scope.row.type == 8 || scope.row.type == 9" class="color_green">
                      +{{scope.row.strAmount}}
                    </span>
                </template>
              </el-table-column>
              <el-table-column label="时间" prop="sendDate" align="center" width="160px;">
                <!-- <template slot-scope="scope">
                    <span v-if="scope.row.type == 1 ">{{scope.row.sendDate}}</span>
                    <span v-if="scope.row.type == 2 ">{{scope.row.receiveDate}}</span>
                </template> -->
              </el-table-column>
              <el-table-column label="状态" align="center" width="100px;">
                <template slot-scope="scope">
                  <span v-if="scope.row.status == '0' ">未发送</span>
                  <span v-if="scope.row.status == '1' ">发送中</span>
                  <span v-if="scope.row.status == '2' ">发送成功</span>
                  <span v-if="scope.row.status == '3' ">发送失败</span>
                  <span v-if="scope.row.status == '4' ">已领取</span>
                  <span v-if="scope.row.status == '5' ">已退回</span>
                </template>
              </el-table-column>
              <el-table-column label="失败原因" align="center" >
                <template slot-scope="scope">
                  <span class="fail_case" :title="scope.row.errorMsg">{{scope.row.errorMsg}}</span>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination class="u-pagination"
                @current-change="handleCurrentChange"
                :current-page.sync="pageNo"
                :page-size="pageSize"
                :total="total"
                background layout="total, prev, pager, next, jumper">
              </el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>

      </div>
      </template>

    </TableBox>
  </div>
</template>

<script>
import {parseTime} from '@/utils'
import TableBox from '../core/TableBox'
import OssUpload from '@/components/core/OssUpload'
export default {
  components:{
    TableBox,
    OssUpload
  },
  data(){
    let that = this
    return{
      userInfo:this.$cfg.userInfo,
      isShowBox: false,
      activeName: 'third',
      form: {
       keyword: '',
       answerContent: '',
       picUrl: '',
     },
     rules:{
       keyword: [
          { required: true, message: '请输入关键词', trigger: 'blur' },
        ],
     },
     recordData: [],
     pageSize: 10,                               // 每页默认10条数据
     total: 0,                                   // 总数
     pageNo: 1,                                  // 当前页默认为第一页
     addform:{
       time: '',
       type: '',
       pushContent: '',
       picUrl: '',
       card: '',
       title: '',
       desc: '',
       link: '',
       img: '',
       gongzhonghao: '',
       applet: '',
       delayTime: '',
     },
     num: '20',
     money: '100',
     params:{
         beginTime:"",
         endTime:"",
         noWxShop:'',
     },
     totalSend: 0,//发送红包总数
     getInNum: 0, //成功发送红包
     failNum: 0, //失败发送红包
     getInTotalMoney: 0, // 已领取金额
     succNum: 0,  //收红包总数：
     failReceiveNum: 0, //失败收取红包
     totalMoney: 0,     //已领取


     maxTime: { // 限制最大时间
         disabledDate(time) {
           if (that.params.endTime) {
             return time.getTime() > new Date(that.params.endTime).getTime()
           }
           return time.getTime() > Date.now()
         }
       },
       minTime: { // 限制最小时间
       disabledDate(time) {
           if (that.params.beginTime) {
               let a = parseTime(time.getTime(), '{y}-{m}-{d}')
               return time.getTime() > Date.now() || a < that.params.beginTime
           }
               return time.getTime() > Date.now()
           }
       },
    }
  },
  mounted(){
    this.isShowBox = true
    this.getRedPacketRecord()
  },
  methods:{
    //获取红包记录列表
    getRedPacketRecord(){
      this.$http({
        method:'post',
        url:'/api/imh5/redPackets/getRedRecordList',
        params:{
          pageNo:this.pageNo,
          pageSize: this.pageSize,
          startTime:this.params.beginTime,
          endTime:this.params.endTime,
          noWxShop:this.params.noWxShop,
          merchantNo:this.userInfo.memberNoMerchant
        }
      }).then(res=>{
        if(res.data.result == true && res.data.returnObject.success == true){
          let data = res.data.returnObject
          this.recordData = data.data.rows
          this.total = data.data.total

          this.totalSend = data.totalSend
          this.getInNum = data.getInNum
          this.failNum = data.failNum
          this.getInTotalMoney = data.getInTotalMoney
          this.succNum = data.succNum
          this.failReceiveNum = data.failReceiveNum
          this.totalMoney = data.totalMoney
        }
      })
    },

    transMon (e){
        if(e){
          e = e / 100
        }
        return e
    },

    //修改关键词
    aditKeywords(items){
    //  console.log(items)
      this.activeName = 'second'
      this.form.keyword = items.keyText
      this.form.answerContent = items.answer

    },
    //新增关键词
    saveSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //分页
    handleCurrentChange(val){
      this.recordData = []//清空表单
      this.pageNo = val;
      this.getRedPacketRecord()
    },
    goBack(formName){
      this.activeName = 'first'
      this.$refs[formName].resetFields();
    },
    handleClick(tab,event){
    //  console.log(tab,event)
    },
    closeBox(){
      this.$emit('close')
    },
  },
}
</script>

<style lang="less" scoped>
.red{
  color: red;
  font-size: 16px;
  margin-right: 30px;
}
.tips{
  color: red;
  display: inline-block;
  width: 300px;
  height: 40px;
  line-height: normal;
  vertical-align: middle;
}
.tips2{
    color: red;
    position: absolute;
    left: 130px;
    top: 23px;
}
.color_red{
  color: red;
    font-size: 14px;
}
.color_green{
  color: #3cde0a;

}
.fail_case{
  width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
</style>
