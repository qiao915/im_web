<template><!--新消息  -->
  <div style="padding-top:45px;padding-right:270px;">
      <div class="head_title" @click="goBack()">返回</div>
      <div class="wrap_box">
        <div class="wrap_head">
          <span>
            <img class="wrap_head_img" :src="dynamicArr.headImg">
            <!-- <img @click="checkedFriendsCircle()" class="wrap_head_img" :src="item.headImg" title="查看朋友圈"> -->
            <span class="wrap_head_name">
              <span class="blue_text">{{dynamicArr.nickname}}</span>
              <span class="time">{{dynamicArr.createDate}}</span>
            </span>
          </span>
        </div>
        <div class="wrap_content">
          <!-- 图文 -->
          <span v-if="dynamicArr.type == 1">
            <div class="" >
                <p ref="content_over_hide"
                :class="[text_over_hide,listLength == true ? 'minHeight' : 'autoHeight']"
                v-html="calculateTextContent(dynamicArr.content)"
                >
              </p>
              <!-- <p class="showMore" @click="packUp()">{{showMore}}</p> -->
            </div>
            <div class="wrap_content_img" >
              <img v-for="(list, index) in dynamicArr.imgAddr" :src="list" @click="downloadImg(list, index)" :key="index">
            </div>
          </span>
          <!--  纯文字  -->
          <span v-if="dynamicArr.type == 2">
            <div class="" >
                <p ref="text_content"
                :class="[listLength == true ? 'minHeight' : 'autoHeight']"
                v-html="calculateTextContent(dynamicArr.content)"
                >
              </p>
              <!-- <p class="showMore" @click="packUp()">{{showMore}}</p> -->
            </div>
          </span>
          <!-- 3分享 4歌曲分享  -->
          <span v-if="dynamicArr.type == 4 || dynamicArr.type == 5 || dynamicArr.type == 3">
            <p ref="text_content"
            :class="[listLength == true ? 'minHeight' : 'autoHeight']"
            v-html="calculateTextContent(dynamicArr.content)">
            </p>
            <div class="wrap_content_share" @click="openShare(dynamicArr.shareurl)">
              <div class="share_img">
                <img :src="dynamicArr.imgAddr" alt="">
              </div>
              <div class="share_title">{{dynamicArr.sharetitle}}</div>
            </div>
          </span>
          <!-- 视频 -->
          <span v-if="dynamicArr.type == 15">
            <!-- 原生video 组件 -->
            <div class="" >
                <p ref="text_content" :class="[listLength == true ? 'minHeight' : 'autoHeight']">{{dynamicArr.content}}</p>
              <p class="showMore" @click="packUp()">{{showMore}}</p>
            </div>
            <div class="video_box">
              <MyVideo :videoUrl="dynamicArr.shareurl" :poster="dynamicArr.imgAddr"></MyVideo>
            </div>
          </span>

          <div class="wrap_content_dianzan">
            <span v-if="!dynamicArr.isLike">
                <img src="../../../static/img/icon/dianzan.png" @click="giveLike(item)" title="点赞">
            </span>
            <span v-if="dynamicArr.isLike">
                <img src="../../../static/img/icon/dianzan_a.png" @click="giveLike(item)" title="点赞">
            </span>
            <img src="../../../static/img/icon/xiaoxi.png" @click="showComment(true,item)" title="评论">
          </div>

          <span v-if="dynamicArr.likes != '' ">
            <div class="wrap_content_dianzanjilu" >
              <div class="dianzaiList">
                <i class="aixin"></i>
                <span v-for="list in (dynamicArr.likes)">{{list.memberName}}</span>
              </div>
            </div>
          </span>

          <span v-if="dynamicArr.comments != '' ">
            <div class="pinglunjilu">
              <p class="commentLi"
                v-for="(list, index) in (dynamicArr.comments)"
                :key="index"
                @mouseover="onmouseover(index)"
                @mouseout="onmouseout()"
              >
                <span v-if="list.tonickname">
                  <span class="blue_text">{{list.nickname || list.memberName}}</span>回复<span class="blue_text">{{list.tonickname}}</span><span v-html="calculateTextContent(list.content)"></span>
                </span>
                <span v-else>
                  <span class="blue_text">{{list.nickname || list.memberName}}：</span><span v-html="calculateTextContent(list.content)"></span>
                </span>
                <span class="toComment" v-show="showCommentTo && index == current" @click="showComment(false,dynamicArr,list)">回复</span>

              </p>
            </div>
          </span>

          <div class="wrap_content_pinglun cf" v-if="isShowComment">
            <el-form  ref="form" :model="form">
              <el-form-item>
                <el-input type="textarea" style="width:100%;" :placeholder="commentPlaceholder" v-model="form.comment" @focus="showEmoji = false" :autosize="{ minRows: 4}"></el-input>
                <i class="icon-c iconbiaoqing" @click="chooseEmoji()" title="表情"></i>
              </el-form-item>
              <span style="float:right">
                  <el-button  type="success" @click="commentDynamic(dynamicArr)">发送</el-button>
              </span>
            </el-form>
            <!--表情弹窗  -->
            <transition name="showbox">
              <div class="emojiBox" v-show="showEmoji">
                <Expression @onFaceClick="sendEmoji"></Expression>
              </div>
            </transition>
          </div>

        </div>
      </div>
  </div>
