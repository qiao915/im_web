<template id="tab">
    <div id="tabPanel">
        <div class="item">
            <div class="menutitle" @click="toggle()">
              <span class="groupHeadImg"><slot name="groupHeadImg"></slot></span>
              <slot name="groupName"></slot>
            </div>
            <div class="sildermun" v-show="status">
                <slot name="childrenItems"></slot>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
      // props: {
      //     childItems: {
      //         type: Array,
      //         default: ''
      //     }
      // },
        data(){
          return{
            status: false,
          }
        },
        methods:{
          toggle: function() {
              this.status = !this.status;
          }
        },
    }
</script>
<style lang="less" scoped>
#tabPanel {
    width: 100%;
    height: auto;

    .item .sildermun ul{

        li {
          height: 50px;
          line-height: 50px;
          list-style: none;
          padding: 0 10px;
          &:hover{
            background: #2e3238;
          }
          span{
            width: 100%;
            box-sizing: border-box;
            display: inline-block;
            border-bottom: 1px solid #1f1c1c;

          }
      }
    }
    .item .menutitle {
        height: 60px;
        line-height: 60px;
        color: #fff;
        background-color: #2e3238;
        padding: 0 15px;
        box-sizing: border-box;
        //text-align: center;
        font-size: 14px;
        .groupHeadImg img{
          width: 40px;
          height: 40px;
          vertical-align: middle;
          margin-right: 20px;
        }
    }
    .item .sildermun {
        text-align: center;
        color: #fff;
    }
}
</style>
