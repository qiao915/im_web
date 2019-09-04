<!-- 标签 -->
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
            <span slot="label" ><i class="el-icon-tickets"></i> 标签列表</span>
            <el-form :inline="true" class="demo-form-inline tableSearchForm">
                <el-form-item  label="标签：">
                    <el-input type="text" style="width:200px;"></el-input>
                </el-form-item>
                  <el-button type="success">查询</el-button>
            </el-form>
            <el-table ref="multipleTable" :data="keywordData" border tooltip-effect="dark"  stripe align="center" style="width: 100%">
              <el-table-column label="标签" prop="keyText" align="center" width="150px;"></el-table-column>
              <el-table-column label="标签描述" prop="keyText" align="center"></el-table-column>
              <el-table-column label="修改时间" prop="keyText"  align="center" width="150px;"></el-table-column>
              <el-table-column align="center" fixed="right" label="操作" width="120">
                   <template slot-scope="scope">
                      <div class="">
                          <el-button type="text" style="color:#67c23a;" size="mini" @click="aditKeywords(scope.row)">修改</el-button>
                          <el-button type="text" style="color:#67c23a;" size="mini" @click="changeStatus(scope.row)">删除</el-button>
                      </div>
                   </template>
               </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination class="u-pagination" @current-change="handleCurrentChange" :current-page.sync="pageNo" :page-size="pageSize" background layout="total, prev, pager, next, jumper" :total="total"></el-pagination>

            </div>
          </el-tab-pane>

          <el-tab-pane name="second">
            <span slot="label"><i class="el-icon-plus"></i> 新增标签</span>
              <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-position="left" style="">
                <el-form-item label="标签：" prop="tagName">
                  <el-input v-model="form.tagName" style="width:85%;"></el-input>
                </el-form-item>
                <el-form-item label="标签描述：" prop="keyword">
                  <el-input v-model="form.keyword" style="width:85%;"></el-input>
                </el-form-item>
                <!-- <el-form-item label="状态：" prop="pushContent">
                  <el-radio v-model="form.radio" label="1">启用</el-radio>
                  <el-radio v-model="form.radio" label="2">禁用</el-radio>
                </el-form-item> -->
                <el-form-item  align="center">
                  <el-button type="success" @click="addTalkList('form2')">保存</el-button>
                  <el-button @click="goBackList('form')">返回</el-button>
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
        tagName: '',
       keyword: '',
       answerContent: '',
       radio: '1',
     },
     rules:{
       tagName: [
          { required: true, message: '请输入标签', trigger: 'blur' },
          { min: 1,max: 15, message: '标签长度不能超过15个字', trigger: 'blur' },
        ],
      answerContent: [
         { required: true, message: '请输入回答内容', trigger: 'blur' },
       ],
     },
     keywordData: [
       {keyText: '你好！你好', no:'1', answer: '欢饮光临亲！' },
       {keyText: '你好！你好', no:'2', answer: '欢饮光临亲！' },
       {keyText: '你好！你好', no:'3', answer: '欢饮光临亲！' },
       {keyText: '你好！你好', no:'4', answer: '欢饮光临亲！' },
     ],
     pageSize: 10,                               // 每页默认10条数据
     total: 500,                                   // 总数
     pageNo: 1,                                  // 当前页默认为第一页
     tipsStatus: '禁用',

    }
  },
  mounted(){
    this.isShowBox = true

  },
  methods:{
    //修改标签
    aditKeywords(items){
    //  console.log(items)
      this.activeName = 'second'
      this.form.keyword = items.keyText
      this.form.answerContent = items.answer
    },
    //新增标签
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
    changeStatus(row){
      this.$confirm('是否'+this.tipsStatus+'此条标签?', '提示', {
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
    //分页
    handleCurrentChange(){
      this.keywordData = []//清空表单
      this.pageNo = val;

    },
    goBackList(formName){
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
