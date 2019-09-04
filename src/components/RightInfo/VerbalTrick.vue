<!-- 话术 -->
<template >
  <div class="verbaltrick">
    <TableBox :isShowBox="isShowBox"  @closeBox="closeBox">
      <template slot="tableBox_top">
        <template slot="delete"></template>
      </template>
      <template slot="top_tab">
        <div class="keywords">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane name="first">
            <span slot="label" ><i class="el-icon-tickets"></i> 话术列表列表</span>
            <el-form :inline="true" class="demo-form-inline tableSearchForm">
              <el-form-item label="类型：">
                  <el-select v-model="params.type" placeholder="请选择">
                      <el-option label="全部" value=""></el-option>
                      <el-option label="已解决" value="01"></el-option>
                      <el-option label="未解决" value="00"></el-option>
                  </el-select>
              </el-form-item>
                <el-form-item  label="话术内容：">
                    <el-input type="text" v-model="params.content" style="width:150px;"></el-input>
                </el-form-item>
                <el-form-item label="话术归属：">
                    <el-select v-model="params.senseof" placeholder="请选择">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="已解决" value="01"></el-option>
                        <el-option label="未解决" value="00"></el-option>
                    </el-select>
                </el-form-item>
                <el-button type="success">查询</el-button>
            </el-form>
            <el-table ref="multipleTable" :data="keywordData" border tooltip-effect="dark"  stripe align="center" style="width: 100%">
              <el-table-column label="话术类型"  align="center" prop="keyText" width="110;"></el-table-column>
              <el-table-column label="话术内容" prop="answer">
                <template slot-scope="scope">
                  <el-tooltip placement="top-start" effect="light">
                    <div slot="content">{{scope.row.answer}}</div>
                    <span class="answer">{{scope.row.answer}}</span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="话术归属" align="center" prop="" width="110;"></el-table-column>
              <el-table-column label="修改时间" align="center" prop="" width="150;"></el-table-column>
              <el-table-column align="center" fixed="right" label="操作" width="110">
                   <template slot-scope="scope">
                      <div class="">
                          <el-button type="text" style="color:#67c23a;" size="mini" @click="editTalkList(scope.row)">修改</el-button>
                          <el-button type="text" style="color:#67c23a;" size="mini" @click="deleteTalkList(scope.row.no)">删除</el-button>
                      </div>
                   </template>
               </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination class="u-pagination" @current-change="handleCurrentChange" :current-page.sync="pageNo" :page-size="pageSize" background layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane name="second">
            <span slot="label" ><i class="el-icon-document"></i> 话术类型列表</span>
            <el-form :inline="true" class="demo-form-inline tableSearchForm">
              <el-form-item label="话术类型">
                  <el-select v-model="params.status" placeholder="请选择">
                      <el-option label="全部" value=""></el-option>
                      <el-option label="已解决" value="01"></el-option>
                      <el-option label="未解决" value="00"></el-option>
                  </el-select>
              </el-form-item>
              <el-button type="success">查询</el-button>
            </el-form>
            <el-table ref="multipleTable" :data="keywordData" border tooltip-effect="dark"  stripe align="center" style="width: 100%">
              <el-table-column label="序号" type="index" width="100;" align="center"></el-table-column>
              <el-table-column label="话术类型" prop="answer">
                <!-- <template slot-scope="scope">
                  <el-tooltip placement="top-start" effect="light">
                    <div slot="content">{{scope.row.answer}}</div>
                    <span class="answer">{{scope.row.answer}}</span>
                  </el-tooltip>
                </template> -->
              </el-table-column>
              <el-table-column label="修改时间" type="index" width="150;" align="center"></el-table-column>
              <el-table-column align="center" fixed="right" label="操作" width="110">
                   <template slot-scope="scope">
                      <div class="">
                          <el-button type="text" style="color:#67c23a;" size="mini" @click="editTalkType(scope.row)">修改</el-button>
                            <el-button type="text" style="color:#67c23a;" size="mini" @click="deleteTalkType(scope.row)">删除</el-button>
                      </div>
                   </template>
               </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination class="u-pagination" @current-change="handleCurrentChange" :current-page.sync="pageNo" :page-size="pageSize" background layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
            </div>
          </el-tab-pane>

          <el-tab-pane name="third">
            <span slot="label"><i class="el-icon-plus"></i> 新增话术类型</span>

              <el-form ref="form1" :model="form1" :rules="rules1" label-width="100" label-position="left" style="">
                <el-form-item label="话术类型：" prop="talkType">
                  <el-input v-model="form1.talkType" style="width:80%;"></el-input>
                </el-form-item>
                <el-form-item label="类型排序：" prop="sort">
                  <el-input v-model="form1.sort" style="width:80%;"></el-input>
                </el-form-item>
                <el-form-item align="center">
                  <el-button type="success" @click="addTalkType('form1')">保存</el-button>
                  <el-button @click="goBackType('form1')">返回</el-button>
                </el-form-item>
              </el-form>
          </el-tab-pane>

          <el-tab-pane name="fourth">
            <span slot="label"><i class="el-icon-edit-outline"></i> 新增话术</span>
              <el-form ref="form2" :model="form2" :rules="rules2" label-width="100" label-position="left" style="">

                <el-form-item label="话术类型" prop="byType">
                    <el-select v-model="form2.byType" placeholder="请选择">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="已解决" value="01"></el-option>
                        <el-option label="未解决" value="00"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="话术内容" prop="talkContent">
                  <el-input type="textarea" v-model="form2.talkContent" :autosize="{ minRows: 6}"></el-input>
                </el-form-item>
                <el-form-item  align="center">
                  <el-button type="success" @click="addTalkList('form2')">保存</el-button>
                  <el-button @click="goBackList('form2')">返回</el-button>
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
      form1: {
       sort: '',
       talkType: ''
     },
     rules1:{
       sort: [
          { required: true, message: '请输入话术类型', trigger: 'blur' },
        ],
      talkType: [
         { required: true, message: '请输入类型排序', trigger: 'blur' },
       ],
     },
     params:{
       type:'',
       content: '',
       senseof: '',
     },
     form2: {
      byType: '',
      talkContent: ''
    },
     rules2:{
       byType: [
          { required: true, message: '请选择话术类型', trigger: 'blur' },
        ],
      talkContent: [
         { required: true, message: '请输入话术内容', trigger: 'blur' },
       ],
     },
     keywordData: [
       {keyText: '你好！你好', no:'1', answer: '欢饮光临亲！哦2222222222' },
       {keyText: '你好！你好', no:'2', answer: '欢饮光临亲！' },
       {keyText: '你好！你好', no:'3', answer: '欢饮光临亲！' },
       {keyText: '你好！你好', no:'4', answer: '欢饮光临亲！' },
       {keyText: '你好！你好', no:'1', answer: '欢22222' },
       {keyText: '你好！你好', no:'2', answer: '欢饮亲！' },
       {keyText: '你好！你好', no:'3', answer: '欢临亲！' },
       {keyText: '你好！你好', no:'4', answer: '欢临亲！' },
       {keyText: '你好！你好', no:'1', answer: '欢22222' },
       {keyText: '你好！你好', no:'2', answer: '欢饮亲！' },

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
    //新增话术
    addTalkList(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //修改话术
    editTalkList(items){
    //  console.log(items)
      this.activeName = 'fourth'
      this.form2.byType = items.keyText
      this.form2.talkContent = items.answer
    },
    //删除话术
    deleteTalkList(val){
      console.log(val)
      this.$confirm('是否删除此条话术?', '提示', {
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

    //新增话术类型
    addTalkType(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //修改话术类型
    editTalkType(items){
      this.activeName = 'third'
      this.form1.sort = items.keyText
      this.form1.talkType = items.answer
    },
    //删除话术类型
    deleteTalkType(val){
      console.log(val)
      this.$confirm('是否删此条话术类型,?', '提示', {
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

    //分页
    handleCurrentChange(){
      this.keywordData = []//清空表单
      this.pageNo = val;

    },
    goBackList(formName){
      this.activeName = 'first'
      this.$refs[formName].resetFields();
    },
    goBackType(formName){
      this.activeName = 'second'
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
