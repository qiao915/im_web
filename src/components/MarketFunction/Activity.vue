<!-- 托管 -->
<template >
  <div class="trusteeship">
    <TableBox :isShowBox="isShowBox" @closeBox="closeBox">
      <template slot="tableBox_top">
        <template slot="delete"></template>
      </template>
      <template slot="top_tab">
        <div class="keywords">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane name="first">
            <span slot="label" ><i class="el-icon-tickets"></i> 活动列表</span>
            <el-form :inline="true" class="demo-form-inline tableSearchForm">
                <el-form-item  label="活动标题：">
                    <el-input type="text"></el-input>
                </el-form-item>
                  <el-button type="success">查询</el-button>
            </el-form>
            <el-table ref="multipleTable" :data="keywordData" border tooltip-effect="dark"  stripe align="center" style="width: 100%">
              <el-table-column label="活动标题" prop="keyText" width="250px;"></el-table-column>
              <el-table-column label="详情" prop="answer">
                <template slot-scope="scope">
                  <el-tooltip placement="top-start" effect="light">
                    <div slot="content">{{scope.row.answer}}</div>
                    <span class="answer">{{scope.row.answer}}</span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="启动时间" prop="keyText" width="180px;"></el-table-column>
              <el-table-column align="center" fixed="right" label="操作" width="60">
                   <template slot-scope="scope">
                      <div class="">
                          <el-button type="text" style="color:#67c23a;" size="mini" @click="aditKeywords(scope.row)">修改</el-button>
                      </div>
                   </template>
               </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination class="u-pagination" @current-change="handleCurrentChange" :current-page.sync="pageNo" :page-size="pageSize" background layout="total, prev, pager, next, jumper" :total="total"></el-pagination>

            </div>
          </el-tab-pane>

          <el-tab-pane name="second">
            <span slot="label"><i class="el-icon-plus"></i> 新增活动</span>

              <el-form ref="form" :model="form" :rules="rules" label-width="110px" label-position="left" style="">
                <el-form-item label="活动：" prop="keyword">
                  <el-input v-model="form.keyword" style="width:100%;"></el-input>
                </el-form-item>
                <el-form-item label="启动时间：" prop="keyword">
                    <el-input v-model="form.keyword" style="width:75%;"></el-input>
                    <span class="tips">活动当天，员工才能查看活动！</span>
                </el-form-item>
                <el-form-item label="网址链接：" prop="keyword">
                  <el-input v-model="form.keyword" style="width:100%;"></el-input>
                </el-form-item>
                <el-form-item label="活动详情图：" prop="answerContent">
                    <MoreImgUpload v-model="form.keyword"/>
                </el-form-item>
                <el-form-item >
                  <el-button type="success" @click="saveSubmit('form')">保存</el-button>
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
import TableBox from '../core/TableBox'
import MoreImgUpload from '../core/MoreImgUpload'
export default {
  components:{
    TableBox,
    MoreImgUpload,

  },
  data(){
    return{
      isShowBox: false,
      show_tuoguan: false,
      activeName: 'first',
      form: {
       keyword: '',
       answerContent: ''
     },
     rules:{
       keyword: [
          { required: true, message: '请输入活动', trigger: 'blur' },
        ],
      answerContent: [
         { required: true, message: '请输入回答内容', trigger: 'blur' },
       ],
     },
     keywordData: [
       {keyText: '你好！你好', no:'1', answer: '欢饮光临亲！哒哒哒哒哒哒多多多多多多多多多多多多多多少时诵诗书所所所所所所所少时诵诗书所少时诵诗书所 多多多多多多多多多噢噢噢噢噢噢噢噢哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦玩222222222222' },
       {keyText: '你好！你好', no:'2', answer: '欢饮光临亲！' },
       {keyText: '你好！你好', no:'3', answer: '欢饮光临亲！' },
       {keyText: '你好！你好', no:'4', answer: '欢饮光临亲！' },
     ],
     pageSize: 10,                               // 每页默认10条数据
     total: 500,                                   // 总数
     pageNo: 1,                                  // 当前页默认为第一页
     multipleSelection: []
    }
  },
  mounted(){
    this.isShowBox = true

  },
  methods:{
    //修改活动
    aditKeywords(items){
    //  console.log(items)
      this.activeName = 'second'
      this.form.keyword = items.keyText
      this.form.answerContent = items.answer

    },
    //新增活动
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
  width: 150px;
  height: 40px;
  line-height: normal;
  vertical-align: middle;
}
</style>
