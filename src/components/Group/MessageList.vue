<template >
    <div class="news_list">
      <ul>
        <li
          class="serviceDetail"
          v-for="(item, index) in filteredData"
          :key="index"
          :class="{ actived: (currentPersonMemberCode && item.code === currentPersonMemberCode), isTop: item.setUpUser && item.setUpUser == 1 }"
          @click="cutList(item,index)"
        >
          <div class="news_img">
            <img :src="getAvatar(item)" alt>
            <i class="pao" v-if="item.unreadCount !=0 && item.noDisturb == 0">{{item.unreadCount}}</i>
            <i class="pao" v-if="item.unreadCount !=0 && item.noDisturb == 1"></i>
          </div>
          <div class="new_box">
            <p class="show_Name">{{item.memberName}}</p>
            <p class="show_news">
              <span v-if="item.newType === 1">{{item.newMessage}}</span>
              <span v-if="item.newType === 2">[图片]</span>
              <span v-if="item.newType === 3">[语音]</span>
              <span v-if="item.newType === 4">[表情]</span>
              <span v-if="item.newType === 5">[链接]</span>
              <span v-if="item.newType === 6">[位置]</span>
              <span v-if="item.newType === 7">[文件]</span>
              <span v-if="item.newType === 8">[语音通话]</span>
              <span v-if="item.newType === 9">[视频通话]</span>
              <span v-if="item.newType === 10">[视频]</span>
              <span v-if="item.newType === 11">[小程序]</span>
            </p>
          </div>
          <div class="newsTime_box">
            <p class="news_time"></p>
            <p v-if="item.noDisturb == 1">
              <i class="iconfont iconmiandarao"></i>
            </p>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { getAssetPath } from '@/tools/resourceTool'
import Bus from '../Data/bus.js'

// 将所有已有会话全部加载，方便处理
const pageSize = 9999

export default {
  name: 'MessageList',
  data () {
    return {
      item: {},
      searchVal: '',
      scrollTop: '',
      memberNoGuid: '',
      pageNo: 1,
      totalPage: 0,
      loadingDisabled: true
    }
  },

  computed: {
    ...mapGetters([
      'messageListInfo',
      'searchChatName',
      'serviceInfo',
      'personMemberSortedList',
      'personMemberListTotal',
      'currentPersonMemberCode',
      'currentPersonMember',
      'loading'
    ]),
    messageItems () {
      return this.personMemberSortedList
    },
    //模糊搜索
    filteredData: function() {
      var self = this;
      var filteredData = []
      if(!self.searchVal){
        return self.messageItems
      }
      return self.messageItems.filter(function(item) {
        return item.memberName.toLowerCase().indexOf(self.searchVal.toLowerCase()) !== -1;
      })
    }
  },

  async created () {
    this.$store.dispatch('is_messageList', 1)
  },

  watch: {
      searchChatName(val){
        this.searchVal = val  //监听传过来的searchVal 值
        // console.log(val)
      },

    serviceInfo(){
      this.initData();
    },
  },
  mounted() {
    Bus.$on('refreshMessageList', (e)=>{
      this.getChatMessageListItems(false)

      //this.getChatMessageList(false)
    })
  },
  methods: {
    ...mapActions([
      'fetchPersonMemberList',
      'fetchAppendPersonMemberList',
      'changeCurrentMessagePerson',
      'updateThirdHaveRead'
    ]),

    initData () {
      this.getChatMessageList(false)
    },

    async getChatMessageListItems (more) {
      let data = null
      if (!more) {
        data = await this.fetchPersonMemberList({ pageSize })
      } else {
        data = await this.fetchAppendPersonMemberList({ pageNo: ++this.pageNo, pageSize })
      }

      return data
    },

    // 获取聊天列表接口
    getChatMessageList (flag, word) {
      this.$store.dispatch('showLoading')
      this.memberNoGuid = this.$cfg.userInfo.memberNoGuid
      var info = this.$cfg.nowSelectInfo
      var params
      if (word) {
        params =
          'noWx=' +
          info.noWx +
          '&keyWord=' +
          word +
          '&memberNoGm=' +
          this.memberNoGuid +
          '&pageNo=' +
          this.pageNo +
          '&pageSize=10'
      } else {
        params =
          'noWx=' +
          info.noWx +
          '&memberNoGm=' +
          this.memberNoGuid +
          '&pageNo=' +
          this.pageNo +
          '&pageSize=10'
      }
      this.$http
        .post('/api/imh5/index/personMemberList.do?' + params)
        .then(res => {
          this.$store.dispatch('hideLoading')
          if (!res.data.returnObject) return
          var data = res.data.returnObject.page
          var totalPage = Math.ceil(data.total / data.limit) // 总页数

          if (flag) {
            // 多次加载数据
            // 超过总页数禁止请求
            if (this.pageNo > totalPage) {
              return
            }
            this.items = this.items.concat(data.rows)
          } else {
            // 第一次加载或搜索数据，需要缓存第一条数据并通知聊天页面更新标题
            this.items = []
            this.items = data.rows
          }
        })
    },

    // 点击聊天列表
    async cutList (item, index) {
      // console.log(item)
      this.$store.dispatch('messageListInfo', item)
      // 如果有未读数, 更新第三方已读
      this.updateThirdHaveRead(item.code)
      // 显示聊天窗口
      let path
      if (item.chatRoomFlag) {
        path = `/im-web/app/${this.$cfg.nowSelectInfo.noWx}/group/chat/${item.code}/${item.noWx}/${item.memberNoGm}`
      } else {
        path = `/im-web/app/${this.$cfg.nowSelectInfo.noWx}/user/chat/${item.code}/${item.memberNoGm}/${item.memberNo}`
      }

      this.$router.push({
        path
      })
    },

    getAvatar (item) {
      let avatar = item.headAddress

      if (!avatar) {
        if (item.chatRoomFlag) {
          avatar = getAssetPath('static/img/default-group.png')
        } else {
          avatar = getAssetPath('static/img/default-user.png')
        }
      }

      return avatar
    }
  }
}
</script>

<style lang="less" scoped>
.news_list {
  overflow: auto;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;

  li.serviceDetail{
    width:100%;
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    box-sizing: border-box;
    cursor: pointer;
    &:hover {
      background-color: #3a3f45;
    }
    &.actived {
      background-color: #3a3f45;
    }
    &.isTop{
      background-color: #565656;
    }
    .news_img {
      position: relative;
      width: 32%;
      max-width: 54px;
      img {
        width: 100%;
        height: auto;
        min-width: 32px;
        min-height: 32px;
        max-width: 40px;
        max-height: 40px;
        border-radius: 3px;
      }
      .pao {
        display: inline-block;
        width: 12px;
        height: 12px;
        position: absolute;
        top: -5px;
        right: 5px;
        padding: 3px;
        color: #fff;
        background-color: #f31919;
        border-radius: 50%;
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .new_box {
      width: 60%;
    }
  }

  .show_Name {
    color: #fff;
    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 0 10px;
  }
  .show_news {
    color: #d2cccc;
    font-size: 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 0 10px;
  }
  .newsTime_box {
    width: 26%;
    text-align: right;
    .news_time {
      display: block;
      font-size: 14px;
      color: #fff;
    }
    .news_bell {
      display: block;
      visibility: hidden;
      width: 10px;
      height: 20px;
    }
  }
}
.iconmiandarao{
  color: #fff;
}
</style>
