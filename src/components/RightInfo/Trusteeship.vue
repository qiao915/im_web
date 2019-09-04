<!-- 托管 -->
<template >
  <div class="trusteeship">
    <TableBox :isShowBox="isShowBox" @closeBox="closeBox">
      <template slot="tableBox_top">
        <template slot="delete"><span ></span></template>
      </template>

      <template slot="top_tab">
        <div class="keywords">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane name="first">
            <span slot="label" ><i class="el-icon-tickets"></i> 关键词列表</span>
            <el-form :inline="true" class="demo-form-inline tableSearchForm">
                <el-form-item  label="关键词：">
                    <el-input v-model="keyWords" type="text" style="width:150px;"></el-input>
                </el-form-item>
                <el-form-item label="关键词类型：">
                    <el-select v-model="type" placeholder="请选择">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="启用" value="01"></el-option>
                        <el-option label="禁用" value="00"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="回答内容：">
                    <el-input v-model="answer" type="text" style="width:150px;"></el-input>
                    <el-button type="success">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table ref="multipleTable" :data="keyWordsList" border tooltip-effect="dark"  stripe align="center" style="width: 100%">
              <el-table-column label="类型" prop="keyText" width="150px;"></el-table-column>
              <el-table-column label="关键词" prop="keyText" width="250px;"></el-table-column>
              <el-table-column label="回答内容" prop="answer">
                <template slot-scope="scope">
                  <el-tooltip placement="top-start" effect="light">
                    <div slot="content">{{scope.row.answer}}</div>
                    <span class="answer">{{scope.row.answer}}</span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column align="center" fixed="right" label="操作" width="120">
                   <template slot-scope="scope">
                      <div class="">
                          <el-button type="text" style="color:#67c23a;" size="mini" @click="aditKeywords(scope.row)">修改</el-button>
                            <el-button type="text" style="color:#67c23a;" size="mini" @click="deleteKeywords(scope.row)">删除</el-button>
                      </div>
                   </template>
               </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination class="u-pagination" @current-change="handleCurrentChange" :current-page.sync="pageNo" :page-size="pageSize" background layout="total, prev, pager, next, jumper" :total="total"></el-pagination>

            </div>
          </el-tab-pane>

          <el-tab-pane name="second">
            <span slot="label"><i class="el-icon-plus"></i> 新增关键词</span>
              <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-position="left" style="">
                <el-form-item label="类型：">
                    <el-select v-model="form.keyword" placeholder="请选择">
                        <el-option label="关键词触发" value="5"></el-option>
                        <el-option label="非关键词触发" value="6"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="关键词：" prop="keyword">
                  <el-input v-model="form.keyword" style="width:75%;"></el-input>
                  <span style="color:red">&nbsp;(多个请用英文","分开)</span>
                </el-form-item>
                <el-form-item label="回答内容：" prop="answerContent">
                  <el-input type="textarea" v-model="form.answerContent" :autosize="{ minRows: 6}"></el-input>
                </el-form-item>
                <el-form-item >
                  <el-button type="success" @click="saveSubmit('form')">保存</el-button>
                  <el-button @click="goBack('form')">返回</el-button>
                </el-form-item>
              </el-form>
          </el-tab-pane>

          <el-tab-pane name="third">
            <span slot="label"><i class="el-icon-tickets"></i> 托管列表</span>
            <el-form :inline="true" class="demo-form-inline tableSearchForm">
                <el-form-item  label="员工：">
                    <el-input v-model="staff" type="text" style="width:150px;"></el-input>
                </el-form-item>
                <el-form-item label="状态：">
                    <el-select v-model="status" placeholder="请选择">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="启用" value="01"></el-option>
                        <el-option label="禁用" value="00"></el-option>
                    </el-select>
                </el-form-item>
                <el-button type="success">查询</el-button>
            </el-form>
            <el-table ref="multipleTable" :data="trusteeshipData" border tooltip-effect="dark"  stripe align="center" style="width: 100%">
              <el-table-column label="所属门店" prop="keyText" width="150px;"></el-table-column>
              <el-table-column label="员工" prop="keyText" width="250px;"></el-table-column>
              <el-table-column label="微信数量" prop="answer"></el-table-column>
              <el-table-column label="状态" prop="keyText" width="150px;"></el-table-column>
              <el-table-column label="修改时间" prop="keyText" width="250px;"></el-table-column>
              <el-table-column label="操作" align="center" fixed="right" width="120">
                   <template slot-scope="scope">
                      <div class="">
                          <el-button type="text" style="color:#67c23a;" size="mini" @click="closeTrusteeship(scope.row)">关闭</el-button>
                            <el-button type="text" style="color:#67c23a;" size="mini" @click="deleteTrusteeship(scope.row)">删除</el-button>
                      </div>
                   </template>
               </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination class="u-pagination"
              @current-change="handleCurrentChange"
              :current-page.sync="pageNo"
              :page-size="pageSize"
              :total="total"
              background layout="total, prev, pager, next, jumper" ></el-pagination>
            </div>
          </el-tab-pane>

          <el-tab-pane name="four">
            <span slot="label"><i class="el-icon-plus"></i> 新增托管</span>
              <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-position="left" style="">
                <el-form-item label="所属门店：" prop="">
                    <el-select v-model="form.keyword" placeholder="请选择">
                        <el-option label="关键词触发" value="5"></el-option>
                        <el-option label="非关键词触发" value="6"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="员工：" prop="">
                    <el-select v-model="form.keyword" placeholder="请选择">
                        <el-option label="关键词触发" value="5"></el-option>
                        <el-option label="非关键词触发" value="6"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态：" prop="">
                  <el-radio v-model="radio" label="1">启用</el-radio>
                  <el-radio v-model="radio" label="2">禁用</el-radio>
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
export default {
  components:{
    TableBox
  },
  data(){
    return{
      userInfo: this.$cfg.userInfo,
      isShowBox: true,
      show_tuoguan: false,
      activeName: 'first',
      keyWords:'',//搜索关键词
      type:'',    //搜索关键词类型
      answer:'',  //搜索回答内容
      staff:'',  //员工
      status:'',  //状态
      radio: '1',
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
     keyWordsList: [],    //关键词列表
     trusteeshipData:[],  //托管列表
     pageSize: 10,                               // 每页默认10条数据
     total: 0,                                   // 总数
     pageNo: 1,                                  // 当前页默认为第一页
    }
  },
  mounted(){
    this.isShowBox = true
    this.getTrusteeshipList()
  },
  methods:{
    //获取托管列表
    getTrusteeshipList(){
      this.$http({
        method:'post',
        url:'/api/imh5/trustee/trusteeList.do',
        params:{
          pageNo:this.pageNo,
          pageSize: this.pageSize,
          memberGmNo: this.userInfo.memberNoGuid,
          staff: this.staff,
          status:this.type,
        }
      }).then(res=>{
        if(res.data.result){
          // this.trusteeshipData = res.data.returnObject
        }

        console.log(res)
      })
    },
    //修改关键词
    aditKeywords(items){
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
    //删除关键词
    deleteKeywords(items){

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
    //关闭托管
    closeTrusteeship(item){

    },
    //删除托管
    deleteTrusteeship(item){

    },
    //分页
    handleCurrentChange(){
      this.keyWordsList = []//清空表单
      this.pageNo = val;

    },
    goBack(formName){
      this.activeName = 'first'
      this.$refs[formName].resetFields();
    },
    //
    handleClick(tab,event){
    //  console.log(tab,event)
    },
    closeBox(){
      this.$emit('close')
    }
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
