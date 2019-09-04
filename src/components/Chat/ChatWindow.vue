<template>
  <div class="message">
    <header class="header">
      <span class="friendname">{{chatRoomName}}</span>
      <span class="groupNum" v-if="chatFlag">({{groupMemberNum}})</span>
    </header>
    <div class="message-wrapper" ref="list" @scroll="onScroll($event)">
      <ul>
        <li v-for="(item, index) in singleChatRecords" :key="index" class="message-item">
          <div>
            <div class="time">
              <span>{{item.chatTime | time}}</span>
            </div>
            <!-- 10000系统消息    -->
            <!-- 318767153系统安全提示-->
            <div v-if="item.type==10000 || item.type==318767153">
              <div class="groupMessage_box">
                <span>
                  {{item.content}}
                  <span v-if="isFriends(item.content)" class="add_friends" @click="addFriends_again()">加好友</span>
                </span>

              </div>
            </div>
            <!-- type== 1文本  -->
            <div v-if="item.type==1">
              <div class="main" :class="{ self: item.senderFlag == 1 ? 'self' : '' }">
                <img
                  class="avatar"
                  width="36"
                  height="36"
                  :src="createMessageAvatar(item)"
                >
                <div class="content" @contextmenu.prevent="rightClickEvent($event,item)">
                  <div class="text text-content" v-html="calculateTextContent(item.content)"></div>
                </div>
              </div>
            </div>
            <!-- 47动画表情  -->
            <div v-if="item.type==47">
              <div class="main" :class="{ self: item.senderFlag == 1 ? 'self' : '' }">
                <img
                  class="avatar"
                  width="36"
                  height="36"
                  :src="createMessageAvatar(item)"
                >
                <div class="content" style="width:150px;" @contextmenu.prevent="rightClickEvent($event,item)">
                  <span v-if="item.resourcesPath">
                    <img :src="item.resourcesPath" style="width:100%;">
                  </span>
                  <span v-else>{{item.content}}</span>
                </div>
              </div>
            </div>
            <!-- 地图 -->
            <div v-if="item.type == 48">
              <div class="main" :class="{ self: item.senderFlag == 1 ? 'self' : '' }">
                <img
                  class="avatar"
                  width="36"
                  height="36"
                  :src="createMessageAvatar(item)"
                >
                <div class="map-c"  @contextmenu.prevent="rightClickEvent($event)">
                    <div class="mapCon" @click="clickMap(item)">
                        <span v-if="item.senderFlag == 1">
                          <h2 class="mapTop_title">{{ createMapContent(item).poiname }}</h2>
                        </span>
                        <span v-if="item.senderFlag == 2">
                          <h2 class="mapTop_title">{{ createMapContent(item).poiname }}</h2>
                          <p class="mapTop_title mapTop_p">{{ createMapContent(item).label }}</p>
                        </span>
                        <div :id="createMapId(item)" ref="miniMapBox" class="containerMap"></div>
                    </div>
                </div>
              </div>
            </div>
            <!-- 小程序 -->
            <div v-if="item.type == 494 ">
              <div class="main" :class="{ self: item.senderFlag == 1 ? 'self' : '' }">
                <img
                  class="avatar"
                  width="36"
                  height="36"
                  :src="createMessageAvatar(item)"
                >
                <div
                  class="mapContent appletBox"
                  @contextmenu.prevent="rightClickEvent($event,item)"
                >
                  <p>{{item.shareTitle}}</p>
                  <img :src="item.shareUrl || item.resourcesPath">
                  <div class="cardBottom">小程序</div>
                </div>
              </div>
            </div>
            <!--公众号 或个人名片 -->
            <div v-if="item.type ==42 ">
              <div class="main" :class="{ self: item.senderFlag == 1 ? 'self' : '' }">
                <img
                  class="avatar"
                  width="36"
                  height="36"
                  :src="createMessageAvatar(item)"
                >
                <div class="mapContent cardBox" @contextmenu.prevent="rightClickEvent($event,item)">
                  <div class="cardContent">
                    <img :src="redirectUrl(item.resourcesPath)" alt>
                    <div class="cardText">
                      <p>{{item.shareTitle}}</p>
                    </div>
                  </div>
                  <div v-if="item.type == 42"  class="cardBottom">名片</div>

                </div>
              </div>
            </div>

            <!--文件-->
            <div v-if="item.type == 495">
              <div class="main" :class="{ self: item.senderFlag == 1 ? 'self' : '' }">
                <img
                  class="avatar"
                  width="36"
                  height="36"
                  :src="createMessageAvatar(item)"
                >
                <div class="content no_ground_border file-content" @contextmenu.prevent="rightClickEvent($event,item)">
                  <div class="file-c">
                    <img :src="getStatic('static/img/file-icon.png')" class="file-img" @click="downloadFile(item)">
                    <div class="file-summary">
                      <p class="file-title">{{item.shareTitle}}</p>
                      <div class="download-btn" @click="downloadFile(item)" >{{ item.downloading ? '下载中...' : '下载' }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 语音 -->
            <div v-if="item.type == 34">
              <div class="main" :class="{ self: item.senderFlag == 1 ? 'self' : '' }">
                <img
                  class="avatar"
                  width="36"
                  height="36"
                  :src="createMessageAvatar(item)"
                >
                <div
                  class="content no_ground_border"
                  @contextmenu.prevent="rightClickEvent($event,item)"
                >
                  <div class="audio-content">
                    <audio-weixin :audio-src='item.resourcesPath' ></audio-weixin>
                    <!-- <audio-weixin :audio-src='item.resourcesPath' :showNowTime='item.content | audioTime'></audio-weixin> -->
                  </div>
                </div>
              </div>
            </div>
            <!-- type== 43  视频 -->
            <div v-if="item.type==43">
              <div class="main" :class="{ self: item.senderFlag == 1 ? 'self' : '' }">
                <img
                  class="avatar"
                  width="36"
                  height="36"
                  :src="createMessageAvatar(item)"
                >
                <div
                  class="content no_ground_border"
                  @contextmenu.prevent="rightClickEvent($event,item)"
                >
                  <div>
                    <div v-if="showVideo"  @click="downloadVideo(item, index)" class="videoBox"></div>

                    <video :src="item.resourcesPath"  @click="downloadVideo(item, index)"  @play="downloadVideo(item, index)" id="video" controls="controls" width="260" height="200"></video>
                  </div>
                </div>
              </div>
            </div>
            <!-- type === 3  图片 -->
            <div v-if="item.type == 3 ">
              <div class="main" :class="{ self: item.senderFlag == 1  ? 'self' : '' }">
                <img
                  class="avatar"
                  width="36"
                  height="36"
                  :src="createMessageAvatar(item)"
                >
                <div class="content" @contextmenu.prevent="rightClickEvent($event,item)">
                  <img
                    :src="item.resourcesPath"
                    style="display:inline-block;width:100%;"
                    @click="onImageClick(item)"
                  >
                </div>
              </div>
            </div>
            <!-- type== 43  活动   49文章-->
            <div v-if="item.type == 492 || item.type == 49 || item.type == 491 || item.type == 490">
              <div class="main" :class="{ self: item.senderFlag == 1  ? 'self' : '' }">
                <img
                  class="avatar"
                  width="36"
                  height="36"
                  :src="createMessageAvatar(item)"
                >
                <div
                  class="mapContent activityBox"
                  @contextmenu.prevent="rightClickEvent($event,item)"
                >
                  <a :href="openShareAct(item.shareUrl)" target="_blank">
                    <p style="padding-left:10px;">{{item.shareTitle}}</p>
                    <div class="activityContent">
                      <p>{{item.shareDes}}</p>
                      <img :src="item.resourcesPath" alt>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <!-- 419430449 转账记录  10005客户已收取转账 10003收取客户转账-->
            <div v-if="item.type == 419430449 || item.type == 10005 || item.type == 10003 || item.type == 10008">
              <div class="main " :class="{ self: item.senderFlag == 1  ? 'self' : '' }">
                <img
                  class="avatar"
                  width="36"
                  height="36"
                  :src="createMessageAvatar(item)"
                >
                <div class="mapContent transBox">
                  <div class="bgBox">
                    <div class="cardContent">
                      <i v-if="item.type == 10005 || item.type == 10003" class="iconfont iconduigou"></i>
                      <i v-if="item.type == 419430449 || item.type == 10008" class="iconfont icona"></i>
                      <div class="cardText">
                        <span v-if="item.type == 419430449 || item.type == 10008">
                          <p class="preAmt">￥ {{RedPacketAmt(item.content)}}</p>
                          <p class="predDes">{{RedPacketDes(item.content)}}</p>
                        </span>
                        <span v-if="item.type == 10005 || item.type == 10003">
                          <p class="preAmt">￥ {{RedPacketAmt(item.content)}}</p>
                          <p class="predDes">已收钱</p>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div  class="cardBottom">微信转账</div>
                </div>
              </div>
            </div>

            <!-- 红包记录  10002已收取客户红包   10007收到一个红包-->
            <div v-if="item.type == 436207665 || item.type == 10002 || item.type == 10007 || item.type == 10006">
              <div class="main " :class="{ self: item.senderFlag == 1  ? 'self' : '' }">
                <img
                  class="avatar"
                  width="36"
                  height="36"
                  :src="createMessageAvatar(item)"
                >
                <div class="mapContent transBox">
                  <div class="bgBox">
                    <div class="cardContent">
                      <i class="icon-c icondengluzhucehongbao"></i>
                      <div class="cardText">
                        <p class="redDes" v-if="item.type == 10002 || item.type == 10007 || item.type == 436207665 || item.type == 10006">{{RedPacketDes(item.content)}}</p>
                        <!-- <p>￥ {{RedPacketAmt(item.content)}}</p> -->
                      </div>
                    </div>
                  </div>
                  <div  class="cardBottom">微信红包</div>
                </div>
              </div>
            </div>


          <!-- type== 496  邀请进群-->
            <div v-if="item.type == 496">
            <!-- <div> -->
              <div class="main" :class="{ self: item.senderFlag == 1  ? 'self' : '' }">
                <img
                  class="avatar"
                  width="36"
                  height="36"
                  :src="createMessageAvatar(item)"
                >
                <div
                  class="mapContent activityBox"
                  @click.prevent="invitedJion(item)"
                >
                  <a >
                    <!-- <p style="padding-left:10px;" v-html="setDeseContent(item.shareTitle)">邀请你加入群聊</p> -->
                    <p style="padding-left:10px;" v-html="xmlSet(item.shareTitle)"></p>
                    <div class="activityContent">
                      <!-- <p v-html="setDeseContent(item.shareDes)">“{{item.memberName}}”邀请你加入群聊，{{item.shareDes}}进入可查看详情。</p> -->
                      <p v-html="xmlSet(item.shareDes)"></p>
                      <img :src="xmlSet(item.resourcesPath)" alt>
                    </div>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </li>


      </ul>
    </div>
    <div class="featureBox" v-if="showFeature" ref="featureBox">
      <ul>
        <li v-if="rightContextData.showCopyButton" id="copyIdComp" :data-clipboard-text="withdrawMessageArr.content">复制</li>
        <li v-if="rightContextData.showWithdrawButton" @click="withdrawMessage()">撤回</li>
        <li v-if="rightContextData.showTransferButton" @click="transpond()">转发</li>
      </ul>
    </div>

    <el-dialog title="查看图片" :visible.sync="showImg" center @close="closeImgDialog">
      <div class="showImgBox">
        <p v-if="imgTips">{{imgLoading}}</p>
        <img :src="showImgSrc" alt="">
      </div>
      <span slot="footer">
          <el-button type="success" @click="closeImgDialog">确 定</el-button>
      </span>
  </el-dialog>

  <!-- 邀请进群 -->
  <el-dialog class="inviteDialog" title="邀请进群" :visible.sync="inviteGroup" center width="480px" @close="inviteGroup = false">
    <div class="inviteBox">
      <img :src="xmlSet(inviteGroupData.resourcesPath)" alt="">
      <p class="groupName" v-html="xmlSetGroupName(inviteGroupData.shareDes)">撩骚群</p>
      <!-- <p class="gMNum">90人</p> -->
    </div>
    <span slot="footer">
        <p class="dialog-footer"  v-html="xmlSet(inviteGroupData.shareTitle)"></p>
        <el-button type="success" size="medium" @click="inviteGroupHadel">加入群聊</el-button>
    </span>
  </el-dialog>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { parseTime } from '@/utils'
import { throttle } from '@/utils/algo'
import { createUploadUrl, getAssetPath } from '@/tools/resourceTool'
import { chatWindowType } from './chatWindowType'
import { getChatMessages, findPersonMember } from '@/api'
import Autolinker from 'autolinker'
import Clipboard from 'clipboard'
import AudioWeixin from '@/components/audio-player/AudioPlayer.vue'
import emoticon from '../../utils/emoticon'
import { secondToDate } from '@/utils/index'

const autolinker = new Autolinker({
  stripPrefix: false
})
const scrollTopThrottle = 10

export default {
  name: 'ChatWindow',
  components: {
    AudioWeixin
  },
  props: {
    type: {
      type: Number,
      default: chatWindowType.chat
    },

    historyData: {
      type: Object,
      default: () => {
        return {
          chatRoomFlag: false,
          code: '',
          memberNoGm: ''
        }
      }
    },

    // showNowTime: {
    //   type: String,
    //   default: '00:00'
    // }

  },
  data () {
    return {
      mapList: {},
      lat: '',
      lng: '',
      poiaddress: '',
      showFeature: false, // 右键功能弹窗
      withdrawMessageArr: [], // 保存要撤销的数组
      isLoading: false,
      pageNo: 1,
      pageSize: 20,
      verifyTime: 10,
      getOldMessagesFun: throttle(this.getOldMessages, 2500),
      hasMoreMessage: false,
      loadMorePromise: Promise.resolve(),
      imgPadding: 12,

      historyPersonMember: {},
      historyMessages: [],
      showVideo:true,
      rightContextData: {
        showCopyButton: true,
        showTransferButton: true,
        showWithdrawButton: true
      },
      showImgSrc:'',
      showImg:false,
      imgTips:true,  //图片加载中
      imgLoading: '图片加载中',
      loopTime:3,
      countTime: 6,
      groupMemberNum: 0,
      chatFlag: this.$route.params.hasOwnProperty('chatRoomName'),
      inviteGroup: false,
      inviteGroupData:{},

    }
  },
  filters: {
    time (time) {
      const d1 = new Date(time)
      const d = d1.getTime(d1)
      const now = Date.now()
      const diff = (now - d) / 1000

      if (diff < 60) {
        return '刚刚'
      } else if (diff < 3600) {
        let threeMini = Math.floor(diff / 60)
        return threeMini + '分钟前'

      } else if (diff < 3600 * 24) {
        return Math.floor(diff / 3600) + '小时前'

      } else if (diff < 3600 * 24 * 2) {
        return '1天前'

      } else {
        return parseTime(time)

      }
    },
    audioTime (timeLength) {
      let aa = JSON.parse(timeLength)
      aa = aa.duration
      timeLength = secondToDate(aa)
      return timeLength
    },

  },
  computed: {
    ...mapGetters([
      'sendMessage',
      'messageListInfo',
      'userInfo',
      'emojis',
      'currentPersonMessages',
      'currentPersonMemberCode',
      'currentPersonMember'
    ]),

    personMember () {
      if (this.type === chatWindowType.history) {
        return this.historyPersonMember
      } else {
        return this.currentPersonMember
      }
    },

    singleChatRecords () {
      if (this.type === chatWindowType.history) {
        return this.historyMessages
      } else {
        return this.currentPersonMessages.messages
      }
    },

    chatRoomName () {
      if (!this.personMember) {
        return ''
      }
      return this.personMember.memberName
    },

    // 客户头像
    memberHeadImg () {
      if (this.personMember) {
        return createUploadUrl(this.personMember.headAddress, this.userInfo.uploadUrl)
      }
      return ''
    },

    // 导购头像
    memberHeadImgGm () {
      //return createUploadUrl(this.userInfo.headAddress, this.userInfo.uploadUrl)
      return createUploadUrl(this.$cfg.nowSelectInfo.headAddress, this.userInfo.uploadUrl)
    },

    rightClickEnabled () {
      return this.type === chatWindowType.chat
    }

  },
  watch: {
    async currentPersonMemberCode (newVal, oldVal) {
      if (!newVal || newVal === oldVal || this.type === chatWindowType.history) {
        return
      }
      await this.initPersonMemberMessagesLocal(newVal)
      this.loadMorePromise = Promise.resolve()
    },

    $route () {
      this.getGroupMemberNum()
    },
  },
  async created () {

    if (this.type === chatWindowType.history) {
      await this.initPersonMemberHistory()
    } else {
      if (this.currentPersonMemberCode) {
        await this.initPersonMemberMessagesLocal(this.currentPersonMemberCode)
      }
    }

  },
  mounted () {
    this.getGroupMemberNum()
    document.removeEventListener('click', this.docClick.bind(this), false)

    let isEnd = false
    this.$store.subscribeAction((action, state) => {
      if (action.type === 'receiveMessageBefore') {
        let code = action.payload.code
        if (code !== this.currentPersonMemberCode) {
          return
        }
        isEnd = (code && this.getListInEnd())
      }

      if (action.type === 'receiveMessageForCurrentPersonMemeber') {
        let code = action.payload.code
        if (code !== this.currentPersonMemberCode) {
          return
        }

        if (isEnd) {
          this.$nextTick(() => {
           this.scrollToBottom()
          })
        }
      }

      if (action.type === 'appendSendMessageAfter') {
        this.$nextTick(() => {
          this.scrollToBottom()
        })
      }

      if (action.type === 'receiveFileDownloadUrlAfter') {
        this.getFile({
          url: action.payload.url,
          title: action.payload.title
        })
      }
    })

    this.copyMessage()
  },
  methods: {
	  inviteGroupHadel () {
		  this.$http({
			  type : 'post',
			  url : 'api/im/chatroom/inviteAddGroup.do',
			  params : {
                  code:this.inviteGroupData.code,
				  noWxGm: this.inviteGroupData.noWxGm,
				  content:this.inviteGroupData.content
			  }
		  }).then(res=>{
			  if(res.data.result == true){
				  this.$message({
					  type: 'success',
					  message: '加入群聊成功'
				  })
			  }else{
				  this.$message({
					  type: 'error',
					  message: res.data.errorMessage
				  })
              }
			  this.inviteGroupData = {};
			  setTimeout(()=>{this.inviteGroup = false},500)
		  })
      },
    invitedJion(item){
      this.inviteGroup = true;
      this.inviteGroupData = item;
    },
    xmlSetGroupName(value){
          if(value) return value.split("加入群聊")[1].split("，进入可查看详情")[0];
    },
    //xml 处理
    xmlSet(value){
      value = "" + value;
      return value.replace("<![CDATA[","").replace("]]>","");
    },
    ...mapActions([
      'initPersonMemberMessages',
      'appendOldPersonMemberMessages',
      'requestZkUploadChatFile'
    ]),

    ...mapActions({
      withdrawMessageAction: 'withdrawMessage'
    }),

    clickMap (item) {
      let content = JSON.parse(item.content)
      let label = encodeURIComponent(content.label)
      let url = `https://map.qq.com/?type=marker&isopeninfowin=1&markertype=1&name=${label}&addr=${label}&pointy=${content.lat}&pointx=${content.lng}&coord=${content.lat}%2C${content.lng}`

      window.open(url)
    },

    createMapContent (item) {
      let content = JSON.parse(item.content)
      return content
    },

    createMapId (item) {
      let id = `map-${item.code}`
      let content = JSON.parse(item.content)
      this.$nextTick(() => {
        let map = new qq.maps.Map(document.getElementById(id), { // eslint-disable-line
          center: new qq.maps.LatLng(content.lat, content.lng), // eslint-disable-line
          zoom: parseInt(content.scale),
          draggable: false,
          scrollwheel: false,
          disableDoubleClickZoom: true,
          keyboardShortcuts: false,
          mapTypeControl: false,
          panControl: false,
          zoomControl: false,
          scaleControl: false
        })
      })

      return id
    },

    async initPersonMemberMessagesLocal (code) {
      if (!this.currentPersonMessages || !this.currentPersonMessages.init) {
        await this.initPersonMemberMessages({ code }).then(() => {
          this.$nextTick(() => {
            this.scrollToBottom()
            this.hasMoreMessage = true
          })
        })
        // console.log(this.type)//0
        // console.log(chatWindowType.history)//1
      } else {
        this.$nextTick(() => {
          this.scrollToBottom()
          this.hasMoreMessage = true
        })
      }
    },

    async initPersonMemberHistory () {
      let params = this.$route.params
      try {
        let ret = await findPersonMember(this.$http, {
          code: params.code,
          memberNo: params.memberNo,
          memberNoGm: params.memberNoGm
        })
        this.historyPersonMember = ret
        ret = await getChatMessages(this.$http, {
          memberNo: this.historyPersonMember.memberNo,
          memberNoGm: this.historyPersonMember.memberNoGm,
          code: this.historyPersonMember.code,
          chatRoomFlag: this.historyData.chatRoomFlag,
          start: 0,
          limit: this.pageSize
        })
        if (ret.data.result) {
          let messages = ret.data.returnObject.rows
          messages.forEach(element => {
            this.historyMessages.unshift(element)
          })
          this.$nextTick(() => {
            this.scrollToBottom()
            this.hasMoreMessage = true
          })

          return ret
        }
        throw new Error('加载聊天信息失败...')
      } catch (ex) {
        throw new Error('加载聊天信息失败...')
      }
    },

    // 将聊天信息中的 html 内容文本化，防止 xss 攻击
    htmlEncode (html) {
      return document.createElement('div').appendChild(document.createTextNode(html)).parentNode.innerHTML
    },

    getListInEnd () {
      let list = this.$refs.list

      if (!list || list.scrollTop <= 0) {
        return false
      }

      return list.scrollTop + list.clientHeight + scrollTopThrottle >= list.scrollHeight
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

    // TODO: 优化性能
    // 在发送信息之后，将输入的内容中属于表情的部分替换成emoji图片标签
    replaceFace (con) {
      con = emoticon.emoticonFormat(con)
      con = emoticon.getEmoticonByCode(con)

      return con
    },

    replaceLink (con) {
      con = autolinker.link(con)
      return con
    },
    // 消息复制
    copyMessage () {
      // let content = this.withdrawMessageArr.content;
      let copyClicent = new Clipboard('#copyIdComp')

      copyClicent.on('success', e => {
        this.$message({
          type: 'success',
          message: '复制成功'
        })
      })
    },

    // 消息撤回
    withdrawMessage () {
      var code = this.withdrawMessageArr.code
      var tt = new Date(this.withdrawMessageArr.chatTime)
      var chatTime = tt.getTime(tt)
      var nowTime = Date.parse(new Date())
      if (nowTime - chatTime < 2 * 60 * 1000) {
        this.withdrawMessageAction({ code: this.personMember.code, messageCode: code }).then(() => {

        }).catch((err) => {
          this.$message({
            type: 'error',
            message: err.message
          })
        })
      } else {
        this.$message({
          type: 'error',
          message: '超过两分钟无法撤回'
        })
      }
    },

    // 右键事件，阻止默认行为
    rightClickEvent (e, item) {
      this.withdrawMessageArr = []
      this.withdrawMessageArr = item
      if (e.button === 2) {
         this.rightContextData.showWithdrawButton = parseInt(item.senderFlag) === 1  // 文本消息
         this.rightContextData.showCopyButton = parseInt(item.type) === 1       // 文本消息
        // this.rightContextData.showTransferButton = parseInt(item.type) === 49  //文章转发
        this.showFeature = true
        this.resetRect(e, item)
      }
    },

    resetRect (e, item) {
      document.removeEventListener('click', this.docClick.bind(this), false)
      var bounding = e.target.getBoundingClientRect()
      let scrollTop = document.documentElement.scrollTop + document.body.scrollTop
      let scrollLeft = document.documentElement.scrollLeft + document.body.scrollLeft
      this.$nextTick(() => {
        // this.$refs.featureBox.style.left = (bounding.left / 2) + (bounding.width / 2) + scrollLeft + 'px'
        if (item.senderFlag === 1) {
          this.$refs.featureBox.style.right = (bounding.width + 100) + scrollLeft + 'px'
          this.$refs.featureBox.style.left = 'auto'
        } else {
          this.$refs.featureBox.style.left = (bounding.width + 100) + scrollLeft + 'px'
        }
        this.$refs.featureBox.style.top = (bounding.top - 50) + scrollTop + 'px'
      })

      if (this.rightClickEnabled) {
        document.addEventListener('click', this.docClick, true)
      }
    },

    docClick (e) {
      this.showFeature = false
    },

    // 转发
    transpond () {
      this.$showPopOperating('Transpond', {
        propsData: this.withdrawMessageArr,
        closeFun: () => {
          this.$hidePopOperating()
        }
      })
    },

    // 下载文件
    downloadFile (item) {
      // 文件已经存在下载地址，直接下载
      if (item.resourcesPath) {
        this.getFile({
          url: item.resourcesPath,
          title: item.shareTitle
        })
      } else {
        // 需要先获取下载地址
        this.requestZkUploadChatFile({
          personMemberCode: this.personMember.code,
          msgId: item.code,
          content: item.content
        })
      }
    },

    // 真正下载文件
    getFile ({url, title}) {
      this.donwloadFile({url, title})
    },

    // 下载文件
    donwloadFile ({url, title}) {
      if (!url) {
        return
      }

      let dlLink = document.createElement('a')
      dlLink.download = title
      dlLink.href = url
      dlLink.target = '_blank'
      dlLink.click()
    },

    // 播放语音
    palyAudio () {
      var that = this
      that.$refs.audio.play()
    },

    scrollToBottom () {
      let list = this.$refs.list
      if (list) {
        this.scrollTo(list.scrollHeight - list.clientHeight)
      }
    },

    scrollTo (pos) {
      let list = this.$refs.list
      if (list) {
        list.scrollTop = pos
      }
    },

    getScrollTop () {
      let list = this.$refs.list
      if (list) {
        return list.scrollTop
      }

      return 0
    },

    getScrollHeight () {
      let list = this.$refs.list
      if (list) {
        return list.scrollHeight
      }

      return 0
    },

    onScroll (e) {
      // 加载更多聊天记录
      this.loadMorePromise.then(() => {
        if (this.hasMoreMessage && e.target && e.target.scrollTop < scrollTopThrottle) {
          this.scrollTo(scrollTopThrottle + 1)
          this.getOldMessagesFun()

        }
      })
    },

    getOldMessages () {

      let promise
      if (this.type === chatWindowType.history) {
        promise = this.getMoreForHistory()
      } else {
        promise = this.getMoreForChating()
      }

      let scrollHeight = this.getScrollHeight()
      promise.then((res) => {
        if (res && res.data.result) {
          const ret = res.data.returnObject
          //打开会出现： 当聊天记录翻到最顶层，禁止滚动，此时轮询滚动条回到最新消息位置，无法上滑滚动
          // this.hasMoreMessage = ret.start + ret.limit < ret.total
        } else {
          this.hasMoreMessage = false // 如果出错，则不能重新触发
        }

        let scrollTop = this.getScrollTop()
        let scrollHeight2 = this.getScrollHeight()
        if (scrollHeight2 > scrollTop) {
          let to = (scrollHeight2 - scrollHeight) + scrollTop - 25
          this.scrollTo(to)
        }
      })
    },

    async getMoreForChating () {
      return await this.appendOldPersonMemberMessages({ code: this.currentPersonMemberCode })
    },

    async getMoreForHistory () {
      return await getChatMessages(this.$http, {
        memberNo: this.personMember.memberNo,
        memberNoGm: this.personMember.memberNoGm,
        code: this.personMember.code,
        chatRoomFlag: this.historyData.chatRoomFlag,
        start: this.historyMessages.length,
        limit: this.pageSize
      }).then((res) => {
        if (res && res.data.result) {
          const ret = res.data.returnObject
          ret.rows.forEach((ele) => {
            this.historyMessages.unshift(ele)
          })
          return res
        }
        throw new Error('加载聊天记录失败...')
      })
    },

    onImageLoad (e) {
      let scrollHeight = this.getScrollHeight()
      let scrollTop = this.getScrollTop()

      if (scrollTop > 0 && scrollTop + this.$refs.list.clientHeight + scrollTopThrottle + e.target.clientHeight + this.imgPadding >= scrollHeight) {
        this.$nextTick(() => {
           this.scrollToBottom()
        })
      }
    },

    //查看聊天图片
    onImageClick (item) {
      if(item.senderFlag == 1){
        return false
      }
      var that = this
      that.imgLoading = '图片加载中'

      that.$http.post('/api/imh5/findChatImage.do',{
        code: item.code
      }).then(res=>{
          this.showImg = true
          let data = res.data.returnObject

          if(!data.bigImg && !data.midImg){
            that.imgTips = true
            //每隔3秒请求一次  共5次
            that.loopGetImg = setInterval(function(){
              if(that.loopTime == 0){
                that.imgLoading = '图片获取失败'
                that.loopTime == 3
                window.clearInterval(that.loopGetImg)
              }else{
                that.loopTime--
                that.onImageClick(item)
                that.imgLoading = '图片加载中'
              }

            },3000)
          }else{
            window.clearInterval(that.loopGetImg)
            that.imgTips = false
            that.imgLoading = ''

            if(data.bigImg) {
              that.showImgSrc = data.bigImg
              return false
            } else if(data.midImg) {
              that.showImgSrc = data.midImg
            }

          }

      })
    },

    closeImgDialog () {
        window.clearInterval(this.loopGetImg)
        this.imgLoading = ''
        this.showImg = false
        this.showImgSrc = ''
    },

    createMessageAvatar (item) {
      let avatar

      if (item.memberHeadUrl) {
        avatar = createUploadUrl(item.memberHeadUrl, this.userInfo.uploadUrl)
      } else {
        if (parseInt(item.senderFlag) === 1) {
          avatar = this.memberHeadImgGm
        } else {
          avatar = this.memberHeadImg
        }
      }

      if (!avatar) {
        avatar = getAssetPath('static/img/default-user.png')
      }
      return avatar
    },

    getStatic (path) {
      return getAssetPath(path)
    },

    //根据code下载视频
    downloadVideo(item, index){
      let self = this
      if (item.resourcesPath) {
        this.showVideo = false
      } else {
        self.$http({
          type:'post',
          url:'api/imh5/findChatVideo.do',
          params:{
            code: item.code
          }
        }).then(res=>{
          if(res.data.result == true){
            var srcPath = res.data.returnObject.resourcesPath
            if(srcPath){
              item.resourcesPath = srcPath
              this.showVideo = false
            }else{
              //每隔3秒请求一次  共6次
              self.loopDownloadVideo = window.setInterval(function(){

                if(self.countTime == 0){
                  window.clearInterval(self.loopDownloadVideo)
                }else{
                  self.countTime--
                  self.findVideoInfo(item, index)
                }

              },3000)

            }
          }
        })
      }


    },
    //从服务器请求视频地址
    findVideoInfo(item, index){

        this.$http({
          type:'post',
          url:'api/imh5/findChatInfo.do',
          params:{
            code: item.code
          }
        }).then(res=>{
          if(res.data.result == true){
            item.resourcesPath = res.data.returnObject.resourcesPath
            this.showVideo = false
            window.clearInterval(this.loopDownloadVideo)
          }
        })
    },

    // 公众号头像二次加载
    redirectUrl(url){
      if(url){
        return url
      }
      this.$nextTick(() => {
        return url
      })
      clearTimeout(this.timer)
      this.timer = setTimeout( ()=>{
        return url
      },3000)

    },

    //红包说明
    RedPacketDes (con) {
      if(con){
        con = JSON.parse(con)
        return con.des
      } else {
        return ''
      }

    },
    //红包金额
    RedPacketAmt (con) {
      if(con){
        con = JSON.parse(con)
        con.amt = con.amt/100
        return con.amt
      } else {
        return ''
      }

    },


    //判断系统消息  是不是重新验证好友
    isFriends (con) {
      if(con.includes('发送朋友验证')){
        return true
      } else {
        return false
      }
    },

    //重新发送请求
    addFriends_again () {
      let item = this.currentPersonMember

      this.$prompt(
        '你需要发送验证申请，对方通过后你才能添加其为朋友。',
        '对方启用了朋友验证', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center:true
      }).then(({ value }) => {

        this.$http.post('/api/imh5/addFriend/doAddFriendAgian.do',{
          merchantNo: this.$cfg.userInfo.memberNoMerchant,
          scanId: '-101',
          noWx: item.noWx,
          wxQrCode: item.noWx,
          noWxGm: item.noWxGm,
          validation: value,
          nickNameWx: item.nickNameWx,
        }).then( res => {
          if (res.data.returnObject.success) {
            this.$message.success('发送请求成功')
          } else {
            this.$message.error('发送请求失败')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },

    //打开分享活动 或 素材链接
    openShareAct (url) {
        if(url.includes('http')){
          return url
        } else {
          return 'http://' + url
        }
    },

    //获取群成员  显示人数
    getGroupMemberNum () {
      this.groupName = this.currentPersonMember && this.currentPersonMember.nickNameWx // 群名称
      var info = this.$route.params

      this.$http.post('/api/im/chatroom/findChatRoomMember.do', {
        chatRoomName: info.chatRoomName,
        //roomCode: info.roomCode
      }).then(res => {
        if (res.data.result) {
          let data = res.data.returnObject
          if(data){
            this.groupMemberNum = data.length
          }
        }
      })
    }

  }
}
</script>

<style lang="less" scoped>
.message {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .header {
    height: 60px;
    padding: 20px 0 0 0;
    box-sizing: border-box;
    border-bottom: 1px solid #cacaca;
    text-align: center;

    .friendname {
      text-align: center;
      font-size: 18px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      // width: 80%;
    }

    .groupNum{
      font-size: 16px;
    }
  }
  .message-wrapper {
    width: 100%;
    height: 1px;
    flex: 1;
    padding: 10px 15px;
    box-sizing: border-box;
    overflow-y: auto;
    border-bottom: 1px solid #cacaca;
    .time {
      width: 100%;
      font-size: 12px;
      margin: 7px auto;
      text-align: center;
      span {
        display: inline-block;
        padding: 4px 6px;
        color: #fff;
        border-radius: 3px;
        background-color: #dcdcdc;
      }
    }
    .main {
      .avatar {
        float: left;
        margin-left: 15px;
        border-radius: 3px;
      }

      .content {
        display: inline-block;
        margin-left: 10px;
        position: relative;
        padding: 6px 10px;
        max-width: 280px;
        min-height: 36px;
        line-height: 24px;
        box-sizing: border-box;
        font-size: 14px;
        text-align: left;
        word-break: break-all;
        background-color: #fafafa;
        border-radius: 4px;
        cursor: pointer;
        &:before {
          content: " ";
          position: absolute;
          top: 12px;
          right: 100%;
          border: 6px solid transparent;
          border-right-color: #fafafa;
        }

        .text {
          white-space: pre-wrap;

          a {
            color: rgb(0, 0, 238);
          }
        }

        .audio-content {
          width: 100px;
        }

        &.file-content {
          width: 280px;
          min-width: 280px;

          .file-c {
            display: flex;
            flex-flow: row nowrap;

            .file-img {
              flex: auto 0 0;
              width: 76px;
              height: 76px;
              margin-right: 10px;
            }

            .file-summary {
              flex: auto 1 1;
              display: flex;
              flex-flow: column nowrap;
              justify-content: space-between;

              .download-btn {
                color: #35ac2f;
              }
            }
          }
        }
      }

    }
    .self {
      text-align: right;
      .avatar {
        float: right;
        margin: 0 15px;
      }
      .content {
        background-color: #b2e281;
        &:before {
          right: -12px;
          vertical-align: middle;
          border-right-color: transparent;
          border-left-color: #b2e281;
        }
      }
    }
  }
}
// 地图
.mapContent {
  display: inline-block;
  margin: 0 10px;
  position: relative;
  padding: 6px 10px;
  box-sizing: border-box;
  max-width: 280px;
  min-width: 250px;
  min-height: 36px;
  line-height: 24px;
  font-size: 14px;
  text-align: left;
  word-break: break-all;
  border-radius: 4px;
  cursor: pointer;
  .mapCon {
    max-width: 280px;
    border: 1px solid #d1d1d1;
    border-radius: 7px;
    text-align: left;
    line-height: 26px;
    cursor: pointer;

    .mapTop_title {
      font-size: 16px;
      text-align: center;
      color: #2a2a2a;
      padding: 0 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .mapTop_p{
      font-size: 14px!important;
      margin-bottom: 5px;
    }
    .mapTopMs {
      display: block;
      padding: 0 5px;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .containerMap {
      width: 100%;
      height: 120px;
      z-index: 50;
    }
  }
}

// 地图
.map-c {
  display: inline-block;
  margin: 0 10px;
  position: relative;
  padding: 6px 10px;
  box-sizing: border-box;
  max-width: 280px;
  min-height: 36px;
  line-height: 24px;
  font-size: 14px;
  text-align: left;
  word-break: break-all;
  border-radius: 4px;
  cursor: pointer;
  z-index: 0;

  .mapCon {
    border: 1px solid #d1d1d1;
    border-radius: 7px;
    text-align: left;
    line-height: 26px;
    cursor: pointer;
    width: 280px;

    .mapTop_title {
      font-size: 16px;
      text-align: center;
      color: #2a2a2a;
      padding: 0 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .mapTopMs {
      display: block;
      padding: 0 5px;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .containerMap {
      width: 100%;
      height: 240px;
      z-index: 50;
    }
  }
}
// 名片
.cardBox {
  border: 1px solid #d1d1d1;
  padding: 20px 15px 0 20px;
  width: 280px;
  margin-right: 0px;
  box-sizing: border-box;
  .cardContent {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    font-size: 16px;
    color: #9c9c9c;
    line-height: 22px;
    height: 70px;
    img {
      margin-right: 15px;
      width: 60px;
      height: 60px;
      display: inline-block;
    }
    .cardText {
      height: 60px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 70%;
      word-wrap: break-word;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #333;
    }
  }
  .cardBottom {
    color: #b7b2b2;
    border-top: 1px solid #d1d1d1;
    text-align: left;
    height: 30px;
    line-height: 30px;
  }
}
//
.transBox{
  // border: 1px solid #d1d1d1;
  width: 280px;
  margin-right: 0px;
  box-sizing: border-box;
  .bgBox{
    width: 100%;
    background: #f99a40!important;
    padding: 20px 15px 0 15px;
    box-sizing: border-box;
    .cardContent {
      width: 100%;
      box-sizing: border-box;
      display: flex;
      font-size: 16px;
      color: #9c9c9c;
      line-height: 22px;
      height: 70px;
      .iconfont{
        color: #fff;
        font-size: 40px;
        margin:10px 15px 0 0;
        display: inline-block;
      }
      .icon-c {
        color: red;
        font-size: 40px;
        margin:10px 15px 0 0;
        display: inline-block;
        &::before {
          font-family: iconfont;
          font-size: 40px;
          display: inline-block;
        }
      }
      .cardText {
        height: 53px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 70%;
        word-wrap: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #fff;
        font-size: 16px;
      }
    }

  }
  .cardBottom{
    padding-left: 20px;
    color: #7b7b7b;
    text-align: left;
    height: 30px;
    line-height: 30px;
    background: #fff;
  }

}
.appletBox {
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  margin: 0;
  margin-left: 10px;
  p {
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  img {
    display: inline-block;
    width: 100%;
    height: 100%;
    margin-right: 10px;
  }
  .cardBottom {
    width: 260px;
    color: #b7b2b2;
    border-top: 1px solid #d1d1d1;
    margin-top: 15px;
    text-align: left;
    height: 40px;
    line-height: 40px;
  }
}
.activityBox {
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  padding: 6px 0;
  text-align: left;
  & > p {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #e1e1e1;
  }
  .activityContent {
    height: 90px;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #d1d1d1;
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      width: 70%;
      margin-right: 10px;
      text-align: left;
    }
    img {
      width: 68px;
    }
  }
}
.groupMessage_box {
  margin: 15px auto;
  max-width: 320px;
  text-align: center;
  span {
    display: inline-block;
    padding: 5px;
    background-color: #dcdcdc;
    border-radius: 3px;
    color: #fff;
    font-size: 12px;
    text-align: left;
  }
  .add_friends{
    color: #0011fb;
    cursor: pointer;
  }
}
.featureBox {
  position: absolute;
  border-radius: 4px;
  background-color: #fff;
  border: 1px solid #c7c7c7;
  box-sizing: border-box;
  z-index: 999;
  width: 66px;

  ul li {
    padding: 10px 18px;
    box-sizing: border-box;
    width: 100%;
    min-width: 60px;
    white-space: nowrap;
    &:hover {
      cursor: pointer;
      background-color: #d1d1d1;
      color: #333;
    }
  }
}
.no_ground_border {
  background-color: #ededed !important;
  border: 1px solid #d1d1d1;
  &:before {
    content: none !important;
    border-left-color: #ededed !important;
  }
}
audio {
  width: 260px;
}
.videoBox{
  background: transparent;
  width:260px;
  height:200px;
  position:absolute;
  top:6px;
  left:10px;
  z-index: 9999;
}
.showImgBox{
  //width: 750px;
  text-align: center;
  img{
    width: 100%;
    display: block;
    height: auto;
  }
}
.redDes{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.preAmt{
  font-size: 20px;
}
.inviteBox{
  text-align: center;

  img{
    width: 90px;
    height: 90px;
    border-radius: 5px;
    margin-top: 10px;
  }
  .groupName{
    font-size: 24px;
    color: #000;
    margin: 10px 0;
  }
  .gMNum{
    font-size: 20px;
  }
}
.dialog-footer{
  font-size: 22px;
  color: #333;
  margin-bottom: 40px;
}
</style>
