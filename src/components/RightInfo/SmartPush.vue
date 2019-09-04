<!--智能推送  -->
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
            <span slot="label" ><i class="el-icon-tickets"></i> 推送列表</span>
            <el-form :inline="true" class="demo-form-inline tableSearchForm">
              <el-form-item label="推送微信：">
                  <el-select v-model="params.weixin" placeholder="请选择">
                      <el-option label="全部" value=""></el-option>
                      <el-option label="已解决" value="01"></el-option>
                      <el-option label="未解决" value="00"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="推送类型：">
                  <el-select v-model="params.type" placeholder="请选择">
                      <el-option label="全部" value=""></el-option>
                      <el-option label="已解决" value="01"></el-option>
                      <el-option label="未解决" value="00"></el-option>
                  </el-select>
                  <el-button type="success">查询</el-button>
              </el-form-item>

            </el-form>
            <el-table ref="multipleTable" :data="keywordData" border tooltip-effect="dark"  stripe align="center" style="width: 100%">
              <el-table-column label="推送微信" width="100;" align="center"></el-table-column>
              <el-table-column label="推送时间" width="100;" align="center"></el-table-column>
              <el-table-column label="推送类型" prop="keyText" width="150" align="center"></el-table-column>
              <el-table-column label="推送内容" prop="keyText"  align="center"></el-table-column>
              <el-table-column label="推送状态" prop="" width="80" align="center"></el-table-column>
              <el-table-column align="center" fixed="right" label="操作" width="120">
                   <template slot-scope="scope">
                      <div class="">
                          <el-button type="text" style="color:#67c23a;" size="mini" @click="aditWords(scope.row)">重发</el-button>
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
            <span slot="label"><i class="el-icon-plus"></i> 新增推送</span>
              <el-form ref="addform" :model="addform" :rules="rules" label-width="100px" label-position="left" style="">
                <el-form-item label="推送微信：" prop="keyword">
                  <el-input v-model="addform.keyword" :disabled="true" style="width:85%;"></el-input>
                  <el-button type="success">选择</el-button>
                </el-form-item>
                <el-form-item label="推送时间：">
                    <el-select v-model="addform.time" placeholder="请选择">
                        <el-option label="立即推送" value="01"></el-option>
                        <el-option label="认领后" value="00"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="推送类型：">
                    <el-select v-model="addform.type" placeholder="请选择">
                        <el-option label="话术、问候语" value="1"></el-option>
                        <el-option label="图片" value="2"></el-option>
                        <el-option label="名片" value="3"></el-option>
                        <el-option label="分享" value="4"></el-option>
                        <el-option label="公众号" value="5"></el-option>
                        <el-option label="小程序" value="6"></el-option>
                    </el-select>
                </el-form-item>
                <div v-if="addform.type == 1">
                  <el-form-item label="推送内容：" prop="pushContent">
                    <el-input type="textarea" v-model="addform.pushContent" :autosize="{ minRows: 6}"></el-input>
                    <span class="insert" @click="insertVariate()">插入变量</span>
                    <span class="tips">注意：为了防止微信封号，请复制变量到推送内容中。</span>
                  </el-form-item>
                </div>
                <div v-if="addform.type == 2">
                  <el-form-item label="推送内容：">
                    <OssUpload v-model="addform.picUrl" />
                  </el-form-item>
                </div>
                <div v-if="addform.type == 3">
                  <el-form-item label="推送内容：">
                    <el-select v-model="addform.card" placeholder="请选择名片">
                        <el-option label="名片1" value="01"></el-option>
                        <el-option label="名片2" value="00"></el-option>
                    </el-select>
                    <!-- <OssUpload v-model="addform.card" /> -->
                  </el-form-item>
                </div>
                <div v-if="addform.type == 4">
                  <el-form-item label="标题：">
                      <el-input v-model="addform.title" style="width:96%;"></el-input>
                  </el-form-item>
                  <el-form-item label="描述：">
                      <el-input v-model="addform.desc" style="width:96%;"></el-input>
                  </el-form-item>
                  <el-form-item label="链接：">
                      <el-input v-model="addform.link" style="width:96%;"></el-input>
                  </el-form-item>
                  <el-form-item label="图片：">
                    <OssUpload v-model="addform.img" />
                  </el-form-item>
                </div>
                <div v-if="addform.type == 5">
                  <el-form-item label="推送内容：">
                    <el-select v-model="addform.card" placeholder="请选择公众号">
                        <el-option label="公众号1" value="01"></el-option>
                        <el-option label="公众号2" value="00"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div v-if="addform.type == 6">
                  <el-form-item label="推送内容：">
                    <el-select v-model="addform.card" placeholder="请选择小程序">
                        <el-option label="小程序1" value="01"></el-option>
                        <el-option label="小程序2" value="00"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <el-form-item label="状态：" prop="pushContent">
                  <el-radio v-model="radio" label="1">启用</el-radio>
                  <el-radio v-model="radio" label="2">禁用</el-radio>
                </el-form-item>

                <!-- <el-form-item label="回答内容：" prop="answerContent">
                  <el-input type="textarea" v-model="form.answerContent" :autosize="{ minRows: 6}"></el-input>
                </el-form-item> -->
                <el-form-item align="center" >
                  <el-button type="success" @click="saveSubmit('addform')">保存</el-button>
                  <el-button @click="goBack('form')">返回</el-button>
                </el-form-item>
              </el-form>
              <!-- 变量弹窗 -->
              <div class="insertBox" v-if="isShow_insertBox">
                  <el-table ref="multipleTable" :data="variateData" tooltip-effect="dark" height="320" style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column type="selection" label="全选" width="55"> </el-table-column>
                    <el-table-column prop="name" label="变量名称" align="center" width="120"> </el-table-column>
                    <el-table-column prop="num" label="变量数量" align="center" show-overflow-tooltip> </el-table-column>
                  </el-table>
                  <div style="margin-top: 20px;text-align:center;">
                    <el-button @click="cancleInsert()" type="info" size="mini">取消</el-button>
                    <el-button @click="sureInsert()" type="success" size="mini">完成({{selectLength ? selectLength : 0}})</el-button>
                  </div>
              </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      </template>

    </TableBox>
  </div>
