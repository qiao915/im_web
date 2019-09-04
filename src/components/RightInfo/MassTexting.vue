<!-- 群发 -->
<template >
  <div class="trusteeship massTexting">
    <TableBox :isShowBox="isShowBox" @closeBox="closeBox">
      <template slot="tableBox_top">
        <template slot="delete"></template>
      </template>
      <template slot="top_tab">
        <div class="keywords">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane name="first">
            <span slot="label" ><i class="el-icon-tickets"></i> 群发列表</span>
            <el-form :inline="true" class="demo-form-inline tableSearchForm">
              <el-form-item label="群发时间 :">
                  <el-date-picker v-model="params.beginTime" type="date" style="width:150px;" placeholder="开始日期" value-format="yyyy-MM-dd" :picker-options="maxTime"></el-date-picker>
                      <span>至</span>
                  <el-date-picker v-model="params.endTime" style="width:150px;" type="date" placeholder="结束日期" value-format="yyyy-MM-dd" :picker-options="minTime"></el-date-picker>
              </el-form-item>
                <el-form-item  label="群发内容：">
                    <el-input type="text" v-model="sendContent" style="width:150px;"></el-input>
                      <el-button type="success" @click="getsendRecordList()">查询</el-button>
                </el-form-item>
            </el-form>

            <el-table ref="multipleTable" :data="massTextingList" border tooltip-effect="dark"  stripe align="center" style="width: 100%">
              <el-table-column label="群发时间" prop="createDate" width="150px;"></el-table-column>
              <el-table-column label="微信终端" width="120px;">
                <template slot-scope="scope">
                  <span>{{scope.row.alias || scope.row.noWxGm}}</span>
                </template>
              </el-table-column>
              <el-table-column label="收信人" prop="memberNames">
                <template slot-scope="scope">
                  <el-tooltip placement="top-start" effect="light">
                    <div slot="content">{{scope.row.memberNames}}</div>
                    <span class="answer">{{scope.row.memberNames}}</span>
                  </el-tooltip>
                   <div :title="scope.row.memberNames"></div>
                </template>
              </el-table-column>
              <el-table-column label="群发内容">
                <template slot-scope="scope">
                  <span v-if="scope.row.type == 1">
                    <el-tooltip placement="top-start" effect="light">
                      <div slot="content">{{scope.row.content}}</div>
                      <span class="answer">{{scope.row.content}}</span>
                    </el-tooltip>
                  </span>
                  <span v-if="scope.row.type == 3">
                    <span v-for="item in (scope.row.resourcesPath)">
                      <img :src="item" width="30" height="30">
                    </span>
                  </span>
                  <span v-if="scope.row.type == 492">
                    <span>[链接]{{scope.row.content}}</span>
                  </span>
                  <span v-if="scope.row.type == 494">
                    <span>[小程序]{{scope.row.content}}</span>
                  </span>
                  <span v-if="scope.row.type == 42">
                    <span>[公众号]{{scope.row.content}}</span>
                  </span>
                  <span v-if="scope.row.type == 491">
                    <span>[优惠券]{{scope.row.content}}</span>
                  </span>
                </template>
              </el-table-column>
              <el-table-column align="center" fixed="right" label="操作" width="70">
                   <template slot-scope="scope">
                      <div class="">
                          <el-button type="text" style="color:#08A406;" size="mini" @click="sendAgain(scope.row)">重发</el-button>
                      </div>
                   </template>
               </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination class="u-pagination" @current-change="handleCurrentChange" :current-page.sync="pageNo" :page-size="pageSize" background layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
            </div>
          </el-tab-pane>

          <el-tab-pane name="second">
            <span slot="label" ><i class="el-icon-tickets"></i> 任务列表</span>
            <el-form :inline="true" class="demo-form-inline tableSearchForm">
              <el-form-item label="创建时间 :">
                  <el-date-picker v-model="params.beginTime" type="date" style="width:150px;" placeholder="开始日期" value-format="yyyy-MM-dd" :picker-options="maxTime"></el-date-picker>
                      <span>至</span>
                  <el-date-picker v-model="params.endTime" style="width:150px;" type="date" placeholder="结束日期" value-format="yyyy-MM-dd" :picker-options="minTime"></el-date-picker>
              </el-form-item>
              <el-form-item label="状态：">
                  <el-select v-model="jobStatus"  placeholder="请选择">
                      <el-option label="全部" value=""></el-option>
                      <el-option label="未执行" value="1"></el-option>
                      <el-option label="执行中" value="2"></el-option>
                      <el-option label="已完成" value="3"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="重复：">
                  <el-select v-model="jobRepetition"  placeholder="请选择">
                      <el-option label="全部" value=""></el-option>
                      <el-option label="永不" value="1"></el-option>
                      <el-option label="每小时" value="2"></el-option>
                      <el-option label="每天" value="3"></el-option>
                      <el-option label="每周" value="4"></el-option>
                      <el-option label="每月" value="5"></el-option>
                  </el-select>
              </el-form-item>
                <el-form-item  label="内容：">
                    <el-input type="text" v-model="jobContent" style="width:150px;"></el-input>
                      <el-button type="success" @click="getJobList()">查询</el-button>
                </el-form-item>
            </el-form>

            <el-table ref="multipleTable" :data="objList" border tooltip-effect="dark"  stripe align="center" style="width: 100%">
              <el-table-column label="创建时间" prop="createDate" width="150"></el-table-column>
              <el-table-column label="微信终端" prop="noWxGm" width="120">
                <template slot-scope="scope">
                  <span>{{scope.row.alias || scope.row.noWxGm}}</span>
                </template>
              </el-table-column>
              <el-table-column label="收信人" prop="memberNames">
                <template slot-scope="scope">
                  <el-tooltip placement="top-start" effect="light">
                    <div slot="content">{{scope.row.memberNames}}</div>
                    <span class="answer">{{scope.row.memberNames}}</span>
                  </el-tooltip>
                   <div :title="scope.row.memberNames"></div>
                </template>
              </el-table-column>

              <el-table-column label="群发内容">
                <template slot-scope="scope">
                  <span v-if="scope.row.type == 1">
                    <el-tooltip placement="top-start" effect="light">
                      <div slot="content">{{scope.row.content}}</div>
                      <span class="answer">{{scope.row.content}}</span>
                    </el-tooltip>
                    <img :src="scope.row.resourcesPath" width="30" height="30">
                  </span>
                  <!-- <span v-if="scope.row.type == 1">
                    <span v-for="item in (scope.row.resourcesPath)">
                      <img :src="item" width="30" height="30">
                    </span>
                  </span> -->
                  <span v-if="scope.row.type == 492">
                    <span>[链接]{{scope.row.shareTitle}}</span>
                    <p><a :href="scope.row.linkUrl" target="_blank">{{scope.row.shareUrl}}</a></p>
                    <img :src="scope.row.resourcesPath" width="30" height="30">
                  </span>
                  <span v-if="scope.row.type == 494">
                    <span>[小程序]{{scope.row.shareTitle}}</span>
                  </span>
                  <span v-if="scope.row.type == 42">
                    <span>[公众号]{{scope.row.shareTitle}}</span>
                  </span>
                  <span v-if="scope.row.type == 491">
                    <span>[优惠券]{{scope.row.content}}</span>
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="重复" width="80">
                <template slot-scope="scope">
                  <span v-if="scope.row.repetition == 1">永不</span>
                  <span v-if="scope.row.repetition == 2">每小时</span>
                  <span v-if="scope.row.repetition == 3">每天</span>
                  <span v-if="scope.row.repetition == 4">每周</span>
                  <span v-if="scope.row.repetition == 5">每月</span>
                </template>
              </el-table-column>
              <el-table-column label="状态" width="100">
                <template slot-scope="scope">
                  <span v-if="scope.row.status == 1">未执行</span>
                  <span v-if="scope.row.status == 2">执行中</span>
                  <span v-if="scope.row.status == 3">已完成</span>
                </template>
              </el-table-column>
              <el-table-column align="center" fixed="right" label="操作" width="70">
                   <template slot-scope="scope">
                      <span>
                        <el-button type="text" style="color:#08A406;" size="mini" @click="sendAgain(scope.row)">再发一条</el-button>
                      </span>
                      <span v-if="scope.row.status == 2">
                        <el-button type="text" style="color:#08A406;" size="mini" @click="stopJob(scope.row)">停止</el-button>
                      </span>
                   </template>
               </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination class="u-pagination" @current-change="handleCurrentChange" :current-page.sync="pageNo" :page-size="pageSize" background layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
            </div>
          </el-tab-pane>


          <el-tab-pane name="third">
            <span slot="label"><i class="el-icon-plus"></i> 新增群发</span>
              <el-form ref="form" :model="form" label-width="100px" label-position="left" style="">
                <el-form-item label="终端微信：" >
                  <el-input v-model="form.alias" disabled  style="width:60%;"></el-input>
                  <el-button type="success" @click="chooseWx()">选择</el-button>
                </el-form-item>
                <el-form-item label="收信人：" >
                  <el-input v-model="form.addressee" disabled  style="width:60%;"></el-input>
                  <el-button type="success" @click="chooseAddress()">选择</el-button>
                  <span class="tips">群发最多支持200人，超过200人会另行发一条</span>
                </el-form-item>
                <el-form-item label="群发时间：" prop="executeTime">
                  <el-date-picker v-model="form.executeTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间" style="width:60%;"  :picker-options="minExecuteTime">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="重复设置：">
                    <el-select v-model="form.setTime" placeholder="请选择" style="width:60%;">
                        <el-option label="永不" value="1"></el-option>
                        <el-option label="每小时" value="2"></el-option>
                        <el-option label="每天" value="3"></el-option>
                        <el-option label="每周" value="4"></el-option>
                        <el-option label="每月" value="5"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="群发类型：">
                    <el-select v-model="form.textType" placeholder="请选择"  style="width:60%;">
                        <el-option label="图文" value="1"></el-option>
                        <el-option label="链接" value="492"></el-option>
                        <el-option label="公众号" value="42"></el-option>
                        <el-option label="小程序" value="494"></el-option>
                        <el-option label="优惠券" value="491"></el-option>
                    </el-select>
                </el-form-item>

                <div v-if="form.textType == 1">
                  <el-form-item label="群发文字：">
                    <el-input type="textarea" v-model="form.massText" :autosize="{ minRows: 6}" style="width:60%;"></el-input>
                    <!-- <p style="color:red;">群发文字和图片必填一个</p> -->
                  </el-form-item>
                </div>

                <div v-if="form.textType == 492">
                  <el-form-item label="标题" class="heightAuto">
                    <el-input type="text" v-model="form.linkTitle" style="width:60%;"></el-input>
                  </el-form-item>
                  <el-form-item label="链接" class="heightAuto">
                    <el-input type="text" v-model="form.linkUrl" style="width:60%;"></el-input>
                  </el-form-item>
                </div>

                <div v-if="form.textType == 1 || form.textType == 492">
                  <el-form-item label="图片" class="heightAuto">
                    <MoreImgUpload :limitNumber="limitNumber" :file-list="fileList"/>
                      <!-- <span class="tips2">每次群发只能选择文字或图片</span> -->
                  </el-form-item>
                </div>

                <div v-if="form.textType == 42">
                  <el-form-item label="公众号：">
                    <el-input type="textarea" disabled v-model="form.publicAccount" :autosize="{ minRows: 6}" style="width:60%;"></el-input>
                    <el-button type="success" @click="choosePublicAccount()" style="vertical-align:top">选择</el-button>
                  </el-form-item>
                </div>

                <div v-if="form.textType == 494">
                  <el-form-item label="小程序：">
                    <el-input type="textarea" disabled v-model="form.applet" :autosize="{ minRows: 6}" style="width:60%;"></el-input>
                    <el-button type="success" @click="chooseApplet()" style="vertical-align:top">选择</el-button>
                  </el-form-item>
                </div>

                <div v-if="form.textType == 491">
                  <el-form-item label="优惠券：">
                    <el-input type="textarea" disabled v-model="form.coupon" :autosize="{ minRows: 6}" style="width:60%;"></el-input>
                    <el-button type="success" @click="chooseCoupon()" style="vertical-align:top">选择</el-button>
                  </el-form-item>
                </div>


                <el-form-item align="center">
                  <el-button type="success" @click="saveSubmit('form')">保存</el-button>
                  <el-button @click="closeBox()">取消</el-button>
                </el-form-item>
              </el-form>

          </el-tab-pane>
        </el-tabs>

      </div>
      </template>
    </TableBox>

    <!-- 弹窗 -->
    <div class="propBox" v-if="showNoWx">
      <div class="step_box" style="color:#333;">
        <span>选择微信号</span>
      </div>
      <div class="stepList_box">
        <div>
          <ul>
            <li v-for="item in wxShopList" :key="item.noWx">
               <label><input type="radio"  :value="item" name="1" v-model="noWxGm"/></label>
              <img class="headImg" :src="item.headAddress" alt="">
              <span class="flex_box">
                <p>{{item.wxNickname}}</p>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer1 cf">
        <span>已选：{{noWxGm.alias}}</span>
        <span style="float:right;">
          <el-button @click="showNoWx = false" type="success" size="mini">取消</el-button>
          <el-button @click="sureNoWxGm()" type="success" size="mini">确定</el-button>
        </span>
      </div>
    </div>

    <!-- 收信人 -->
    <div class="propBox" v-if="showAddress">
      <div class="step_box">
        <el-tabs @tab-click="changeVerbal" v-model="VerbalTrickActiveName">
          <el-tab-pane name="contacts" label="通讯录"></el-tab-pane>
          <el-tab-pane name="tags" label="标签"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="stepList_box">
        <div>
          <ul v-if="VerbalTrickActiveName == 'contacts'">
            <li v-for="item in memberData">
            <input type="checkbox" :value="item" v-model="checkboxList"/>
            <img class="headImg" :src="item.headAddress" alt="">
            <span class="flex_box">
              <p>{{item.memberName}}</p>
            </span>
            </li>
          </ul>
          <ul v-if="VerbalTrickActiveName == 'tags'">
            标签列表
          </ul>
        </div>
      </div>
      <div class="footer1 cf">
        <span class="quanxuan">
          <input type="checkbox" v-model="checked" @click="checkedAll()"/>
          <span>全选</span>
        </span>
        <span>已选：{{checkNumber}}</span>
        <span style="float:right;">
          <el-button @click="showAddress = false" type="success" size="mini">取消</el-button>
          <el-button @click="sureAddress()" type="success" size="mini">确定</el-button>
        </span>
      </div>
    </div>

    <!-- 公众号弹窗 -->
    <div class="propBox" v-if="showPublicAccount">
      <div class="step_box">
        <span>选择公众号</span>
      </div>
      <div class="stepList_box">
        <div>
          <ul>
            <li v-for="item in tencentList" :key="item.noWx">
               <label><input type="radio"  :value="item" name="1" v-model="checkAccountArr"/></label>
              <img class="headImg" :src="item.paLogo" alt="">
              <span class="flex_box">
                <p>{{item.paName}}</p>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer1 cf">
        <span>已选：{{checkAccountArr.paName}}</span>
        <span style="float:right;">
          <el-button @click="showPublicAccount = false" type="success" size="mini">取消</el-button>
          <el-button @click="savePublicAccount()" type="success" size="mini">确定</el-button>
        </span>
      </div>
    </div>

    <!-- 小程序弹窗 -->
    <div class="propBox" v-if="showApplet">
      <div class="step_box">
        <span>选择小程序</span>
      </div>
      <div class="stepList_box">
        <div>
          <ul>
            <li v-for="item in appletList" :key="item.noWx">
               <label><input type="radio"  :value="item" name="1" v-model="checkAppletArr"/></label>
              <img class="headImg" :src="item.spLogo" alt="">
              <span class="flex_box">
                <p>{{item.spName}}</p>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer1 cf">
        <span>已选：{{checkAppletArr.spName}}</span>
        <span style="float:right;">
          <el-button @click="showApplet = false" type="success" size="mini">取消</el-button>
          <el-button @click="saveApplet()" type="success" size="mini">确定</el-button>
        </span>
      </div>
    </div>

    <!-- 优惠券弹窗 -->
    <div class="propBox" v-if="showCoupon">
      <div class="step_box">
        <span>选择优惠券</span>
      </div>
      <div class="stepList_box">
        <div>
          <ul>
            <li v-for="item in couponList" :key="item.noWx">
               <label><input type="radio"  :value="item" name="1" v-model="checkCouponArr"/></label>
              <!-- <img class="headImg" :src="item.spLogo" alt=""> -->
              <span class="flex_box" style="margin-left:20px;">
                <p>{{item.couponName}}</p>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer1 cf">
        <span>已选：{{checkCouponArr.couponName}}</span>
        <span style="float:right;">
          <el-button @click="showCoupon = false" type="success" size="mini">取消</el-button>
          <el-button @click="saveCoupon()" type="success" size="mini">确定</el-button>
        </span>
      </div>
    </div>


  </div>
