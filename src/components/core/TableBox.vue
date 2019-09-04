<template>
  <div class="MaskLayer" v-show="isShowBox">
    <div class="TableBox">
        <div class="tableBox_top">
          <span class="delete" @click="closeBox"><slot name="delete"></slot></span>
          <div class="top_tab">
            <slot name="top_tab"></slot>
          </div>

        </div>
        <!-- <div class="tableBox_content">
          <div class="tableBox_search">
            <slot name="tableBox_search"></slot>
          </div>
          <div class="tableBox_table">
              <slot name="tableBox_table"></slot>
          </div>

        </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'MaskLayer',
  data(){
    return{

    }
  },
  props:{
    isShowBox:{
      type: Boolean,
      default: false,
    },

  },
  data(){
    return{

    }
  },
  methods:{
    closeBox(){
      this.$emit('closeBox')
    }
  },
}
</script>

<style lang="less" scoped>
.MaskLayer{
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
    background-color: #ededed;
    box-shadow: #3e3d3d 0 0 15px;
    .tableBox_top{
      width: 100%;
      height: 55px;
      line-height: 55px;
      background-color: #3b4149;
      position: relative;
      .top_tab{
        width: 80%;
        height: 40px;
        line-height: 40px;
        padding:12px 0 0 20px;
        box-sizing: border-box;
      }
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
    .tableBox_content{
      width: 100%;
      height: 625px;
      background: #ededed;
    }
  }
}
</style>
