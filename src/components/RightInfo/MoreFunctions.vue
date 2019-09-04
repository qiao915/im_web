<template >
  <div class="">
  <div class="MoreFunctions">
    <div class="moreTitle">回复功能</div>
    <div class="moreContent cf">
      <ul>
        <li v-for="(item, index) in list1" :key="index" @click="response(index)">
          <div class="icon_box">
            <i :class="item.icon" class="iconfont"></i>
          </div>
          <span class="icon_text">{{item.text}}</span>
        </li>
      </ul>
    </div>

    <div class="moreTitle">营销功能</div>
    <div class="moreContent cf">
      <ul>
        <li v-for="(item, index) in list2" :key="index" @click="market(index)">
          <div class="icon_box">
            <i :class="item.icon" class="iconfont"></i>
          </div>
          <span class="icon_text">{{item.text}}</span>
        </li>
      </ul>
    </div>

    <div class="moreTitle">资料功能</div>
    <div class="moreContent cf">
      <ul>
        <li v-for="(item, index) in list3" :key="index" @click="data(index)">
          <div class="icon_box">
            <i :class="item.icon" class="iconfont"></i>
          </div>
          <span class="icon_text">{{item.text}}</span>
        </li>
      </ul>
    </div>

    <!-- <div class="moreTitle">管理功能</div>
    <div class="moreContent cf">
      <ul>
        <li v-for="(item, index) in list4" :key="index" @click="manage(index)">
          <div class="icon_box">
            <i :class="item.icon" class="iconfont"></i>
          </div>
          <span class="icon_text">{{item.text}}</span>
        </li>
      </ul>
    </div> -->

    <div class="moreTitle">应用</div>
    <div class="moreContent cf">
      <ul>
        <li v-for="(item, index) in list6" :key="index" @click="apply(index)">
          <div class="icon_box">
            <i :class="item.icon" class="iconfont"></i>
          </div>
          <span class="icon_text">{{item.text}}</span>
        </li>
      </ul>
    </div>

    <!-- <div class="moreTitle">设置</div>
    <div class="moreContent cf">
      <ul>
        <li v-for="(item, index) in list5" :key="index" @click="setting(index)">
          <div class="icon_box">
            <i :class="item.icon" class="iconfont"></i>
          </div>
          <span class="icon_text">{{item.text}}</span>
        </li>
      </ul>
    </div> -->

  </div>

  </div>
</template>

<script>


export default {
    name: 'MoreFunctions',
    components:{

    },
    data(){
      return{
        list1:[
           //{text: '托管', icon:'icontuoguan'},
           {text: '群发', icon:'iconlianxirenmingdan'},
           // {text: '话术', icon:'iconhuashu'},
           // {text: '敏感词', icon:'iconiconfontgantanhao4'},
           // {text: '智能推送', icon:'iconhuaban'}
        ],
        list2:[
          {text: '红包', icon:'iconhongbao'},
          // {text: '活动', icon:'iconliwulipin'},
          // {text: '优惠券', icon:'iconyouhuiquan'}
        ],
        list3:[
          {text: '朋友圈', icon:'iconpengyouquan'},
          // {text: '企业素材', icon:'iconsucai'}
        ],
        list4:[
          {text: '标签', icon:'iconbiaoqian'},
          {text: '分组', icon:'iconGrouping'}
        ],
        list6:[
          {text: '公众号', icon:'icongongzhonghao'},
          {text: '小程序', icon:'iconxiaochengxu'}
        ],
        list5:[
          {text: '点评设置', icon:'iconshezhi'},
          {text: '表情包', icon:'iconbiaoqing'},
          {text: '变量设置', icon:'iconshezhi'}
        ],

      }
    },
    mounted(){

    },
    methods:{
      response(index){
        let self = this

        // if(index == 0){
        //   this.$showPopOperating('Trusteeship', {
        //     closeFun: () => {
        //       self.$hidePopOperating()
        //     }
        //   })
        // }else
        if(index == 0){
          this.$showPopOperating('MassTexting', {
            closeFun: () => {
              self.$hidePopOperating()
            }
          })
        }else if(index == 2){
          this.$showPopOperating('VerbalTrick', {
            closeFun: () => {
              self.$hidePopOperating()
            }
          })
        }else if(index == 3){
          this.$showPopOperating('SensitiveWord', {
            closeFun: () => {
              self.$hidePopOperating()
            }
          })
        }else{
          this.$showPopOperating('SmartPush', {
            closeFun: () => {
              self.$hidePopOperating()
            }
          })
        }
      },

      market(index){
        let self = this
        if(index == 0){
          this.$showPopOperating('RedPacket', {
            closeFun: () => {
              self.$hidePopOperating()
            }
          })
        }else if(index == 1){
          this.$showPopOperating('Activity', {
            closeFun: () => {
              self.$hidePopOperating()
            }
          })
        }else {
          this.$showPopOperating('DiscountCoupon', {
            closeFun: () => {
              self.$hidePopOperating()
            }
          })
        }
      },

      data(index){
        let self = this

        if(index == 0){
          this.$showPopOperating('CircleFriends', {
            closeFun: () => {
              self.$hidePopOperating()
            }
          })

        }else {
          this.$showPopOperating('Material', {
            closeFun: () => {
              self.$hidePopOperating()
            }
          })
        }
      },
      manage(index){
        let self = this

        if(index == 0){
          this.$showPopOperating('Tag', {
            closeFun: () => {
              self.$hidePopOperating()
            }
          })
        }else {
          this.$showPopOperating('Groupe', {
            closeFun: () => {
              self.$hidePopOperating()
            }
          })
        }
      },
      apply(index){
        let self = this

        if(index == 0){
          this.$showPopOperating('TencentManage', {
            closeFun: () => {
              self.$hidePopOperating()
            }
          })
        }else{
          this.$showPopOperating('AppletManage', {
            closeFun: () => {
              self.$hidePopOperating()
            }
          })
        }
      },
      setting(index){
        let self = this

        if(index == 0){
          this.$showPopOperating('CommentSetting', {
            closeFun: () => {
              self.$hidePopOperating()
            }
          })
        }else if(index == 1){
          this.$showPopOperating('EmojiSetting', {
            closeFun: () => {
              self.$hidePopOperating()
            }
          })

        }else {
          this.$showPopOperating('VariateSetting', {
            closeFun: () => {
              self.$hidePopOperating()
            }
          })

        }
      }
    },
}
</script>

<style lang="less" scoped>
.MoreFunctions{
  width: 100%;
  max-width: 270px;
  min-width: 170px;
  height: 100%;
  padding-bottom: 10px;
  box-sizing: border-box;
  // position: fixed;
  // top: 68px;
  // right: 0;
  // z-index: 9999;
  // border-left: 1px solid #d1d1d1;
  .moreTitle{
    width: 100%;
    font-size: 14px;
    color: #666;
    margin: 20px 0 10px 10px;
  }
  .moreContent ul li{
    float: left;
    width: 65px;
    height: 65px;
    text-align: center;
    align-items: center;
    padding-top: 6px;
    color: #666;
    //font-size: 12px;
    box-sizing: border-box;
    background-color: #e4e4e4;
    border: 1px solid #bdbbbb;
    margin:15px 0 0 20px;
    cursor: pointer;
    color: #8c8c8c;
    &:hover{
      transform: scale(1.05);
    }

    .icon_box img{

    }
  }
}
.class{
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: #fff;
}
.iconfont:before{
  font-size: 32px;
  width: 32px;
  height: 32px;
  display: inline-block;
}
</style>