</template>

<script>
import {parseTime} from '@/utils'
import TableBox from '../core/TableBox'
import MoreImgUpload from '../core/MoreImgUpload'

export default {
  components:{
    TableBox,
    MoreImgUpload
  },
  data(){
    let that = this
    return{
      userInfo:this.$cfg.userInfo,
      limitNumber: 3,
      showNoWx:false,  //微信号弹窗
      showAddress:false,//联系人弹窗
      isShowBox: false,
      activeName: 'first',
      form: {
        alias:'',
        noWx:'',
        executeTime: '',
        setTime: '',
        textType: '1',
        addressee: '',
        massText: '',
        linkTitle: '',
        linkUrl: '',
        publicAccount: '',
        applet: '',
        coupon: ''
       },
     massTextingList: [],
     wxShopList:[],   //微信号列表
     noWxGm:{},   //选择的微信号
     checked: false, //重置全选按钮

     memberData:[],  //客户列表
     checkboxList:[], //选中数组
     checkNumber: 0,

     memberNos:[],  //客户编号
     memberNames:[],//客户名称
     memberNoWxs:[],//客户微信号
     fileList:[],   //图片地址合集
     pageSize: 10, // 每页默认10条数据
     total: 0,    // 总数
     pageNo: 1,  // 当前页默认为第一页
     sendContent:'',

     params:{
         beginTime:"",
         endTime:"",
     },
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
       //执行时间限制 大于当前时间
       minExecuteTime:{
         disabledDate(time) {
              return time.getTime() < Date.now()
          }
       },
       showPublicAccount: false,
       showApplet: false,
       showCoupon: false,
       tencentList: [], //公众号列表
       appletList: [], //小程序列表
       couponList: [],  //优惠券列表
       checkAccountArr: [], //选择的公众号
       checkAccountCode: [],//选择公众号code
       checkAppletArr: [],  //选择的小程序
       checkAppletCode: [],//选择的公众号code
       checkCouponArr: [],  //选择的优惠券
       checkCouponCode: [],//选择的优惠券code
       objList: [],
       jobContent: '',
       jobStatus: '',
       jobRepetition: '',
       VerbalTrickActiveName: 'contacts',

    }
  },

  watch:{
    checkboxList:{
      handler:function(val,oldVal){
        this.checkNumber = val.length
        if(this.checkboxList.length === this.memberData.length){
          this.checked = true
        }else{
          this.checked = false
        }
        deep: true
      }
    },

  },
  mounted(){
    this.isShowBox = true
    this.getsendRecordList()
  },
  methods:{
    //获取群发列表
    getsendRecordList(){
      this.$http({
        method:'post',
        url:'/api/imh5/batchSendMessage/getBatchSendRecordList.do',
        params:{
          content: this.sendContent,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          startTime: this.params.beginTime,
          endTime: this.params.endTime,
          merchantNo: this.userInfo.memberNoMerchant,
          merchantName: this.userInfo.memberNameMerchant,
        }
      }).then(res=>{
        if(res.data.result == true){
          let data = res.data.returnObject
           if(data && data.rows){
             //时间倒叙
             // data.rows.sort(function (a, b) {
             //   let aTimeString = a.createDate
             //   let bTimeString = b.createDate
             //
             //   let aTime = new Date(aTimeString).getTime()
             //   let bTime = new Date(bTimeString).getTime()
             //
             //   return  bTime - aTime
             // });
             data.rows.forEach( (item) =>{
               if (item.resourcesPath) {
                 item.resourcesPath = item.resourcesPath.split(',')
               }
             })
           }
          this.massTextingList = data.rows
        //  console.log(this.massTextingList)
          this.total = data.total
        }else{
          this.$message.error(res.data.errorMessage)
        }
      //  console.log(res)
      })
    },

    //再发一条
    sendAgain(items){

      this.$http({
        method:'post',
        url:'/api/imh5/batchSendMessage/sendChatMessage.do',
        params:{
          code:items.code
        }
      }).then(res=>{
        //console.log(res)
        if(res.data.result === true){
          this.$message({
            type:'success',
            message:'群发成功',
            duration: 1000,
          })
        }else{
          this.$message({
            type:'error',
            message:res.data.returnObject.message,
            duration: 1000,
          })
        }
      })
    //  console.log(items)
    },
    //选择微信号
    chooseWx(){
      this.showNoWx = true
      this.wxShopList = this.$cfg.serviceInfoOrigin
    },

    //确认选择微信号
    sureNoWxGm(){
      let arr = Object.keys(this.noWxGm)
      if(arr.length == 0){
        this.$message({
          type:'error',
          message:'请选择微信号！'
        })
      }else{
        this.form.alias = this.noWxGm.alias || this.noWxGm.noWx
        this.form.noWx = this.noWxGm.noWx
        this.showNoWx = false
        //改变终端微信，清空收信人
        this.checkboxList = []
        this.memberNos = []
        this.memberNames = []
        this.memberNoWxs = []
        this.form.addressee = ''
      }
    },
    //确认选择收信人
    sureAddress(){
      if(this.checkboxList == 0){
        this.$message({
          type:'error',
          message:'请选择收信人！'
        })
      }else{
        this.checkboxList.forEach( item=>{
          this.memberNos.push(item.memberNo)
          this.memberNames.push(item.memberName)
          this.memberNoWxs.push(item.noWx)
        })
        this.memberNos = Array.from(new Set(this.memberNos))
        this.memberNames = Array.from(new Set(this.memberNames))
        this.memberNoWxs = Array.from(new Set(this.memberNoWxs))

        this.form.addressee = this.memberNames.join(',')
        this.showAddress = false

      }

    },
    //弹出收信人
    chooseAddress(){
      this.memberData = []
      if(this.form.noWx == ''){
        this.$message({
          type:'error',
          message:'请选择微信终端'
        })
        return false
      }
      this.showAddress = true
      this.getCustomer();
    },

    //弹出公众号列表
    choosePublicAccount () {
        this.showPublicAccount = true
        this.getTencentList()
    },

    //确认选择公众号
    savePublicAccount () {
      console.log(this.checkAccountArr)
      this.form.publicAccount = this.checkAccountArr.paName
      this.checkAccountCode = this.checkAccountArr.code
      this.showPublicAccount = false
    },

    //弹出小程序
    chooseApplet () {
      this.showApplet = true
      this.getAppletList()
    },

    //确认选择小程序
    saveApplet () {
      console.log(this.checkAppletArr)
      this.form.applet = this.checkAppletArr.spName
      this.checkAppletCode = this.checkAppletArr.code
      this.showApplet = false
    },

    //弹出优惠券
    chooseCoupon () {
      this.showCoupon = true
      this.getCouponList()
    },

    //确认选择优惠券
    saveCoupon () {
      console.log(this.checkCouponArr)
      this.form.coupon = this.checkCouponArr.couponName
      this.checkCouponCode = this.checkCouponArr.couponNo
      this.showCoupon = false
    },

    //新增群发
    saveSubmit(formName) {

      if(this.form.noWx == ''){
        this.$message.error('请选择微信终端')
        return false
      }

      if(this.memberNames.length <= 0){
        this.$message.error('请选择收信人')
        return false
      }
      if(!this.form.executeTime){
        this.$message.error('请选择群发时间')
        return false
      }

      if(!this.form.setTime){
        this.$message.error('请选择重复设置')
        return false
      }

      if(this.form.textType == 1){
        if(this.form.massText == '' && this.fileList.length <= 0){
          this.$message({
            type:'error',
            message:'群发文字或图片不能为空'
          })
          return false
        }
      }

      let mediasUrl = this.fileList.map(item => {
        return item.url
      }).join(',')
       // console.log(mediasUrl)

      if(this.form.textType == 492){
        if(!this.form.linkTitle){
          this.$message.error('请选择链接标题')
          return false
        }
        if(!this.form.linkUrl){
          this.$message.error('请选择链接地址')
          return false
        }
        if(mediasUrl.includes(',')){
          this.$message.error('链接图片最多一张')
          return false
        }
      }

      let params;
      params={
        merchantNo: this.userInfo.memberNoMerchant,
        merchantName: this.userInfo.memberNameMerchant,
        noWxGm:this.form.noWx,
        memberNos: this.memberNos.join(','),			//	客户编号
        memberNames:	this.memberNames.join(','),	//	客户名称
        memberNoWxs:  this.memberNoWxs.join(','),			//	客户微信号
        content:this.form.massText,
        type: this.form.textType,
        resourcesPath: mediasUrl,
        repetition: this.form.setTime,
        sendDate: this.form.executeTime,
      }
      if(this.form.textType == 42) {
        params.sourceCode = this.checkAccountCode
      }
      if(this.form.textType == 494) {
        params.sourceCode = this.checkAppletCode
      }
      if(this.form.textType == 491) {
        params.sourceCode = this.checkCouponCode
      }
      if(this.form.textType == 492) {
        params.shareTitle = this.form.linkTitle
      }
      if(this.form.textType == 492) {
        params.shareUrl = this.form.linkUrl
      }
      console.log(params)
      this.$http({
        method:'post',
        url:'/api/imh5/batchSendMessage/addBatchSendJob.do',
        params:params
      }).then(res=>{
      //  console.log(res)
        if(res.data.result === true){
          this.$message({
            type:'success',
            message:"新增任务成功"
          })
          this.fileList = []
          this.$refs[formName].resetFields()
          this.form.alias = ''
          this.form.noWx = ''
          this.form.addressee = ''
          this.form.massText = ''
          this.activeName = 'second'
          this.checkboxList = []
          this.noWxGm = {}
          this.memberNos = []
          this.memberNames = []
          this.memberNoWxs = []
          this.getJobList()

        }else{
          this.$message({
            type:'error',
            message:res.data.errorMessage || '新增任务失败'
          })
        }

      })
    },

    // 获取客户列表
    getCustomer(){
     var startIndex = 0;
     let user = this.$cfg.userInfo;
     let flag = this.$cfg.userInfo.adminUserId

     this.$http({
         type: 'get',
         url: '/api/im/contacts/findFriends.do',
         params: {
          adminUserId: flag,
           merchantNo: user.memberNoMerchant, //mast,商户编号
           noWxGm: this.form.noWx, //mast,门店编号
           version: '1',
           start: '', //起始行
           sortBy: startIndex,
           limit: 9999999,
         }
     }).then((res)=>{
        //console.log(res)
       if(res.status == '200' && res.data.result){
         this.$store.commit('CONTACT_MY_CUSTOMER', res.data.returnObject.rows);
         this.memberData = res.data.returnObject.rows
       }

     }).catch((error)=>{

     });
   },

   //获取公众号列表
   getTencentList(){
     this.$http.post('/api/imh5/publicaccount/list',{
       pageNo: 1,
       pageSize: 99999,
       status: 1,
       paName: '',
       merchantNo: this.userInfo.memberNoMerchant
     }).then(res=>{
       if(res.data.result && res.data.returnObject.page.rows){
         this.tencentList = res.data.returnObject.page.rows
       }
     })
   },

   //获取小程序列表
   getAppletList(){
     this.$http.post('/api/imh5/smallprogram/list',{
       pageNo: 1,
       pageSize: 99999,
       status: 1, //1已收藏  0未收藏
       paName: '', //搜索名称
       merchantNo: this.userInfo.memberNoMerchant
     }).then(res=>{
       if(res.data.result) {
         let list = res.data.returnObject.dataMap.page.rows
         if(list) {
           this.appletList = res.data.returnObject.dataMap.page.rows
         }

       }
     })
   },

   //获取优惠券列表
   getCouponList () {
     this.$http.post('/api/coupon/findCouponList.do',{
       couponStatus : 'UNUSED',
       merchantNo: this.userInfo.memberNoMerchant,
     }).then(res=>{
       if(res.data.result) {
         let list = res.data.returnObject
         if(list) {
           this.couponList = res.data.returnObject
         }

       }
     })
   },

   //任务列表
   getJobList () {
     let params = {
       pageNo: this.pageNo,
       pageSize: this.pageSize,
       merchantNo: this.userInfo.memberNoMerchant,
       status: this.jobStatus,
       repetition: this.jobRepetition,
       content: this.jobContent,
       startTime: this.params.beginTime,
       endTime: this.params.endTime
     }
     this.$http.post('/api/imh5/batchSendMessage/batchSendJobList.do',params).then(res=>{
       if (res.data.result) {
         this.objList = res.data.returnObject.rows
         this.total = res.data.returnObject.total
       } else {
         this.$message.error(res.data.errorMessage)
       }
     })
   },

   //停止任务
   stopJob (item) {

   },

    //全选
    checkedAll(){
      if(this.checked){
        this.checkboxList =[]
      }else{
        this.checkboxList = []
        this.memberData.forEach( (item) => {
          this.checkboxList.push(item)
        })
      }
      this.checkNumber = this.checkboxList.length
    },

    //分页
    handleCurrentChange(val){
      this.massTextingList = []//清空表单
      this.pageNo = val;
      this.getsendRecordList()
    },
    handleClick(tab,event){
      this.pageNo = 1
      this.params.beginTime = ''
      this.params.endTime = ''
      if(tab.name == 'first') {
         // this.getsendRecordList()
      } else if(tab.name == 'second') {
         this.getJobList()
      }
    },
    closeBox(){
      this.$emit('close')
    },

    changeVerbal (tab, event) {
      if(this.VerbalTrickActiveName == 'contacts'){
        // this.getCustomer()
      } else {
        //标签

      }
    },


  },
}
</script>

<style lang="less" scoped>
.answer{
  cursor: pointer;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.tips{
  color: red;
  display: inline-block;
  width: 170px;
  height: 40px;
  line-height: normal;
  vertical-align: middle;
}
.tips2{
    color: red;
    position: absolute;
    left: 130px;
    top: 23px;
    display: contents;
}
.propBox{
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

    input{
      width: 400px;
      height: 38px;
      line-height: 38px;
      margin-left: 20px;
      text-indent: 20px;
      border-radius: 4px;
      border: 1px solid #d1d1d1;
    }

  }
  .stepList_box{
    width: 100%;
    height: 357px;
    padding:10px 20px;
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

</style>
