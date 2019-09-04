<!-- 小程序-->
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
            <span slot="label" ><i class="el-icon-tickets"></i> 小程序列表</span>
            <el-form :inline="true" class="demo-form-inline tableSearchForm">
                <el-form-item  label="小程序名称：">
                    <el-input type="text" v-model="appletName" style="width:200px;"></el-input>
                </el-form-item>
                <el-form-item label="状态：">
                    <el-select v-model="status">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="已收藏" value="1"></el-option>
                        <el-option label="未收藏" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-button type="success" @click="getAppletList()">查询</el-button>
            </el-form>
            <el-table ref="multipleTable" :data="appletData" border tooltip-effect="dark"  stripe align="center" style="width: 100%">
              <el-table-column label="小程序图片" align="center">
                <template slot-scope="scope">
                    <img width="30" height="30" :src="scope.row.spLogo" alt="">
                </template>
              </el-table-column>
              <el-table-column label="小程序名称" prop="spName" align="center"></el-table-column>
              <el-table-column label="状态" prop="keyText" align="center">
                <template slot-scope="scope">
                  {{scope.row.status == 1 ? '已收藏' : '未收藏'}}
                </template>
              </el-table-column>
              <el-table-column align="center" fixed="right" label="操作" width="120">
                   <template slot-scope="scope">
                      <div class="">
                        <el-button type="text" style="color:#08A406;" size="mini" @click="setDisabled(scope.row)">
                          {{scope.row.status == 1 ? '取消收藏' : '收藏'}}
                        </el-button>
                        <el-button type="text" style="color:red;" size="mini" @click="deleteApplet(scope.row)">删除</el-button>
                      </div>
                   </template>
               </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination class="u-pagination" @current-change="handleCurrentChange" :current-page.sync="pageNo" :page-size="pageSize" background layout="total, prev, pager, next, jumper" :total="total"></el-pagination>

            </div>
          </el-tab-pane>

          <!-- <el-tab-pane name="second" style="width:940px;">
            <span slot="label" ><i class="el-icon-circle-close-outline"></i> 失效小程序</span>
            <el-form :inline="true" class="demo-form-inline tableSearchForm">
                <el-form-item  label="小程序名称：">
                    <el-input type="text" style="width:200px;"></el-input>
                </el-form-item>
                <el-button type="success">查询</el-button>
            </el-form>
            <el-table ref="multipleTable" :data="appletData" border tooltip-effect="dark"  stripe align="center" style="width: 100%">
              <el-table-column label="小程序图片" prop="keyText" align="center"></el-table-column>
              <el-table-column label="小程序名称" prop="keyText" align="center"></el-table-column>
              <el-table-column label="状态" prop="keyText" align="center"></el-table-column>
              <el-table-column align="center" fixed="right" label="操作" width="120">
                   <template slot-scope="scope">
                      <div class="">
                          <el-button type="text" style="color:#08A406;" size="mini" @click="setEffect(scope.row)">设置有效</el-button>
                      </div>
                   </template>
               </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination class="u-pagination" @current-change="handleCurrentChange" :current-page.sync="pageNo" :page-size="pageSize" background layout="total, prev, pager, next, jumper" :total="total"></el-pagination>

            </div>
          </el-tab-pane> -->
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
      userInfo:this.$cfg.userInfo,
      isShowBox: false,
      activeName: 'first',
      appletName:'',
      status:'',
      appletData: [],
      pageSize: 10,                               // 每页默认10条数据
      total: 0,                                   // 总数
      pageNo: 1,                                  // 当前页默认为第一页

    }
  },
  mounted(){
    this.isShowBox = true
    this.getAppletList()
  },
  methods:{
    //获取小程序列表
    getAppletList(){
      this.$http({
        method:'post',
        url:'/api/imh5/smallprogram/list',
        params:{
          pageNo:this.pageNo,
          pageSize: this.pageSize,
          status:this.status,
          paName:this.appletName,
          merchantNo:this.userInfo.memberNoMerchant
        }
      }).then(res=>{
      //  console.log(res)
        if(res.data.result == true){
          let data = res.data.returnObject.dataMap.page
          this.appletData = data.rows
          this.total = data.total

        }

      })
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
    //收藏或取消收藏
    setDisabled(row){
      console.log(row)
      let sta;
      //status  1已收藏  2未收藏
      row.status == 1 ? sta = 0 : sta = 1
      this.$http({
        method:'post',
        url:'/api/imh5/smallprogram/edit',
        params:{
          code:row.code,
          status:sta,   // 0取消收藏  1收藏
        }
      }).then(res=>{
        if(res.data.result == true && res.data.returnObject.result == true){
          this.$message({
            type:'success',
            message:'操作成功'
          })
          this.getAppletList()
        }
      //  console.log(res)
      })
    },


    //
    deleteApplet(row){
      this.$confirm('是否删除此小程序?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        type: 'warning'
      }).then(() => {

        this.$http.post('/api/imh5/smallprogram/delete.do',{
          code: row.code
        }).then( res=>{
          // console.log(res)
          if(res.data.result){
            this.$message.success('操作成功!')
            this.getAppletList()
          } else {
            this.$message.error('删除失败')
          }
        })

      }).catch(() => {
        this.$message.info('已取消操作')
      });
    },
    //分页
    handleCurrentChange(val){
      this.appletData = []//清空表单
      this.pageNo = val;
      this.getAppletList()
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