</template>

<script>
import TableBox from '../core/TableBox'
import OssUpload from '@/components/core/OssUpload'
export default {
  components:{
    TableBox,
    OssUpload
  },
  data(){
    return{
      isShowBox: false,
      show_tuoguan: false,
      activeName: 'first',
      addform:{
        time: '',
        type: '1',
        pushContent: '',
        picUrl: '',
        card: '',
        title: '',
        desc: '',
        link: '',
        img: '',
        gongzhonghao: '',
        applet: '',

      },
      params:{
        weixin: '',
        type: ''
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
       {keyText: '你好！你好', no:'1', answer: '欢饮222' },
       {keyText: '你好！你好', no:'2', answer: '欢饮光临亲！' },
       {keyText: '你好！你好', no:'3', answer: '欢饮光临亲！' },
       {keyText: '你好！你好', no:'4', answer: '欢饮光临亲！' },
     ],
     pageSize: 10,                               // 每页默认10条数据
     total: 500,                                   // 总数
     pageNo: 1,                                  // 当前页默认为第一页
     isShow_insertBox: false,
     selectArr:[],                         //选中数组
     selectLength: 0,                            //选中长度
     pushText: '',
      radio: '1',
      variateData:[
        {name: '你好1', num:'1' },
        {name: '你好2', num:'2' },
        {name: '你好3', num:'3' },
        {name: '哈哈', num:'4' },
        {name: '开心', num:'1' },
        {name: '是是是', num:'2' },
        {name: '你好4', num:'3' },
        {name: '你好5', num:'4' },

      ]
    }
  },
  mounted(){
    this.isShowBox = true
    //this.addform.type = 1
  },
  methods:{
    //删除
    deleteWords(val){
      console.log(val)
      this.$confirm('是否禁用此条推送?', '提示', {
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
    //变量列表
    insertVariate(){
      this.isShow_insertBox = !this.isShow_insertBox
    },
    //
    handleSelectionChange(val) {
      let arr =[]
      this.selectLength = val.length
      val.forEach(item =>{
        arr.push(item.name)
      })
      this.selectArr = Array.from(new Set(arr))//es6去重
      this.pushText = this.selectArr.join(',')  //插入变量
     },
     //完成
     sureInsert(){
       if(this.selectLength){
         this.addform.pushContent += this.pushText
         this.isShow_insertBox = false
         this.selectLength = 0
         this.selectArr = []
         this.pushText = ''
       }else{
         this.$message({
           type: 'error',
           message: '请选择插入变量'
         });
       }
     },
     //取消
     cancleInsert(){
       this.$refs.multipleTable.clearSelection();
       this.isShow_insertBox = false
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
.insert{
  position:absolute;top:-30px;right:0;cursor: pointer;
  &:hover{color: #67c23a;}
}
.tips{
  color: red;
}
.insertBox{
  width: 300px;
  height: 400px;
  border-radius: 5px;
  box-shadow: #3e3d3d 0 0 10px;
  position: absolute;
  right:30px;
  bottom: 5px;
  background: #fff;
}
</style>
