<!-- 优惠券 -->
<template >
  <div class="verbaltrick DiscountCoupon">
    <TableBox :isShowBox="isShowBox" @closeBox="closeBox">
      <template slot="tableBox_top">
        <template slot="delete"></template>
      </template>
      <template slot="top_tab">
        <div class="keywords">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane name="first">
            <span slot="label" ><i class="el-icon-tickets"></i> 优惠券列表列表</span>
            <el-form :inline="true" class="demo-form-inline tableSearchForm">
              <el-form-item  label="优惠券名称：">
                  <el-input type="text" style="width:150px" v-model="params.content"></el-input>
              </el-form-item>
              <el-form-item label="优惠券类型：">
                  <el-select v-model="params.type" style="width:150px" placeholder="请选择">
                      <el-option label="全部" value=""></el-option>
                      <el-option label="已解决" value="01"></el-option>
                      <el-option label="未解决" value="00"></el-option>
                  </el-select>
              </el-form-item>
                <el-form-item  label="门店名称：">
                    <el-input type="text" style="width:150px" v-model="params.content"></el-input>
                </el-form-item>
              <el-button type="success">查询</el-button>
            </el-form>
            <el-table ref="multipleTable" :data="keywordData" border tooltip-effect="dark"  stripe align="center" style="width: 100%">
              <el-table-column label="优惠券名称" prop="answer"></el-table-column>
              <el-table-column label="优惠券类型"  align="center" prop="" ></el-table-column>
              <el-table-column label="启动时间" align="center" prop="" ></el-table-column>
              <el-table-column label="门店平均数量" align="center" prop="" ></el-table-column>
              <el-table-column label="优惠券面额" align="center" prop="" ></el-table-column>
              <el-table-column label="开始时间" align="center" prop="" ></el-table-column>
              <el-table-column label="结束时间" align="center" prop="" ></el-table-column>
              <el-table-column label="使用金额门槛" align="center" prop="" ></el-table-column>
              <el-table-column label="优惠券规则" align="center" prop="" ></el-table-column>
              <el-table-column label="状态" align="center" prop="" ></el-table-column>
              <el-table-column label="启动时间" align="center" prop="" ></el-table-column>
              <el-table-column align="center" fixed="right" label="操作" width="60px;">
                   <template slot-scope="scope">
                      <div class="">
                          <el-button type="text" style="color:#67c23a;" size="mini" @click="editTalkList(scope.row)"> 启用</el-button>
                      </div>
                   </template>
               </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination class="u-pagination" @current-change="handleCurrentChange" :current-page.sync="pageNo" :page-size="pageSize" background layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
            </div>
          </el-tab-pane>

          <el-tab-pane name="second">
            <span slot="label"><i class="el-icon-plus"></i> 新增优惠券</span>

              <el-form ref="form1" :model="form1" :rules="rules1" label-width="120px" label-position="left" style="">
                <el-form-item label="优惠券名称：" prop="sort">
                  <el-input v-model="form1.sort" style="width:80%;"></el-input>
                </el-form-item>
                <el-form-item label="优惠券类型：" prop="talkType">
                  <el-input v-model="form1.talkType" style="width:80%;"></el-input>
                </el-form-item>
                <el-form-item label="使用范围：" prop="sort">
                  <el-input v-model="form1.sort" style="width:80%;"></el-input>
                </el-form-item>
                <el-form-item label="门店平均数量：" prop="sort">
                  <el-input v-model="form1.sort" style="width:80%;"></el-input>
                </el-form-item>
                <el-form-item label="优惠券面额：" prop="sort">
                  <el-input v-model="form1.sort" style="width:80%;"></el-input>
                </el-form-item>
                <el-form-item label="开始时间：" prop="sort">
                  <el-input v-model="form1.sort" style="width:80%;"></el-input>
                </el-form-item>
                <el-form-item label="结束时间：" prop="sort">
                  <el-input v-model="form1.sort" style="width:80%;"></el-input>
                </el-form-item>
                <el-form-item label="使用金额门槛：" prop="sort">
                  <el-input v-model="form1.sort" style="width:80%;"></el-input>
                </el-form-item>
                <el-form-item label="优惠券规则：" prop="sort">
                  <el-input v-model="form1.sort" style="width:80%;"></el-input>
                </el-form-item>
                <el-form-item label="状态：" prop="sort">
                  <el-input v-model="form1.sort" style="width:80%;"></el-input>
                </el-form-item>
                <el-form-item label="启用时间：" prop="sort">
                  <el-input v-model="form1.sort" style="width:80%;"></el-input>
                </el-form-item>
                <el-form-item align="center">
                  <el-button type="success" @click="addTalkType('form1')">保存</el-button>
                  <el-button @click="goBackType('form1')">返回</el-button>
                </el-form-item>
              </el-form>
          </el-tab-pane>

          <el-tab-pane name="third">
            <span slot="label" ><i class="el-icon-document"></i> 使用记录</span>
            <el-form :inline="true" class="demo-form-inline tableSearchForm">
              <el-form-item  label="优惠券名称：">
                  <el-input type="text" style="width:150px" v-model="params.content"></el-input>
              </el-form-item>
              <el-form-item  label="发放门店：" >
                  <el-input type="text" style="width:150px" v-model="params.content"></el-input>
              </el-form-item>
              <el-form-item label="使用状态：">
                  <el-select v-model="params.type" style="width:150px" placeholder="请选择">
                      <el-option label="全部" value=""></el-option>
                      <el-option label="已解决" value="01"></el-option>
                      <el-option label="未解决" value="00"></el-option>
                  </el-select>
              </el-form-item>

              <el-button type="success">查询</el-button>
            </el-form>
            <el-table ref="multipleTable" :data="keywordData" border tooltip-effect="dark"  stripe align="center" style="width: 100%">
              <el-table-column label="优惠券名称"  align="center"></el-table-column>
              <el-table-column label="优惠券棉麻" prop="answer"></el-table-column>
              <el-table-column label="发放门店" type="index" width="150;" align="center"></el-table-column>
              <el-table-column label="使用状态" type="index" width="150;" align="center"></el-table-column>
              <el-table-column label="使用时间" type="index" width="150;" align="center"></el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination class="u-pagination" @current-change="handleCurrentChange" :current-page.sync="pageNo" :page-size="pageSize" background layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
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
          { required: true, message: '请输入优惠券类型', trigger: 'blur' },
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
          { required: true, message: '请选择优惠券类型', trigger: 'blur' },
        ],
      talkContent: [
         { required: true, message: '请输入优惠券内容', trigger: 'blur' },
       ],
     },
     keywordData: [
       {keyText: '你好！你好', no:'1', answer: '欢22222' },
       {keyText: '你好！你好', no:'2', answer: '欢饮亲！' },
       {keyText: '你好！你好', no:'3', answer: '欢临亲！' },
       {keyText: '你好！你好', no:'4', answer: '欢临亲！' },
       {keyText: '你好！你好', no:'1', answer: '欢22222' },
       {keyText: '你好！你好', no:'2', answer: '欢饮亲！' },
       {keyText: '你好！你好', no:'3', answer: '欢临亲！' },
       {keyText: '你好！你好', no:'4', answer: '欢临亲！' },
       {keyText: '你好！你好', no:'3', answer: '欢临亲！' },
       {keyText: '你好！你好', no:'4', answer: '欢临亲！' },
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

    //启用优惠券
    editTalkList(items){

    },


    //新增优惠券类型
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


    //分页
    handleCurrentChange(){
      this.keywordData = []//清空表单
      this.pageNo = val;

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
