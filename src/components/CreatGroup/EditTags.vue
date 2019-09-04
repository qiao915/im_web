<!--批量分组  -->
<template >
  <div class="editTags">
    <MaskLayer :isShowBox="isShowBox">
      <template slot="MaskBox">
        <div class="propBox">
          <span class="delete" @click="closeBox()"></span>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane name="first">
              <span slot="label">公共标签</span>
              <div class="stepList_box">
                <div class="tagBox" v-if="steps == 1">
                  <ul>
                    <li
                      v-for="(item, index) in tagsData"
                      :class="{tagActived :item.actived}"
                      @click="changeTag(item)"
                      :key="index"
                    >
                      <span>{{item.labelName}}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane name="second">
              <span slot="label">个人标签</span>
              <div class="stepList_box">
                <div class="tagBox" v-if="steps == 1">
                  <ul>
                    <li
                      v-for="(item, index) in tagsData"
                      :class="{tagActived :item.actived}"
                      @click="changeTag(item)"
                      :key="index"
                    >
                      <span>{{item.labelName}}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>


          <div class="footer1 cf">
            <span v-if="steps == 1">已选：{{tagNumber}}个标签</span>
            <span v-if="steps == 1" style="float:right;">
              <el-button v-if="steps == 1" @click="sureBtn($event)" type="success" size="mini">完成</el-button>
            </span>
          </div>
        </div>
      </template>
    </MaskLayer>
  </div>
</template>

<script>
import MaskLayer from '../core/MaskLayer'
import { findFriends } from '@/api'
import Bus from '../Data/bus.js'

export default {
  name: 'EditTags',
  components: {
    MaskLayer
  },
  props: {
    propsData: {}
  },
  data () {
    return {
      userInfo:this.$cfg.userInfo,
      isShowBox: true,
      tagNumber: 0,
      tagsData: [],
      tagsNames:[],
      tagsCodes:[],
      steps:1,
      have_tags:[],
      activeName: 'first',
      tagsType: 0   //公共
    }
  },

  async created () {
    this.selectTags(0)
    this.have_tags = this.propsData.lables
    this.tagNumber = this.propsData.lables.length
    // console.log(this.propsData)
  },

  methods: {

   //获取标签列表
   selectTags (type) {
      this.$http.post('/api/member/findPmLabelListByMerchantNo.do',{
        merchantNo: this.userInfo.memberNoMerchant,
        type: type
      }).then(res=>{
        if(res.data.result){
          let data = res.data.returnObject
          if(this.have_tags && this.have_tags.length){

            let codeArr = this.have_tags.map((item) => {
              return item.code;
            });

            let aa
            aa = data.filter((item, index) => {
              if(codeArr.indexOf(item.code) == -1){
                item.actived = false
              } else {
                item.actived = true
              }
              // return codeArr.indexOf(item.code) == -1;
            });

          }
          this.tagsData = data
          // console.log(this.tagsData)
        }

      })
   },

    changeTag (item) {
      if (typeof item.actived === 'undefined') {
        this.$set(item, 'actived', true)
      } else {
        item.actived = !item.actived
      }
      // 保存选中的标签
      let arr1 = []
      let arr2 = []
      this.tagsData.forEach(item => {
        if (item.actived) {
          arr1.push(item.labelName)
          arr2.push(item.code)
        }
      })
      this.tagNumber = arr1.length
      this.tagsNames = arr1
      this.tagsCodes = arr2
    },

    sureBtn () {
        this.$http.post('/api/imh5/member/addTags.do',{
          tags: this.tagsCodes.join(','),
          names: this.tagsNames.join(','),
          memberNos: this.propsData.memberNo,
          merchantNo: this.userInfo.memberNoMerchant,
          type: this.tagsType
        }).then(res=>{
          if(res.data.result){
            this.$message.success('编辑成功')
            this.$emit('close')
            Bus.$emit('refreshUserInfo')
          }else{
            this.$message.error(res.data.errorMessage)
          }
        })

    },
    handleClick(tab){
      if(tab.name == 'first'){
        this.selectTags(0)
        this.tagsType = 0
      } else {
        this.selectTags(1)
        this.tagsType = 1
      }
    },
    closeBox () {
      this.$emit('close')
    }
  },
  // destroyed () {
  //     Bus.$off('refreshUserInfo')
  // },

}
</script>

<style lang="less" scoped>
.propBox {
  width: 620px;
  height: 460px;
  position: absolute;
  position: relative;
  left: 50%;
  top: 50%;
  margin-left: -310px;
  margin-top: -230px;
  background-color: #fff;
  box-shadow: #3e3d3d 0 0 15px;
  .delete {
    width: 32px;
    height: 32px;
    background: url("../../../static/img/delete.png") no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
    z-index: 999;
  }
  .step_box {
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #e2e2e2;

  }
  .stepList_box {
    width: 100%;
    height: 340px;
    padding: 10px;
    box-sizing: border-box;
    overflow: auto;
    }
    .box1 {
      ul li {
        display: -webkit-box;
        // display: flex;
        flex: 1;
        border-bottom: 1px solid #e2e2e2;
        margin-top: 10px;
        padding-bottom: 10px;
        vertical-align: middle;
        .flex_box {
          display: flex;
          flex: 1;
          justify-content: space-between;
          flex-direction: column;
        }
        .headImg {
          width: 40px;
          height: 40px;
          border-radius: 3px;
          margin: 0 15px 0 10px;
          vertical-align: middle;
        }
        .time {
          color: #737373;
          font-size: 12px;
        }
      }
    }


  .footer1 {
    width: 100%;
    height: 45px;
    line-height: 45px;
    background-color: #f2f2f2;
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 0 10px;
    box-sizing: border-box;
    .quanxuan {
      margin-right: 20px;
    }
  }
}
.steps_active {
  color: #08a406 !important;
  border-color: #08a406 !important;
}
.finishBox {
  text-align: center;
  margin-top: 50px;
}
.tagBox {
  width: 100%;
  height: 300px;
  padding-top: 20px;
  box-sizing: border-box;
  overflow: scroll;
  ul li {
    display: inline-block!important;
    padding: 9px 25px!important;
    border-radius: 5px;
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    border: 1px solid #a7a7a7!important;
    background-color: #fff;
    color: #a7a7a7;
    margin-right: 20px!important;
    margin-bottom: 10px;
    &:hover {
      background-color: #efefef;
    }
  }
  .tagActived {
    background-color: #08a406;
    color: #fff;
    border-color: #08a406;
    &:hover {
      background-color: #85ce61;
      border-color: #85ce61;
    }
  }
}
</style>
