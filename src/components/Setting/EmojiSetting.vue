<!--表情包 -->
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
            <span slot="label" ><i class="el-icon-tickets"></i> 表情包列表</span>
            <el-form :inline="true" class="demo-form-inline tableSearchForm">
              <el-form-item label="修改时间 :">
                  <el-date-picker v-model="params.beginTime" type="date" placeholder="开始日期" value-format="yyyy-MM-dd" :picker-options="maxTime"></el-date-picker>
                      <span>至</span>
                  <el-date-picker v-model="params.endTime" type="date" placeholder="结束日期" value-format="yyyy-MM-dd" :picker-options="minTime"></el-date-picker>
              </el-form-item>
                <el-form-item  label="表情包名称：">
                    <el-input type="text"></el-input>
                </el-form-item>
                <el-button type="success">查询</el-button>
            </el-form>
            <el-table ref="multipleTable" :data="keywordData" border tooltip-effect="dark"  stripe align="center" style="width: 100%">
              <el-table-column label="排序" type="index" align="center" width="60px;"></el-table-column>
              <el-table-column label="表情包名称" prop="keyText" width="200px;"></el-table-column>
              <el-table-column label="表情包LOGO" prop="answer">
                <template slot-scope="scope">
                  <!-- <el-tooltip placement="top-start" effect="light">
                    <div slot="content">{{scope.row.answer}}</div>
                    <span class="answer">{{scope.row.answer}}</span>
                  </el-tooltip> -->
                </template>
              </el-table-column>
              <el-table-column label="修改时间" prop="keyText" align="center" width="150px;"></el-table-column>
              <el-table-column label="状态" prop="answer" align="center" width="80px;"></el-table-column>
              <el-table-column align="center" fixed="right" label="操作" width="100">
                   <template slot-scope="scope">
                      <div class="">
                        <el-button type="text" style="color:#67c23a;" size="mini" @click="aditKeywords(scope.row)">修改</el-button>
                        <el-button type="text" style="color:#67c23a;" size="mini" @click="changeStatus(scope.row)">启用</el-button>
                      </div>
                   </template>
               </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination class="u-pagination" @current-change="handleCurrentChange" :current-page.sync="pageNo" :page-size="pageSize" background layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
            </div>
          </el-tab-pane>

          <el-tab-pane name="second">
            <span slot="label"><i class="el-icon-plus"></i> 新增表情包</span>
              <el-form ref="form" :model="form" :rules="rules" label-width="120px" label-position="left" style="">
                <el-form-item label="表情包名称：" prop="keyword" >
                  <el-input v-model="form.keyword"  style="width:60%;"></el-input>
                </el-form-item>
                <el-form-item label="排序：" prop="keyword" >
                  <el-input v-model="form.keyword"  style="width:60%;"></el-input>
                </el-form-item>
                <el-form-item label="状态：" prop="pushContent">
                  <el-radio v-model="form.radio" label="1">启用</el-radio>
                  <el-radio v-model="form.radio" label="2">禁用</el-radio>
                </el-form-item>
                <el-form-item label="图片：" prop="pushContent" >
                  <MoreImgUpload :limitNumber="limitNumber" v-model="form.picUrl"/>
                  <p style="color:red;font-size:12px;">最多上传20张图片</p>
                </el-form-item>
                <el-form-item align="center">
                  <el-button type="success" @click="saveSubmit('form')">选择</el-button>
                  <el-button @click="goBack('form')">返回</el-button>
                </el-form-item>
              </el-form>

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
import MoreImgUpload from '../core/MoreImgUpload'
export default {
  components:{
    TableBox,
    MoreImgUpload
  },
  data(){
    let that = this
    return{
      limitNumber: 20,
      isShowBox: false,
      activeName: 'first',
      form: {
       keyword: '',
       answerContent: '',
       radio: '1',
       picUrl: '',
     },
     rules:{
       keyword: [
          { required: true, message: '请输入关键词', trigger: 'blur' },
        ],
     },
     keywordData: [
       {keyText: '你好！你好', no:'1', answer: '欢饮2222' },
       {keyText: '你好！你好', no:'2', answer: '欢饮亲！' },
       {keyText: '你好！你好', no:'3', answer: '欢临亲！' },
       {keyText: '你好！你好', no:'4', answer: '欢临亲！' },
     ],
     pageSize: 10,                               // 每页默认10条数据
     total: 500,                                   // 总数
     pageNo: 1,                                  // 当前页默认为第一页
     tipsStatus: '启用',
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
    }
  },
  mounted(){
    this.isShowBox = true

  },
  methods:{
    //修改关键词
    aditKeywords(items){
    //  console.log(items)
      this.activeName = 'second'
      this.form.keyword = items.keyText
      this.form.answerContent = items.answer

    },
    changeStatus(row){
      this.$confirm('是否'+this.tipsStatus+'此条分组?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '操作成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
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
    handleCurrentChange(){
      this.keywordData = []//清空表单
      this.pageNo = val;

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

}
</style>
