<template >
  <div class="">
    <MaskLayer :isShowBox="isShowBox">
        <template slot="MaskBox">
          <div class="codeBox">
            <span class="delete" @click="closeBox()"></span>
              <div class="contentBox">
                <img :src="returnUrl(wxQrcode)" alt="">
                <p>{{nowSelectName}}</p>
              </div>

          </div>
        </template>

    </MaskLayer>
  </div>
</template>

<script>
import MaskLayer from "../core/MaskLayer"
export default {
  components:{
    MaskLayer,
  },
  data(){
    return {
      isShowBox: true,
      userInfo:this.$cfg.userInfo,
      baseUrl: this.$cfg.userInfo.uploadUrl,
      wxQrcode: '',//微信二维码
      nowSelectName:''
    }
  },
  mounted(){
    let self = this;
    try{
      var info = this.$cfg.nowSelectInfo;
      self.wxQrcode = info.qcord
      self.nowSelectName =  info.wxNickname
    }catch(e){
      console.log(' ShowScancode error')
    }
  },
  methods:{
    returnUrl(url){
        if (!url) {
          return ''
        }
        url = url.trim()
        if (!url.startsWith('http')) {
          return this.baseUrl + url
        }

        return url
    },

    closeBox(){
      this.$emit('close');
    },
  }
}
</script>

<style lang="less" scoped>
.codeBox{
  width: 600px;
  height: 460px;
  position: relative;
  left: 58%;
  top: 50%;
  margin-left: -300px;
  margin-top: -230px;
  background-color: #fff;
  z-index: 999;
  box-shadow:#3e3d3d 0 0 15px ;
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
    z-index: 999;
  }
  .contentBox{
    text-align: center;
    img{
      display: inline-block;
      width: 210px;
      height: 210px;
      margin: 100px 0 20px 0;
      border:1px solid #d1d1d1;
    }
  }
}
</style>
