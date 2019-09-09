<!-- 发朋友圈 -->
<template >
  <div class="trusteeship circleFriends">
    <TableBox :isShowBox="isShowBox" @closeBox="closeBox">
      <template slot="tableBox_top">
        <template slot="delete"></template>
      </template>
      <template slot="top_tab">
        <div class="keywords">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane name="first">
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
          </el-tab-pane>

          <el-tab-pane name="second">
            <span slot="label"><i class="el-icon-plus"></i> 发朋友圈</span>
            <el-form ref="addform" :model="addform" :rules="rules" label-width="110px" label-position="left" style="">
              <el-form-item label="微信号：" prop="noWx">
                <el-input v-model="addform.noWx" :disabled="true" style="width:85%;"></el-input>
                <el-button type="success" @click="chooseNoWx()">选择</el-button>
              </el-form-item>
              <!-- <el-form-item label="延迟时间：" prop="delayTime">
                  <el-input v-model="addform.delayTime" style="width:50%;"></el-input>
                  <span class="tips">单位:时间。执行任务随机按照这个时间范围内延迟处理:最小延迟时间不低于60分钟。</span>
              </el-form-item> -->
              <el-form-item label="执行时间：" prop="executeTime">
                <el-date-picker v-model="addform.executeTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间" style="width:85%;"  :picker-options="minExecuteTime">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="类型：">
                  <el-select v-model="addform.type" placeholder="请选择">
                      <el-option label="纯文字" value="4"></el-option>
                      <el-option label="图文" value="1"></el-option>
                      <el-option label="视频" value="2"></el-option>
                      <el-option label="文章链接" value="3"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="分享内容：" prop="pushContent" >
                <el-input type="textarea" placeholder="这一刻，你想表达什么..." v-model="addform.pushContent" style="width:85%;"></el-input>
                <span v-if="addform.type == 1 || addform.type == 4">
                  <el-button style="vertical-align:top" type="success" @click="chooseMaterial(true)">文本素材</el-button>
                </span>
              </el-form-item>
              <el-form-item label="素材库：" prop="pushContent" v-if="addform.type != 4">
                <el-button type="success" @click="chooseMaterial(false)">选择</el-button>
                <span class="imgUrl_list" v-for="(item, index) in material_picture" :key="index" :title="item.photoName">
                  <img :src="returnUrl(item.smallPhotoLocation)" width="50" height="50">
                  <span>{{item.photoName}}</span>
                </span>
                <el-button type="success" v-if="material_picture.length" @click="material_picture = []">清空</el-button>
              </el-form-item>
              <div v-if="addform.type == 1">
                <el-form-item label="分享图片：" >
                  <MoreImgUpload ref="imguplode" :limitNumber="limitNumber" :file-list="fileList"/>
                </el-form-item>
              </div>
              <div v-if="addform.type == 2">
                <el-form-item label="分享视频：" >
                  <span class="MoreImgUpload">
                    <el-upload
                    ref="upVideo"
                      class="upload-demo"
                      action="/api/im/chat/uploadFileFromWeb.do"
                      multiple
                      accept=".mp4"
                      :beforeUpload="beforeAvatarUpload"
                      :file-list="fileList"
                      :http-request="uploadVideo"
                      :auto-upload="true"
                      :on-remove="handleRemove"
                      :limit="limitVideo"
                      :on-exceed="exceedNum">
                      <i class="el-icon-plus"></i><span class="tips1">视频时间最长10秒</span>
                  </el-upload>

                </span>
                <div v-if="preVideoUrl && preVideoUrl.length > 0">
                  <video :src="preVideoUrl" controls="controls" width="200" height="300" id="videoPlayer"></video>
                </div>
                </el-form-item>
              </div>
              <div v-if="addform.type == 3">
                <el-form-item label="链接地址：" prop="linkUrl" >
                  <el-input v-model="addform.linkUrl" style="width:85%;"></el-input>
                </el-form-item>
              </div>
              <el-form-item label="自动评论：" >
                <el-input type="textarea" v-model="addform.autoContent" style="width:85%;"></el-input>

              </el-form-item>
              <el-form-item align="center" style="margin-top:-5px;">
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
                <p  :class="{tips1: item.onlineFlag == 0}">{{item.wxNickname}}</p>
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

    <!--素材弹窗  -->
    <div class="propBox" v-if="showMaterial">
      <div class="step_box">
        <span v-if="steps == 0">{{materialName}}</span>
        <span v-if="steps != 0" @click="returnPrev()" class="cursor">返回</span>
        <span class="delete" @click="showMaterial = false"></span>
      </div>
      <div class="material_box">
          <!--视频库  -->
          <ul v-if="materialType == 1" class="paddBox">
            <li class="ul_list" v-for="(item, index) in materialVideoArr"
             @click="checkMaterialVideo_Detail(item)">
             <span v-if="item.folderName">
               <i class="iconfont iconwenjianjia"></i>
               <p>{{item.folderName}}</p>
             </span>
            <span  v-if="!item.folderName">
              <label ><input type="radio"  :value="item" v-model="material_video"/></label>
              <img :src="returnUrl(item.firstView)"  class="img_item">
              <!-- <i class="iconfont iconshipin2"></i> -->
              <p>{{item.videoName}}</p>
            </span>
            </li>
            <span class="noresult" v-if="!materialVideoArr.length">暂无数据</span>
          </ul>

          <!-- 图片库 -->
          <ul v-if="materialType == 2" class="paddBox">
            <li class="ul_list"
              v-for="(item, index) in materialPhotoArr"
              :key="index"
              @click="checkMateriaPhoto_Detail(item)"
              >
              <span v-if="item.folderName">
                <i class="iconfont iconwenjianjia"></i>
                <p>{{item.folderName}}</p>
              </span>
             <span  v-if="!item.folderName">
               <label ><input type="checkbox"  :value="item" v-model="material_picture"/></label>
               <img :src="returnUrl(item.smallPhotoLocation)" class="img_item">
               <p>{{item.photoName}}</p>
             </span>
            </li>
            <span class="noresult" v-if="!materialPhotoArr.length ">暂无数据</span>
          </ul>

          <!-- 文本 -->
          <ul v-if="materialType == 3">
            <li class="ul_list_item" v-for="(item, index) in materialTextArr" :key="index">
              <label><input type="radio"  :value="item" v-model="materialText"/></label>
              <p :title="item.content">{{item.content}}</p>
            </li>
            <span class="noresult" v-if="!materialTextArr.length">暂无数据</span>
          </ul>

          <!-- 链接  -->
          <ul v-if="materialType == 4">
            <li class="ul_list_item" v-for="(item, index) in materialLinkUrl" :key="index">
              <label><input type="radio"  :value="item" v-model="material_linkUrl"/></label>
              <p><span class="linkTitle">{{item.title}}</span> <span class="linkUrl">{{item.url}}</span></p>
            </li>
            <span class="noresult" v-if="!materialLinkUrl.length">暂无数据</span>
          </ul>

      </div>
      <div class="footer1 cf">
        <span style="float:right;">
          <el-button @click="showMaterial = false" type="success" size="mini">取消</el-button>
          <el-button type="success" @click="submitMaterial" size="mini">确定</el-button>
        </span>
      </div>
    </div>


  </div>
