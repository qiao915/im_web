<!-- 标签 -->
<template >
  <div class="trusteeship">
    <TableBox :isShowBox="isShowBox" @closeBox="closeBox">
      <template slot="tableBox_top">
        <template slot="delete"></template>
      </template>
      <template slot="top_tab">
        <div class="keywords">
        <el-tabs v-model="activeName">
          <el-tab-pane name="first">
            <span slot="label" ><i class="el-icon-tickets"></i> 标签列表</span>
            <el-form :inline="true" class="demo-form-inline tableSearchForm">
                <el-form-item  label="标签：">
                    <el-input type="text"></el-input>
                </el-form-item>
                <el-button type="success">查询</el-button>
            </el-form>

            <div class="tagBox">
              <ul>
                <li v-for="(item, index) in items" :class="{tagActived :item.actived}" @click="changeTag(item)" :key="index">
                  <span>{{item.tagName}}</span>
                </li>
              </ul>
            </div>
            <div style="text-align:center;margin-top:20px;">
                <el-button type="success" @click="">保存</el-button>
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
      activeName: 'first',
     items: [
       {tagName: '你好', actived:false},
       {tagName: 'VIP客户', actived:true },
       {tagName: '五星大神', actived:true },
       {tagName: '神壕抱大腿', actived:false},
     ],

    }
  },
  mounted(){
    this.isShowBox = true

  },
  methods:{
    changeTag(item){
      if(typeof item.actived == 'undefined'){
        this.$set(item,"actived",true)
      }else {
        item.actived = !item.actived
      }
      //保存选中的标签
      let arr1 = []
      this.items.forEach(item=>{
        if(item.actived == true){
            arr1.push(item.tagName)
        }
      })
      console.log(arr1)
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
.tagBox{
  width: 100%;
  height: 450px;
  padding-top: 20px;
  box-sizing: border-box;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  ul li{
    display: inline-block;
    padding: 0px 25px;
    border-radius: 5px;
    text-align: center;
    box-sizing: border-box;
    margin-right: 25px;
    cursor: pointer;
    border:1px solid #a7a7a7;
    background-color: #fff;
    color: #a7a7a7;
    &:hover{
      background-color: #efefef;
    }
  }
  .tagActived{
    background-color: #08A406;
    color: #fff;
    border-color: #08A406;
    &:hover{
      background-color: #85ce61;
        border-color: #85ce61;
    }
  }
}
</style>
