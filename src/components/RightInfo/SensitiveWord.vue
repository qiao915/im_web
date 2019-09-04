<!--敏感词  -->
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
            <span slot="label" ><i class="el-icon-tickets"></i> 敏感词列表</span>
            <el-form :inline="true" class="demo-form-inline tableSearchForm">
                <el-form-item  label="敏感词：" style="width:800px;">
                    <el-input type="text" style="width:300px;"></el-input>
                    <el-button type="success">查询</el-button>
                    <el-button type="success">导入</el-button>
                    <el-button type="success">导出</el-button>
                </el-form-item>
            </el-form>
            <el-table ref="multipleTable" :data="keywordData" border tooltip-effect="dark"  stripe align="center" style="width: 100%">
              <el-table-column label="序号：" type="index" width="80;" align="center"></el-table-column>
              <el-table-column label="敏感词：" prop="keyText" align="center"></el-table-column>
              <el-table-column label="修改时间：" prop="keyText" width="150" align="center"></el-table-column>
              <el-table-column align="center" fixed="right" label="操作" width="120">
                   <template slot-scope="scope">
                      <div class="">
                          <el-button type="text" style="color:#67c23a;" size="mini" @click="aditWords(scope.row)">修改</el-button>
                          <el-button type="text" style="color:#67c23a;" size="mini" @click="deleteWords(scope.row)">删除</el-button>
                      </div>
                   </template>
               </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination class="u-pagination" @current-change="handleCurrentChange" :current-page.sync="pageNo" :page-size="pageSize" background layout="total, prev, pager, next, jumper" :total="total"></el-pagination>

            </div>
          </el-tab-pane>

          <el-tab-pane name="second">
            <span slot="label"><i class="el-icon-plus"></i> 新增敏感词</span>

              <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-position="left" style="">
                <el-form-item label="关键词：" prop="keyword">
                  <el-input v-model="form.keyword" style="width:100%;">

                  </el-input>
                </el-form-item>
                <!-- <el-form-item label="回答内容：" prop="answerContent">
                  <el-input type="textarea" v-model="form.answerContent" :autosize="{ minRows: 6}"></el-input>
                </el-form-item> -->
                <el-form-item align="center" style="margin-top:50px;">
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
export default {
  components:{
    TableBox
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
          { required: true, message: '请输入关键词', trigger: 'blur' },
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
    //删除
    deleteWords(val){
      console.log(val)
      this.$confirm('是否删除此条敏感词?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //修改
    aditWords(items){
    //  console.log(items)
      this.activeName = 'second'
      this.form.keyword = items.keyText
      this.form.answerContent = items.answer
      // this.$router.push({
      //     query: {
      //         keyWords: items.keyText,
      //         keyAnswer: items.answer,
      //         keyNo: items.no
      //     }
      // })
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

</style>