</template>

<script>
import { createUploadUrl } from '@/tools/resourceTool'
import {parseTime} from '@/utils'
import TableBox from '../core/TableBox'
import MoreImgUpload from '../core/MoreImgUpload'
import Bus from '../Data/bus.js'

export default {
  components:{
    TableBox,
    MoreImgUpload
  },
  data(){
    let that = this
    return{
      userInfo:this.$cfg.userInfo,
      nowSelectInfo:this.$cfg.nowSelectInfo,
      baseUrl: this.$cfg.userInfo.uploadUrl,
      isShowBox: false,
      showNoWx:false,  //微信号弹窗
      activeName: 'first',
      addform:{
       noWx: '',
       pushContent: '',
       executeTime: '',
       delayTime: '',
       linkUrl: '',
       picUrl: '',
       type: '1',
       autoContent: ''
     },
     rules:{
       noWx: [
          { required: true, message: '请选择微信号', trigger: 'blur' },
        ],
        delayTime: [
           { required: true, message: '请输入延迟时间', trigger: 'blur' },
         ],
         executeTime: [
            { required: true, message: '请选中执行时间', trigger: 'blur' },
          ],
     },
     circleFriendsData: [],//朋友圈列表
     wxShopList:[],   //微信号列表
     noWxGm:'',   //选择的微信号
     checkboxList:[], //选择的微信号
     checked: false, //重置全选按钮
     checkNumber: 0,
     limitNumber:9,
     limitVideo: 1,
     fileList:[],
     videoUrl:'',//
     preVideoUrl:'',//预览视频地址
     pageSize: 10,   // 每页默认10条数据
     total: 0,   // 总数
     pageNo: 1, // 当前页默认为第一页
     params:{
          noWxs:'',
          type:'',
          content:'',
         createDateBegin:"",
         createDateEnd:"",
         status:'',
     },
     maxTime: { // 限制最大时间
         disabledDate(time) {
           if (that.params.createDateEnd) {
             return time.getTime() > new Date(that.params.createDateEnd).getTime()
           }
           return time.getTime() > Date.now()
         }
       },
    minTime: { // 限制最小时间
         disabledDate(time) {
             if (that.params.createDateBegin) {
                 let a = parseTime(time.getTime(), '{y}-{m}-{d}')
                 return time.getTime() > Date.now() || a < that.params.createDateBegin
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

     //素材
     materialName: '',
     showMaterial: false,
     materialType: 1,
     materialVideoArr: [],  //视频库
     materialPhotoArr: [], //图片库
     materialTextArr:[],
     materialLinkUrl: [],//链接库列表

     materialText: {},
     material_video: {},
     material_picture: [],
     material_linkUrl: {},

     steps: 0,
    }
  },
  watch:{
    checkboxList:{
      handler:function(val,oldVal){
        this.checkNumber = val.length
        if(this.checkboxList.length === this.wxShopList.length){
          this.checked = true
        }else{
          this.checked = false
        }
        deep: true
      }
    }
  },
  mounted(){
    this.isShowBox = true
    this.getCircleFriendsList()
  },
  methods:{
    //获取朋友圈列表
    getCircleFriendsList(){
      this.$http({
        method:'post',
        url:'/api/imh5/sendfriendsjob/list',
        params:{
          noWxs: this.params.noWxs,      //发布微信
          pageNo: this.pageNo,           //页码
          pageSize: this.pageSize,      //分页
          jobState: this.params.type,    //状态
          content: this.params.content,  //内容
          createDateBegin: this.params.createDateBegin,
          createDateEnd: this.params.createDateEnd,
          merchantNo: this.userInfo.memberNoMerchant,
          noWxShop: this.nowSelectInfo.noWx,
        }
      }).then(res=>{
        if(res.data.returnObject.result == 'true'){
          var list = res.data.returnObject.page
          list.rows.forEach( (item) =>{
            if (item.imgAddr) {
              item.imgAddr = item.imgAddr.split(',')
            }
          })

            this.circleFriendsData = list.rows
            this.total = list.total

        }else{
          this.$message.error(res.data.returnObject.message)
        }
      })
    },

    deleteFriendsJob(rows){

      this.$http({
        method:'post',
        url:'/api/imh5/sendfriendsjob/deleteFriendsJob.do',
        params:{
          code:rows.code
        }
      }).then(res=>{
      //  console.log(res)
        if(res.data.result == true && res.data.returnObject.result == 'true'){
          this.$message({
            type:'success',
            message:res.data.returnObject.message
          })
          this.pageNo = 1;
          this.getCircleFriendsList()
        }else{
          this.$message({
            type:'error',
            message:res.data.returnObject.message
          })
        }
      })
    },

    //
    sendAgain (item){
      this.$http({
        method:'post',
        url:'/api/firend/repeatFriends.do',
        params:{
          code:item.code
        }
      }).then(res=>{
        if(res.data.result){
          this.$message({
            type: 'success',
            message: '重发成功'
          })
          this.pageNo = 1;
          this.getCircleFriendsList()
        }else{
          this.$message({
            type:'error',
            message:res.data.returnObject.message
          })
        }
      })

    },
    //选择微信号
    chooseNoWx(){
      this.showNoWx = true
      this.wxShopList = this.$cfg.serviceInfoOrigin
      console.log(this.wxShopList)
    },

    //确认选择
    sureNoWxGm(){
      if(this.checkNumber){

        this.addform.noWx = this.checkboxList.join(',')
        this.showNoWx = false
      }else{
        this.$message({
          type:'error',
          message:'请选择微信号！'
        })

      }
    },

    //选择素材
    chooseMaterial(flag){

        if(this.addform.type == 1 && flag === true){ //文本库
          this.materialName = '文本库'
          this.materialType = 3
          this.materialTextList()

        } if(this.addform.type == 4 && flag === true){ //文本库
          this.materialName = '文本库'
          this.materialType = 3
          this.materialTextList()

        } else if(this.addform.type == 1 && flag === false) {//图片库
          this.materialName = '图片库'
          this.materialType = 2
          this.materialPhotoList()
          this.material_video = {}
          this.material_linkUrl = {}
          this.videoUrl = ''
          this.preVideoUrl = ''

        } else if(this.addform.type == 2 && flag === false) {  //视频库
          this.materialName = '视频库'
          this.materialType = 1
          this.materialVideoList()
          this.material_picture = []
          this.material_linkUrl = {}

        } else if (this.addform.type == 3 && flag === false) {//链接库
          this.materialName = '链接库'
          this.materialType = 4
          this.materialLinkList()
          this.material_picture = []
          this.material_video = {}
          this.videoUrl = ''
          this.preVideoUrl = ''

        }
        this.showMaterial = true
    },


    //查看视频子级
    checkMaterialVideo_Detail (item) {
      if(item.folderName){
        //获取二级素材详情
        this.steps = 1
        this.materialVideoList(item.code)
      } else {
        this.material_video = item
      }
    },

    //查看图片子级
    checkMateriaPhoto_Detail (item) {
      if(item.folderName){
        //获取二级素材详情
        this.steps = 1
        this.materialPhotoList(item.code)
      }
    },



    //确认选择素材
    submitMaterial () {
      if(this.materialName == '图片库'){
        // console.log(this.material_picture)

        if(this.material_picture.length > 9){
          this.$message.error('最多选择9张图片')
          return false
        }
      } else if(this.materialName == '视频库'){

         if(this.material_video.length > 0) {
           this.preVideoUrl = createUploadUrl(this.material_video.videoLocation, this.baseUrl)
           this.videoUrl = createUploadUrl(this.material_video.videoLocation, this.baseUrl)
         } else {
           this.$message.error('请先选择视频')
           return
         }

      } else if(this.materialName == '文本库'){
        if (Object.keys(this.materialText).length == 0) {
            this.$message.error('请先选择文本')
            return
        } else {
            this.addform.pushContent = this.addform.pushContent + this.materialText.content
        }

      } else if(this.materialName == '链接库'){
        if (Object.keys(this.material_linkUrl).length == 0) {
          this.$message.error('请先选择链接')
          return
        } else {
          this.addform.linkUrl =  this.material_linkUrl.url
        }
      }
      this.showMaterial = false
      this.steps = 0
    },

    //返回上一层
    returnPrev () {
      if(this.materialName == '视频库') {
        this.materialVideoList()
      } else if(this.materialName == '图片库') {
        this.materialPhotoList()
      }
      this.steps = 0
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

      let length = parseInt(this.fileList.length) + parseInt(this.material_picture.length)
      if( length > 9){
        this.$message.error('最多选择9张图片')
        return false
      }

      if(this.addform.type == 2){
        let videoLength = document.getElementById('videoPlayer').duration
        // console.log(videoLength)
        if(videoLength > 11){
          this.$message.error('视频时长不能超过10秒')
          this.videoUrl = ''
          this.preVideoUrl = ''
          return
        }
      }


      //上传图片地址
      let mediasUrl = this.fileList.map(item => {
        return item.url
      })

      //素材图片地址
      let materialImg = this.material_picture.map(item => {
        return createUploadUrl(item.photoLocation, this.baseUrl)
      })

      mediasUrl = mediasUrl.concat(materialImg)
      // console.log(mediasUrl.join(','))

      if(this.addform.type == 1 && mediasUrl.length ==0 && this.addform.pushContent == ''){
        this.$message.error('请添加文字或图片')
        return false
      }

      let params = {
        noWxs: this.addform.noWx,
        executeTime: this.addform.executeTime,
        type: this.addform.type,
        content: this.addform.pushContent,
        imgAddrs: mediasUrl.join(','),
        // resourcePath: this.videoUrl,
        merchantNo: this.userInfo.memberNoMerchant,
        autoContent: this.addform.autoContent
      }

      if(this.addform.type == 2){
        params.resourcePath = this.videoUrl
      }
      if(this.addform.type == 3){
        params.resourcePath = this.addform.linkUrl
        params.imgAddrs = createUploadUrl(this.material_linkUrl.photo, this.baseUrl)
        params.shareTitle = this.material_linkUrl.title
        // if(this.addform.pushContent == ''){
        //   params.content = this.material_linkUrl.title
        // }
      }
      console.log(params)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            method:'post',
            url:'/api/imh5/sendfriendsjob/addSendFriendsJob.do',
            params:params
          }).then(res=>{
            if(res.data.result == true && res.data.returnObject.result == 1){
              this.$message({
                type:'success',
                message:'新增朋友圈任务成功！'
              })
              this.checkboxList = []
              this.$refs[formName].resetFields();
              this.activeName = 'first'
              this.getCircleFriendsList()
              this.fileList = []

              // Bus.$emit("emptyUploadList")
              this.material_picture = []
              this.material_linkUrl = {}
              this.material_video = {}
              this.materialText = {}
              //清空视频
              if(this.videoUrl || this.preVideoUrl){
                this.videoUrl = ''
                this.preVideoUrl = ''
                this.$refs.upVideo.clearFiles()
              }

            }else{
              this.$message.error(res.data.returnObject.msg)
            }
          })

        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },

    beforeAvatarUpload (file) {
      let fileName = new Array(0)
      fileName = file.name.split('.')
      const videoType = ['mp4']
      const isVideo = videoType.indexOf(fileName[fileName.length - 1])
      const isLt2M = file.size / 1024 / 1024 < 10
      return
      if (isVideo === -1) {
        this.$message({
          message: '暂时只支持 mp4 格式!',
          type: 'error'
        })
        return false
      }
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 10M',
          type: 'error'
        })
        return false
      }
    },
    //自定义上传视频
    uploadVideo(param){
      var merchantNo = this.$cfg.userInfo.memberNoMerchant
      var fileObj = param.file;
      var form = new FormData();
      const fileSizeM = fileObj.size / 1024 / 1024

      if (fileSizeM > 10) {
        let errMessage = '上传文件大小不能超过 10M'
        this.$message({
          type: 'error',
          message: errMessage
        })
        this.fileList = []
        return false
      }

      form.append("file", fileObj);
      form.append("merchantNo",merchantNo);
      //console.log(form.get('file'))
      this.$http.post('/api/im/chat/uploadFileFromWeb.do',form).then(res => {
        // console.log(res)
        if(res.data.result == true){
          this.$message({
            type:'success',
            message:'上传成功'
          })
          this.videoUrl = res.data.returnObject
          this.preVideoUrl = res.data.returnObject
        //  this.fileList.push(res.data.returnObject)
        } else {
          this.$message({
            type:'error',
            message:res.data.errorMessage
          })
           this.fileList =[]
        }
      })
    },

    exceedNum (file) {
      this.$message({
        type: 'danger',
        message: '最多上传一个视频'
      })
    },

    //移除视频地址
    handleRemove (file, fileList) {
      //console.log(fileList)
      this.videoUrl = ''
      this.preVideoUrl = ''
    },
    //全选
    checkedAll(){
      if(this.checked){
        this.checkboxList =[]
      }else{
        this.checkboxList = []
        this.wxShopList.forEach( (item) => {
          this.checkboxList.push(item.noWx)
        })
      }
      this.checkNumber = this.checkboxList.length
    },
    //分页
    handleCurrentChange(val){
      this.circleFriendsData = []//清空表单
      this.pageNo = val;
      this.getCircleFriendsList()
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

    //获取视频库列表
    materialVideoList (id) {
      let params = {
        merchantNo: this.userInfo.memberNoMerchant,
        parentId: id,
        start:0,
        limit: 99999
      }
      this.$http.post('/api/imh5/imMaterial/materialVideoList.do',params)
        .then(res=>{
          if(res.data.result){
            this.materialVideoArr = res.data.returnObject.rows
          }

        })
    },

    //获取图片库列表
    materialPhotoList (id) {
      let params = {
        merchantNo: this.userInfo.memberNoMerchant,
        parentId: id,
        start:0,
        limit: 99999
      }
      this.$http.post('/api/imh5/imMaterial/materialPhotoList.do',params)
        .then(res=>{
          if(res.data.result){
            this.materialPhotoArr = res.data.returnObject.rows
          }
        })
    },

    //获取链接库列表
    materialLinkList (id) {
      let params = {
        merchantNo: this.userInfo.memberNoMerchant,
        parentId: id,
        start:0,
        limit: 99999
      }
      this.$http.post('/api/imh5/imMaterial/materialLinkList.do',params)
        .then(res=>{
          if(res.data.result){
            this.materialLinkUrl = res.data.returnObject.rows
          }
        })
    },

    //获取文本库列表
    materialTextList (id) {
      let params = {
        merchantNo: this.userInfo.memberNoMerchant,
        parentId: id,
        start:0,
        limit: 99999
      }
      this.$http.post('/api/imh5/imMaterial/materialTextList.do',params)
        .then(res=>{
          if(res.data.result){
            this.materialTextArr = res.data.returnObject.rows
          }
        })
    },

    returnUrl(url){
        if (!url) {
          return ''
        }
        url = url.trim()
        if (!url.startsWith('http')) {
          return this.baseUrl + url
        }

        return url
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
  width: 280px;
  height: 40px;
  line-height: normal;
  vertical-align: middle;
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
  .cursor{
    cursor: pointer;
    &:hover{
      color: #3a8ee6;
    }
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

  .material_box{
    width: 100%;
    height: 357px;
    box-sizing: border-box;
    overflow: auto;
    ul.paddBox{
      padding: 0 20px;
      .ul_list{
      float: left;
      width: 85px;
      height: 100px;
      margin:0 15px 15px 0;
      box-sizing: border-box;
      text-align: center;
      &:hover{
        cursor: pointer;
      }
      .img_item{
        width: 70px;
        height: 70px;
        display: inline-block;
        margin-bottom: 14px;
      }
      label{
          position: relative;
          top: 18px;
          right: 34px;
      }
      .iconwenjianjia{
        color: #ffcb05;
        margin-top: 20px;
      }
      .iconshipin2{
        color: #3a8ee6;
      }
      .iconfont{
        font-size: 70px;
        margin-bottom: 10px;
        display: inline-block;
      }
      p{
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }

     ul .ul_list_item{
       line-height: 50px;
       display: -webkit-box;
       flex:1;
       border-bottom: 1px solid #e2e2e2;
       padding: 0 15px;
       vertical-align: middle;
       box-sizing: border-box;

       p{
         width: 92%;
         margin-left: 30px;
         display: flex;
         justify-content: space-between;
         overflow: hidden;
         text-overflow: ellipsis;
         white-space: nowrap;

         .linkTitle{
           width: 50%;
           overflow: hidden;
         }

         .linkUrl{
           width: 45%;
           overflow: hidden;
           color: #409EFF;
         }
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
.img_list{
  width: 30px;
  height: 30px;
}
.tips1{
  color: red;
}
.noresult{
  text-align: center;
  margin-top: 20px;
  display: block;
}
.imgUrl_list{
  margin-right: 20px;
  display: inline-flex;
  flex-direction: column;
  &:hover{
    cursor: pointer;
  }
  span{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 50px;
  }
}
.fail_case{
  width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
.MoreImgUpload .el-icon-plus{vertical-align: text-top;}
.MoreImgUpload .el-icon-plus:before{width: 80px;height: 80px;display: inline-block;font-size: 60px;text-align: center;color: #797979;}
.MoreImgUpload .el-upload-list__item:first-child,.MoreImgUpload .el-upload-list__item-name{width: 250px;}
</style>
