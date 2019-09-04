<template><!--朋友圈列表  -->
  <div style="padding-top:45px;padding-right:270px;">
      <div class="head_title">
        <span class="head_tab" @click="changeTab(index)" v-for="(item, index) in tabItems" :class="{actived: changeActived == index}" :key="index">
          {{item.tabName}}
          <span v-if="item.tabNum">
            <i class="quan">{{item.tabNum}}</i>
          </span>
        </span>
      </div>
      <div class="wrap_box">
            <div class="newMessage_box" @click="checkInteractMessage()" v-if="interactCount">
                <!-- <img :src="newImgUrl" alt=""> -->
                <span>{{interactCount}}条新消息</span><i class="el-icon-arrow-right"></i>
            </div>
            <!-- 循环 -->
            <div v-for='(item, index) in Friendsdynamic' :key="index" class="dynamicBox">
              <div class="wrap_head">
                <span>
                  <img @click="checkedFriendsCircle(item)" class="wrap_head_img" :src="item.headImg" title="查看朋友圈111">
                  <span class="wrap_head_name">
                    <span class="blue_text">{{item.memberName}}</span>
                    <span class="time">{{item.createDate}}</span>
                  </span>
                </span>
              </div>
              <div class="wrap_content">
                <!-- 图文 -->
                <span v-if="item.type == 1">
                  <div class="" >
                      <p ref="content_over_hide" :class="[text_over_hide,listLength == true ? 'minHeight' : 'autoHeight']" v-html="calculateTextContent(item.content)"></p>
                    <!-- <p class="showMore" @click="packUp()">{{showMore}}</p> -->
                  </div>
                  <div class="wrap_content_img">
                    <img v-for="(list, index) in item.imgAddr" :src="list" @click="downloadImg(item, index)" :key="index">
                  </div>
                </span>
                <!--  纯文字  -->
                <span v-if="item.type == 2">
                  <div class="" >
                      <p ref="text_content"
                      :class="[listLength == true ? 'minHeight' : 'autoHeight']"
                       v-html="calculateTextContent(item.content)"
                      >
                    </p>
                    <!-- <p class="showMore" @click="packUp()">{{showMore}}</p> -->
                  </div>
                </span>
                <!-- 3分享 4歌曲分享  -->
                <span v-if="item.type == 4 || item.type == 5 || item.type == 3">
                  <p ref="text_content"
                  :class="[listLength == true ? 'minHeight' : 'autoHeight']"
                  v-html="calculateTextContent(item.content)">
                  </p>
                  <div class="wrap_content_share" @click="openShare(item.shareurl)">
                    <div class="share_img">
                      <img :src="item.imgAddr" alt="">
                    </div>
                    <div class="share_title">{{item.sharetitle}}</div>
                  </div>
                </span>
                <!-- 视频 -->
                <span v-if="item.type == 15">
                  <!-- 原生video 组件 -->
                  <div class="" >
                      <p ref="text_content" :class="[listLength == true ? 'minHeight' : 'autoHeight']">{{item.content}}</p>
                    <p class="showMore" @click="packUp()">{{showMore}}</p>
                  </div>
                  <div class="video_box">
                    <MyVideo :videoUrl="item.shareurl" :poster="item.imgAddr"></MyVideo>
                  </div>
                </span>

                <div class="wrap_content_dianzan">
                  <span v-if="!item.isLike">
                      <img src="../../../static/img/icon/dianzan.png" @click="giveLike(item)" title="点赞">
                  </span>
                  <span v-if="item.isLike">
                      <img src="../../../static/img/icon/dianzan_a.png" @click="giveLike(item)" title="点赞">
                  </span>
                  <img src="../../../static/img/icon/xiaoxi.png" @click="showComment(true,item)" title="评论">
                </div>

                <span v-if="item.likes != '' ">
                  <div class="wrap_content_dianzanjilu" >
                    <div class="dianzaiList">
                      <i class="aixin"></i>
                      <span v-for="list in (item.likes)">{{list.memberName}}</span>
                    </div>
                  </div>
                </span>

                <span v-if="item.comments != '' ">
                  <div class="pinglunjilu">
                    <p class="commentLi"
                      v-for="(list, index) in (item.comments)"
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
                      <span class="toComment" v-show="showCommentTo && index == current" @click="showComment(false,item,list)">回复</span>
                    </p>
                  </div>
                </span>

                <div class="wrap_content_pinglun cf" v-if="item.showFlag">
                  <el-form  ref="form" :model="form">
                    <el-form-item>
                      <el-input type="textarea" style="width:100%;" :placeholder="commentPlaceholder" v-model="form.comment" :autosize="{ minRows: 4}" @focus="showEmoji = false"></el-input>
                      <i class="icon-c iconbiaoqing" @click="chooseEmoji()" title="表情"></i>
                    </el-form-item>
                    <span style="float:right">
                        <el-button  type="success"@click="commentDynamic(item)">发送</el-button>
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
            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="isLoading" infinite-scroll-distance="10">
              <div class="loading">没有更多数据...</div>
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
    Expression,
  },

  data(){
    let that = this
    return{
      text_over_hide:'text_over_hide',
      tabItems:[
        {tabName: '全部'},
        {tabName: '待评论', tabNum:''},
        {tabName: '待回复', tabNum:''},
      ],
      Friendsdynamic:[],//朋友圈列表
      changeActived: 0,
      newImgUrl: '',
      interactCount: 0,
      listLength: false,  //true超出隐藏  false自适应高度
      allCircleFriends:true,//显示最新消息
      showMore: '', //"全文" 还是 "收起"
      form:{
        comment: '',
      },
      userInfo: this.$cfg.userInfo,
      nowSelectInfo:this.$cfg.nowSelectInfo,
      pageNo:1,
      pageSize:10,
      scrollTop:'',
      isLoading:false,//默认没有在加载数据
      showCommentTo:false,
      current:0,
      commentPlaceholder:'',//评论框placeholder
      saveCommentReply:[],  //保存回复该条评论的数据
      countTime: 8,
      showEmoji: false
    }
  },
  create(){

  },
  mounted(){
    this.initData()
    this.$nextTick(()=>{
      let te = this.$refs.content_over_hide
      return
      if( te > 100 ){
        this.showMore = '全文'
        this.listLength = true
      }else {
        this.showMore = ''
      }
    })
  },
  methods:{
    initData(){
      this.getCircleList(false)
      this.loadPendingCommentCount()
      this.loadToReplyFriendsCount()
      this.loadInteractMessageCount()

    },
    //获取朋友圈列表
    getCircleList(flag){
      this.isLoading = true

      let params ={
          noWxShop: this.nowSelectInfo.noWx,  //必填 中控微信号
        //  shopNo: this.nowSelectInfo.shopNo,    //必填 店铺编号
          pageNo: this.pageNo,    //必填 页码
      }
    //  console.log(params)
      this.$http({
        type:'post',
        url:'/api/imh5/index/getfriendData.do',
        params:params
      }).then(res=>{
        if(res.data.result == true){
          var data = res.data.returnObject.friendForumPage
          var totalPage = Math.ceil(data.total / data.limit)  //总页数

          if(data.rows){
            data.rows.forEach((item)=>{
              item.showFlag = false

              //如果是图片 转为对象
              if(item.type == 1){
                item.imgAddr = item.imgAddr.split(',')
              }

              //后台没直接返回字段
              if(item.likes){
                item.likes.forEach((e)=>{
                    if(e.username == this.nowSelectInfo.noWx){
                      item.isLike = true
                    }else{
                      item.isLike = false
                    }
                })
              }

            })
          }

          if(flag){
            //连续加载
            if(this.pageNo > totalPage){
              this.isLoading = true
              return false
            }
            this.Friendsdynamic = this.Friendsdynamic.concat(data.rows)
            data.total === 0 ? this.isLoading = true : this.isLoading = false
          }else{
            //第一次加载
            this.Friendsdynamic = []
            this.Friendsdynamic = data.rows
            this.isLoading = false
          }

        //  console.log(this.Friendsdynamic)
        }
      })
    },
    loadMore(){
       this.isLoading = true
       this.pageNo++;
       if(this.changeActived == 0){
         this.getCircleList(true)
       }else if(this.changeActived == 1){
         this.loadPendingCommentList(true)
       }else{
         this.loadToReplyFriendsList(true)
       }

     },
    //切换
    changeTab(index){
      this.changeActived = index
      if(index === 0){
        //全部
        this.pageNo = 1
        this.getCircleList(false)
      }else if(index === 1){
        //待评论
        this.pageNo = 1
        this.loadPendingCommentList(false)
      }else{
        //待回复
        this.pageNo = 1
        this.loadToReplyFriendsList(false)
      }
    },
    //待评论列表
    loadPendingCommentList(flag){
      this.$http({
        type:'post',
        url:'/api/imh5/loadPendingCommentFriends.do',
        params:{
          noWxShop: this.nowSelectInfo.noWx,  //必填 中控微信号
        //  shopNo: this.nowSelectInfo.shopNo,    //必填 店铺编号
          pageNo:this.pageNo
        }
      }).then((res)=>{
        if(res.data.result == true){
          let data = res.data.returnObject
          let totalPage = Math.ceil(data.total / data.limit)  //总页数

          if(data.rows){
            data.rows.forEach((item)=>{
              item.showFlag = false
              //如果是图片 转为对象
              if(item.type == 1){
                item.imgAddr = item.imgAddr.split(',')
              }

              if(item.likes){
                item.likes.forEach((e)=>{
                    if(e.username == this.nowSelectInfo.noWx){
                      item.isLike = true
                    }else{
                      item.isLike = false
                    }
                })
              }

            })
          }

          if(flag){
            if(this.pageNo > totalPage){
              this.isLoading = true
              return false
            }
            this.Friendsdynamic = this.Friendsdynamic.concat(data.rows)
            data.total === 0 ? this.isLoading = true : this.isLoading = false
          }else{
            this.Friendsdynamic = []
            this.Friendsdynamic = data.rows
            this.isLoading = false
          }

        }
      })
    },
    //待回复列表
    loadToReplyFriendsList(flag){
      this.$http({
        type:'post',
        url:'/api/imh5/loadToReplyFriends.do',
        params:{
          noWxShop: this.nowSelectInfo.noWx,        //必填 中控微信号
        //  shopNo: this.nowSelectInfo.shopNo, //必填 店铺编号
          pageNo:this.pageNo,
          toReplyFlag:1
        }
      }).then((res)=>{
        if(res.data.result == true){
          let data = res.data.returnObject.friendForumPage
          let totalPage = Math.ceil(data.total / data.limit)  //总页数
          if(data.rows){
            data.rows.forEach((item)=>{
              item.showFlag = false

              //如果是图片 转为对象
              if(item.type == 1){
                item.imgAddr = item.imgAddr.split(',')
              }

              if(item.likes){
                item.likes.forEach((e)=>{
                    if(e.username == this.nowSelectInfo.noWx){
                      item.isLike = true
                    }else{
                      item.isLike = false
                    }
                })
              }

            })
          }

          if(flag){
            if(this.pageNo > totalPage){
              this.isLoading = true
              return false
            }
            this.Friendsdynamic = this.Friendsdynamic.concat(data.rows)
            data.total === 0 ? this.isLoading = true : this.isLoading = false
          }else{
            this.Friendsdynamic = []
            this.Friendsdynamic = data.rows
            this.isLoading = false
          }


        }
      })
    },
    //待评论数量
    loadPendingCommentCount(){
      this.$http({
        type:'post',
        url:'/api/imh5/loadPendingCommentCount.do',
        params:{
          noWxShop: this.nowSelectInfo.noWx,  //必填 中控微信号
        //  shopNo: this.nowSelectInfo.shopNo,    //必填 店铺编号
        }
      }).then((res)=>{
        if(res.data.result == true){
          let data = res.data.returnObject
          if(data){
            this.tabItems[1].tabNum = data
          }

        }
      })
    },
    //待回复数量
    loadToReplyFriendsCount(){
      this.$http({
        type:'post',
        url:'/api/imh5/loadToReplyFriendsCount.do',
        params:{
          noWxShop: this.nowSelectInfo.noWx,  //必填 中控微信号
      //    shopNo: this.nowSelectInfo.shopNo,    //必填 店铺编号
        }
      }).then((res)=>{
        if(res.data.result == true){
          let data = res.data.returnObject
          if(data){
            this.tabItems[2].tabNum = data
          }
        }
      })
    },
    //朋友圈互动消息条数
    loadInteractMessageCount(){
      this.$http({
        type:'post',
        url:'/api/imh5/loadInteractMessageCount.do',
        params:{
          noWxShop: this.nowSelectInfo.noWx,  //必填 中控微信号
          memberNoGm: this.userInfo.memberNoGuid,   //必填 导购编号
        }
      }).then((res)=>{
        if(res.data.result == true){
          let data = res.data.returnObject
          this.interactCount = data
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
                this.pageNo = 1
                this.loadPendingCommentCount()
                this.loadToReplyFriendsCount()
                this.loadInteractMessageCount()
                this.saveCommentReply = []
                console.log(this.changeActived)
                if(this.changeActived === 0){
                  this.getCircleList(false)
                }else if(this.changeActived === 1){
                  this.loadPendingCommentList(false)
                }else{
                  this.loadToReplyFriendsList(false)
                }
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
            if(res.data.result == true){
              this.$message({
                type: 'success',
                message: '点赞成功!'
              });
              this.pageNo = 1
              this.loadPendingCommentCount()
              this.loadToReplyFriendsCount()
              this.loadInteractMessageCount()

              if(this.changeActived === 0){
                this.getCircleList(false)
              }else if(this.changeActived === 1){
                this.loadPendingCommentList(false)
              }else{
                this.loadToReplyFriendsList(false)
              }
            }else{
              this.$message({
                type: 'error',
                message: res.data.errorMessage
              });
            }
          })
      },
      //轮询查询点赞状态


      //最新消息 改变左侧列表
      checkInteractMessage(){
        Bus.$emit('newList','getInteractMessage')
      //  this.$store.dispatch('is_circleFriendsList',3)
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

        item.showFlag = !item.showFlag
      },

      //点击头像 查看好友朋友圈
      checkedFriendsCircle(item){
        let params = this.$route.params;

        if(item.optFlag == 1){  //自己发送
          this.$router.push({
            path: `/im-web/app/${params.wxId}/dynamic/mine/${this.nowSelectInfo.noWx}`
          });
        }else{  //朋友发送
          this.$router.push({
            path: `/im-web/app/${params.wxId}/dynamic/customer/${item.memberNo}`
          });
        }
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
        let self = this
        let url = item.imgAddr[index].includes(self.$cfg.userInfo.uploadUrl)
        if(!url){
          let params = {
              noWx: self.nowSelectInfo.noWx,
              friendsId: item.friendsId,
              picUrl: item.imgAddr,
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
          code: item.code
        }).then(res=>{
          if(res.data.result){
            let data = res.data.returnObject
            let getUrl = data.includes(this.$cfg.userInfo.uploadUrl)
            let imgArr = item.imgAddr
            if(data && getUrl){
              window.clearInterval(this.loopDownloadVideo)
              this.countTime = 8

              if(this.changeActived == 0){
                this.getCircleList(false)
              }else if(this.changeActived == 1){
                this.loadPendingCommentList(false)
              }else{
                this.loadToReplyFriendsList(false)
              }
              // imgArr[index] = data
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
     Bus.$off('newList')
  }

}
</script>

<style lang="less" scoped>
.dynamicBox{
  margin-bottom: 10px;
}
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
  top: 70px;
  font-size: 16px;
  .actived{color: #08A406;}
  .head_tab{
    margin-right: 30px;
    position: relative;
    cursor: pointer;
    .quan{
      position: absolute;
      top: -10px;
      right: -10px;
      background-color: #f31919;
      width: 18px;
      height: 18px;
      line-height: 18px;
      text-align: center;
      font-size: 12px;
      border-radius: 50%;
      color: #fff;
    }
  }
}
.wrap_box{
  width: 100%;
  //max-width: 800px;
  min-width: 448px;
  height: 924px;
  overflow-y: auto;
  padding: 20px 0 100px 20px;
  box-sizing: border-box;
  font-size: 14px;
  .newMessage_box{
    width: 140px;
    height: 45px;
    line-height: 45px;
    border-radius: 4px;
    margin: 0 auto;
    margin-bottom: 20px;
    text-align: center;
    background-color: #7f7f7f;
    color: #fff;
    cursor: pointer;
    img{
      width: 25px;
      height: 25px;
      border-radius: 4px;
      vertical-align: middle;
      margin-right: 10px;
    }
  }
  .wrap_head{
    display: flex;
    flex:1;
    justify-content: space-between;
    align-items: center;
    .wrap_head_img{
      width: 40px;
      height: 40px;
      margin-right: 20px;
      cursor: pointer;
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
      .text_over_hide{
        display: block;
      }
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

    .wrap_content_share{
      width: 100%;
      height: 80px;
      background-color: #e4e4e4;
      cursor: pointer;
      display: flex;
      align-items: center;
      vertical-align: middle;
      .share_img{
        margin: 0 40px 0 10px;
        img{
          width: 60px;
          height: 60px;
          border-radius: 3px;
          align-items: center;
        }
      }
      .share_title{
        font-size: 14px;
        color: #000;
      }
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
.video_box{
  margin-top: 20px;
}
.loading{
  text-align: center;
  margin-top: 100px;
  color: #676767;
}
</style>
