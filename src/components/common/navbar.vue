<template>
  <div class="contentBox">
    <div class="headNav clear_after">
      <div class="logo">
        <img :src="userImage" class="logo-img">
      </div>
      <div class="head_text">
        <p>欢迎您，{{user.memberNameGuid}}</p>
        <p>已登录微信数量： {{serviceInfo.length}}个</p>
      </div>
      <div class="iconfont">
        <img  :class="[hideBar ? 'aa' :'go']" src="../../../static/img/packup_left.png"  @click="hideLeftBar()">
      </div>

      <!-- 隐藏配置入口 -->
      <div class="headRight_1" @click="moreFunction()" title="功能大全">
						<span class="gongneng"></span>
						<span>功能大全</span>
      </div>
      <!-- <div class="headRight_2">
						<span class="zhuye"></span>
						<span>进入后台</span>
      </div> -->
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { createUploadUrl } from '@/tools/resourceTool'

export default {
  name: 'Navbar',
  computed: {
    ...mapGetters([
      'is_moreFunction',
      'userInfo',
      'hide_leftBar'
    ]),
    userImage () {
      return createUploadUrl(this.userInfo.headAddress, this.userInfo.uploadUrl)
    }
  },
  data () {
    return {
      user: this.$cfg.userInfo,
      serviceInfo: this.$cfg.serviceInfoOrigin,
      isShowMoreFunction: false,
      hideBar: true
    }
  },
  mounted () {},
  methods: {
    moreFunction () {
      this.isShowMoreFunction = !this.isShowMoreFunction
      this.$store.dispatch('is_moreFunction', this.isShowMoreFunction)
    },

    //
    hideLeftBar() {
        this.hideBar = !this.hideBar
        this.$store.dispatch('hide_leftBar', this.hideBar)
    },
  }
}
</script>
<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.contentBox {
  width: 100%;
  margin: 0 auto;
  background: #fff;

  box-sizing: border-box;
  box-shadow: 2px 2px #e2e2e2;
  // position: relative;
  .headNav {
    width: 100%;
    height: 68px;
    background-color: #2e3238;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    color: #fff;
    .logo {
      margin: 0 10px;
      box-sizing: border-box;
      .logo-img {
        width: 48px;
        height: 48px;
        display: block;
      }
    }
  }
  .headRight_1 {
    position: absolute;
    right: 10%;
    text-align: center;
    cursor: pointer;
    .gongneng {
      width: 32px;
      height: 32px;
      display: -webkit-inline-box;
      background: url("../../../static/img/gengduogongneng.png");
      background-size: cover;
    }
    span {
      display: inherit;
      text-align: center;
    }
  }
  .headRight_2 {
    position: absolute;
    right: 3%;
    text-align: center;
    cursor: pointer;
    .zhuye {
      width: 32px;
      height: 32px;
      display: -webkit-inline-box;
      background: url("../../../static/img/zhuye.png");
      background-size: cover;
    }
    span {
      display: inherit;
      text-align: center;
    }
  }
}
.iconfont{
  margin-left: 30px;
  img{
    width: 25px;
    height: 25px;
    cursor: pointer;
    position: relative;
    top : 5px;
  }
}
.aa{transition: all 0.8s;}
.go{transform:rotateY(-180deg);transition: all 0.8s;}
</style>
