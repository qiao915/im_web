<!-- 点评-->
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
            <span slot="label" > 点评列表</span>
            <el-form :inline="true" class="demo-form-inline tableSearchForm">
              <el-form-item label="类型">
                  <el-select v-model="params.type" placeholder="请选择">
                      <el-option label="全部" value=""></el-option>
                      <el-option label="自动点评" value="01"></el-option>
                      <el-option label="自动点赞" value="00"></el-option>
                  </el-select>
              </el-form-item>
                <el-form-item  label="微信：">
                    <el-input type="text" v-model="params.wx"></el-input>
                </el-form-item>
                <el-button type="success">查询</el-button>
            </el-form>
            <el-table ref="multipleTable" :data="keywordData" border tooltip-effect="dark"  stripe align="center" style="width: 100%">
              <el-table-column label="类型" type="index" align="center" width="100px;"></el-table-column>
              <el-table-column label="微信" prop="keyText" align="center" width="150px;"></el-table-column>
              <el-table-column label="频率" prop="keyText" align="center"  width="100px;"></el-table-column>
              <el-table-column label="评论内容" prop="keyText" align="center"></el-table-column>
              <el-table-column label="修改时间" prop="keyText" align="center"  width="150px;"></el-table-column>
              <el-table-column align="center" fixed="right" label="操作" width="90">
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
            <span slot="label"> 自动点赞</span>
              <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-position="left" style="">
                <el-form-item label="开启状态：" prop="pushContent">
                  <el-radio v-model="form.radio" label="1">启用</el-radio>
                  <el-radio v-model="form.radio" label="2">禁用</el-radio>
                </el-form-item>
                <el-form-item label="微信号：" prop="keyword">
                  <el-input v-model="form.wx" :disabled="true" style="width:600px;"></el-input>
                  <el-button type="success">选择</el-button>
                </el-form-item>
                <el-form-item label="点赞频率：">
                    <el-select v-model="params.type" placeholder="请选择">
                        <el-option label="30天一次" value=""></el-option>
                        <el-option label="15天一次" value="01"></el-option>
                        <el-option label="7天一次" value="00"></el-option>
                    </el-select>
                    <p style="color:red;">注：自动点赞开启后，系统将根据执行频率自动为客户点赞！</p>
                </el-form-item>
                <el-form-item  align="center">
                  <el-button type="success" @click="addTalkList('form2')">保存</el-button>
                </el-form-item>
              </el-form>
          </el-tab-pane>

          <el-tab-pane name="third  ">
            <span slot="label">自动评论</span>
              <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-position="left" style="">
                <el-form-item label="开启状态：" prop="keyword">
                  <el-radio v-model="form.radio" label="1">启用</el-radio>
                  <el-radio v-model="form.radio" label="2">禁用</el-radio>
                </el-form-item>
                <el-form-item label="微信号：" prop="keyword">
                  <el-input v-model="form.wx" :disabled="true" style="width:600px;"></el-input>
                  <el-button type="success">选择</el-button>
                </el-form-item>
                <el-form-item label="评论频率：" prop="keyword">
                    <el-select v-model="params.type" placeholder="请选择">
                        <el-option label="30天一次" value=""></el-option>
                        <el-option label="15天一次" value="01"></el-option>
                        <el-option label="7天一次" value="00"></el-option>
                    </el-select>
                    <p style="color:red;">注：自动评论开启后，系统将根据执行频率自动为客户评论！</p>
                </el-form-item>
                <el-form-item label="评论内容：" prop="answerContent">
                  <el-input type="textarea" v-model="form.answerContent" :autosize="{ minRows: 6}"  style="width:600px;"></el-input>
                  <span>表情</span>
                </el-form-item>
                <el-form-item  align="center">
                  <el-button type="success" @click="addTalkList('form2')">保存</el-button>
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
      params:{
        wx: '',
        type: '',
      },
      form: {

       radio: '1',
       wx: '',
     },
     rules:{
       keyword: [
          { required: true, message: '请输入分组', trigger: 'blur' },
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
    //修改分组
    aditKeywords(items){
    //  console.log(items)
      this.activeName = 'second'
      this.form.keyword = items.keyText
      this.form.answerContent = items.answer
    },
    //新增分组
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
