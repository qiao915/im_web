<template>
  <div class="MaskLayer" v-if="isShowBox">
    <div class="TableBox">
        <div class="tableBox_top">
          <span class="delete" ><slot name="deleta"></slot></span>
        </div>
        <div class="tableBox_content">
          <div class="tableBox_search">

          </div>
          <div class="tableBox_table">

          </div>

        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MaskLayer',
  props:{
    isShowBox:{
      type: Boolean,
      default: false,
    }
  }
}
</script>

<style lang="less" scoped>
.MaskLayer{
  // width: 96%;
  // height: 770px;
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background:rgba(0,0,0,0.4);
  filter: alpha(opacity=0);
  z-index: 888;
  .TableBox{
    width: 980px;
    height: 730px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -490px;
    margin-top: -340px;
    background-color: #fff;
    box-shadow: #3e3d3d 0 0 15px;
    .tableBox_top{
      width: 100%;
      height: 50px;
      line-height: 50px;
      background-color: #3b4149;
      position: relative;
      .delete{
        width: 32px;
        height: 32px;
        background: url('../../../static/img/delete.png') no-repeat;
        background-size: 100% 100%;
        background-position: center center;
        position: absolute;
        right: 10px;
        top: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