</template>

<script>
import Bus from '../Data/bus.js'
import MyVideo from '../core/MyVideo'
import Autolinker from 'autolinker'
import emoticon from '../../utils/emoticon'
import Expression from '../Chat/Expression.vue'

const autolinker = new Autolinker({
  stripPrefix: false
})

export default {
  components:{
    MyVideo,
    Expression
  },
  data(){
    return{
      text_over_hide:'text_over_hide',
      userInfo:this.$cfg.userInfo,
      nowSelectInfo:this.$cfg.nowSelectInfo,
      isShowComment: false,
      likeStatus: 1,  //0已点赞  1 未点赞
      listLength: false,  //true超出隐藏  false自适应高度
      showMore: '', //"全文" 还是 "收起"
      textContent: "包含这段海底隧道的线路名称江省内串联哒哒哒哒哒甘肃省喂喂喂哒多宁波市和舟山市。(“甬”为宁波市简称)甬舟铁路之所三生三受到社会广泛关注，正是因为连接北仑至金塘的金塘水道采用隧道形式过海。所得到的多多多多多多多多多多多多多少时诵诗书所所所所所所所少时诵诗书所事实上多多多多多多多多多多多多多多甬舟铁路全长77公里，时速250公里，将以旅游客流为主，兼顾城际客流。在初步方案中，海底隧道全长16.2公里，其中海底盾构段长10.87公里。",
      form:{
        desc: '',
      },
      dynamicArr:{},
      showCommentTo:false,
      current:0,
      commentPlaceholder:'',//评论框placeholder
      saveCommentReply:[],  //保存回复该条评论的数据
      countTime: 8,
      showEmoji: false
    }
  },
  mounted(){
    // let te = this.$refs.sfsf.offsetHeight
    // //console.log(te)
    // if(te > 100){
    //   this.showMore = '全文'
    //   this.listLength = true
    // }else {
    //   this.showMore = ''
    // }
     this.getDynamicDetail()
  },
  watch:{
    $route(){
      this.getDynamicDetail()
    }
  },
  methods:{
    getDynamicDetail(){
      let params = this.$route.params

      this.$http({
        type:'post',
        url:'/api/imh5/getFriendsInfo.do',
        params:{
          code:params.friendsCode
        }
      }).then((res)=>{
        if(res.data.result == true){
          let data = res.data.returnObject
          data.imgAddr = data.imgAddr.split(',')

          if(data.likes){
            data.likes.forEach((e)=>{
                if(e.username == this.nowSelectInfo.noWx){
                  data.isLike = true
                }else{
                  data.isLike = false
                }
            })
          }

          this.dynamicArr = data
        }else{
          this.$message.error(re.data.errorMessage)
        }
      })
    },

    chooseEmoji () {
      this.showEmoji = !this.showEmoji
    },

    //选择表情
    sendEmoji (val, type) {
      let code, tmp
      if (type === 'emoji') {
        tmp = `<${val}>`
        code = emoticon.getCodeByText(tmp)
        if (!code) {
          val = `[${val}]`
        } else {
          code = `0x${code}`
          val = String.fromCodePoint(code)
        }
      }

      this.form.comment += val
    },
    //评论朋友圈
    commentDynamic(item) {
          if(this.form.comment && this.form.comment.length>500){
            this.$message({
              type: 'error',
              message: '评论只能少于500字哦！!'
            });
            return false
          }

          this.form.comment = emoticon.formatSendContent(this.form.comment)

          let params = {
            memberNo : item.memberNo,    // 必填 客户编号
          //  shopNo : this.nowSelectInfo.shopNo,      //必填 门店编号
            shopWxNo : this.nowSelectInfo.noWx,    //必填 门店微信号
            toFriendsId: item.friendsId, //必填  被评论微信号信息
            toConent: this.form.comment,     //必填 评论内容
          }

          if(this.saveCommentReply){
              params.toWxNo = this.saveCommentReply.username
              params.toWxName = this.saveCommentReply.nickname
              params.toCommentCode = this.saveCommentReply.code
          }

          if (this.form.comment) {
            this.$http.post('/api/imh5/index/toComment.do',params).then(res =>{
              if(res.data.result == true){
                this.$message({
                  type: 'success',
                  message: '评论成功!'
                });
                this.form.comment = ''
                this.saveCommentReply = []
                this.getDynamicDetail()
              }else{
                this.$message({
                  type: 'error',
                  message: res.data.errorMessage
                });
              }
            })
          } else {
            this.$message({
              type: 'error',
              message: '请先填写评论内容!'
            });
          }
      },
      //朋友圈点赞
      giveLike(item){
        //if(!item.isLike){}
          this.$http({
            type:'post',
            url:'/api/imh5/index/toImLike.do',
            params:{
              toWxNo : item.noWx,    //必填 被评论的微信号
              toFriendsId : item.friendsId,   //必填  被评论的朋友圈id
              memberNo : item.memberNo,      //必填   客户编号
            //  shopNo : this.nowSelectInfo.shopNo,    //必填 店铺编号
              shopWxNo : this.nowSelectInfo.noWx,            //必填  店铺微信号
            }
          }).then(res=>{
            if(res.data.result == true ){
              console.log(res)
              this.$message({
                type: 'success',
                message: '点赞成功!'
              });
              // this.likeStatus = 0
              this.getDynamicDetail(false)
            }else{
              this.$message({
                type: 'error',
                message: res.data.errorMessage
              });
            }
          })
      },
    goBack(){
      let params = this.$route.params;
      this.$router.push({
        path: `/im-web/app/${params.wxId}/dynamic/friends/${this.nowSelectInfo.noWx}`
      });
       Bus.$emit('changeLeftList')
      // this.$store.dispatch('is_circleFriendsList',1)
    },
      //全文 or 收起
      packUp(){
        this.listLength = !this.listLength
        if(this.listLength){
          this.showMore = '全文'
        }else{
          this.showMore = '收起'
        }
      },
      // 展开/关闭评论圈
      showComment(flag, item, list){
        if(flag){
          //评论朋友圈
          this.commentPlaceholder = '评论'
          this.saveCommentReply = []

        }else{
          //评论别人回复
          this.commentPlaceholder = '回复' + list.nickname
          this.saveCommentReply = list
        }

      this.isShowComment = !this.isShowComment
      },
      //打开分享
      openShare(url){
        let openUrl

        if (!url.startsWith('http')) {
           openUrl = 'http://' + url
        } else {
          openUrl = url
        }

        window.open(openUrl)
      },

      onmouseover (index) {
        this.showCommentTo = true
        this.current = index
      },

      onmouseout () {
        this.showCommentTo = false
        this.current = null
      },

      //查看图片
      downloadImg (item, index) {
        let url = item.includes(this.$cfg.userInfo.uploadUrl)
        if(!url){
          let self = this
          let params = {
              noWx: self.nowSelectInfo.noWx,
              friendsId: this.dynamicArr.friendsId,
              picUrl: item,
              memberNoGm: self.userInfo.memberNoGm
          }
          self.$http.post('/api/friendsPic/toDownload.do',params).then(res=>{
            if(res.data.result){
              self.loopDownloadVideo = window.setInterval(function(){
                if(self.countTime == 0){
                  window.clearInterval(self.loopDownloadVideo)
                  self.countTime = 8
                }else{
                  self.countTime--
                  self.toDownloadImg(item, index)
                }
              },2000)

            }
          })
        }

      },

      //查看图片
      toDownloadImg (item, index) {
        this.$http.post('/api/imh5/getFriends.do',{
          code: this.dynamicArr.code
        }).then(res=>{
          if(res.data.result){
            let data = res.data.returnObject
            let getUrl = data.includes(this.$cfg.userInfo.uploadUrl)

            if(data && getUrl){
              window.clearInterval(this.loopDownloadVideo)
              this.countTime = 8
              this.getDynamicDetail()
              // item = ''
              // item = data
              console.log('图片已下载完毕')
            }
          }
        })
      },

      calculateTextContent (con) {
        if (!con) {
          return ''
        }

        con = this.htmlEncode(con)
        con = this.replaceLink(con)
        con = this.replaceFace(con)

        return con
      },

      // 将聊天信息中的 html 内容文本化，防止 xss 攻击
      htmlEncode (html) {
        return document.createElement('div').appendChild(document.createTextNode(html)).parentNode.innerHTML
      },
      replaceLink (con) {
        con = autolinker.link(con)
        return con
      },
      // 在发送信息之后，将输入的内容中属于表情的部分替换成emoji图片标签
      replaceFace (con) {
        con = emoticon.emoticonFormat(con)
        con = emoticon.getEmoticonByCode(con)

        return con
      },

  },

  destroyed(){
    Bus.$off('changeLeftList')
  },
}
</script>

