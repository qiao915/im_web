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
import { mapGetters } from 'vuex'

export default {
  components:{
    MaskLayer,
  },
  props: {
    propsData: {}
  },
  computed:{
    ...mapGetters(['loading']),
  },

  data(){
    return {
      isShowBox: true,
      userInfo:this.$cfg.userInfo,
      baseUrl: this.$cfg.userInfo.uploadUrl,
      wxQrcode: '',//微信二维码
      nowSelectName:'',
      UrlParams: {},
      countTime: 5,
      loopDownloadImg: null
    }
  },
  mounted(){
    this.UrlParams = this.$route.params
    this.nowSelectName = this.propsData.groupName
    this.getGroupImg()
  },
  methods:{

    //获取群二维码
    getGroupImg () {
      let params = {
        chatRoomName: this.UrlParams.chatRoomName,
        roomNickName: '',
        noWxGm: this.UrlParams.wxId,
        memberNoGm: this.UrlParams.memberNoGm,
      }

      let self = this
      self.$store.dispatch('showLoading')

      self.$http.post('/api/im/chatroom/getChatRoomQRCode.do',params).then(res=>{
        if(res.data.result){

          self.loopDownloadImg = window.setInterval(function(){
            if(self.countTime == 0){
              window.clearInterval(self.loopDownloadImg)
              self.loopDownloadImg = null
              self.countTime = 5
              self.$message.error('获取群二维码失败')
              self.$store.dispatch('hideLoading')
            }else{
              self.countTime--
              self.loopGetImg()
            }
          },3000)
        } else {
          self.$store.dispatch('hideLoading')
          self.$message.error('获取失败')
        }

      })
    },

    //循环请求群二维码
    loopGetImg () {
      this.$http.post('/api/im/chatroom/getUpdatedChatRoom.do',{
        chatRoomName: this.UrlParams.chatRoomName,
        merchantNo: this.$cfg.userInfo.memberNoMerchant
      }).then(res=>{
        if(res.data.result && res.data.returnObject.qrcode){

          this.$store.dispatch('hideLoading')
          window.clearInterval(this.loopDownloadImg)
          this.loopDownloadImg = null
          this.countTime = 5
          this.wxQrcode = res.data.returnObject.qrcode
        }
      })
    },

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