<style lang="less" scoped>
.blue_text{
  color: #0c69e0;
}
.video-js .vjs-big-play-button{}
.head_title{
  height: 45px;
  line-height: 45px;
  padding-left: 20px;
  box-sizing: border-box;
  position: fixed;
  top: 88px;
  color: #08A406;
  font-size: 16px;
  cursor: pointer;
}
.wrap_box{
  width: 100%;
  //max-width: 800px;
  min-width: 448px;
  height: 924px;
  overflow: auto;
  padding: 35px 0 0 20px;
  box-sizing: border-box;
  font-size: 14px;
  .wrap_head{
    display: flex;
    flex:1;
    justify-content: space-between;
    align-items: center;
    .wrap_head_img{
      width: 40px;
      height: 40px;
      margin-right: 20px;
    }
    .wrap_head_name{
      display: inline-flex;
      flex:1;
      justify-content: space-between;
      flex-direction: column;
      .time{font-size: 12px;margin-top: 5px;}
    }
    .icon_delete{
      cursor: pointer;
    }
  }
  .wrap_content{
    width: 100%;
    padding:10px 10px 10px 65px;
    box-sizing: border-box;
    overflow: hidden;
    line-height: 1.8;
    color: #333;
    .defaultClass{}
    .minHeight{
      height: 100px;
      overflow: hidden;
    }
    .autoHeight{
      height: auto;
    }
    .showMore{
      color: #0c69e0;
      cursor: pointer;
      &:hover{text-decoration: underline;}
    }
  }
  .wrap_content_img{
    margin-top: 10px;
    img{
      margin: 10px 10px 0 0;
      width: 180px;
      height: 180px;
      cursor: pointer;
    }
  }
  .wrap_content_dianzan{
    margin: 20px 0 10px 0;
    display: flex;
    justify-content: space-between;
    img{cursor: pointer;}
  }
  .wrap_content_dianzanjilu{
    width: 100%;
    border-radius: 2px;
    background-color: #e4e4e4;
    padding: 10px;
    box-sizing: border-box;
    .dianzaiList{
      color: #0c69e0;
      .aixin{
        width: 16px;
        height: 16px;
        display: inline-block;
        background: url("../../../static/img/icon/taoxin.png") no-repeat;
        background-size: 100% 100%;
        background-position: center center;
        vertical-align: sub;
        margin-right: 5px;
      }
      span{margin-right: 8px;}
    }
  }
  .pinglunjilu{
    background-color: #e4e4e4;
    padding: 10px;
    box-sizing: border-box;
    margin-bottom: 10px;
    padding-top:10px;
    border-top: 1px solid #cacaca;

    .commentLi{
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      box-sizing: border-box;
      &:hover{
        background: #d0d0d0;
      }
    }

    .toComment{
      cursor: pointer;
      color: #0c69e0;

    }
  }
  .wrap_content_pinglun{

    .emojiBox {
      display: flex;
      flex-wrap: wrap;
      z-index: 1;
      /*width: 483px;
      height: 210px;*/
      /*padding: 5px;*/
      background-color: #fff;

      .expression{
        width: 460px;
      }
    }
    .showbox-enter-active,
    &.showbox-leave-active {
      transition: all 0.5s;
    }
    // .showbox-enter,&.showbox-leave-active{
    //   opacity: 0;
    // }

    .iconbiaoqing{
      position: absolute;
      bottom: 10px;
      left: 14px;
    }
    .icon-c {
      width: 26px;
      height: 26px;
      color: #5d5d5d;

      &::before {
        font-family: iconfont;
        width: 26px;
        height: 26px;
        font-size: 26px;
        display: inline-block;
      }

      &:hover {
        &::before {
          color: #08A406;
        }
      }
    }
  }
}
</style>
