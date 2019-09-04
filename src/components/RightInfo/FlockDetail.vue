<template>
  <div class="groun-detail-con">
    <div class="groupBox">
      <div class="groupName_box">
        <p>群组</p>

      </div>
      <div class="group_memberbox">
        <ul ref="liBox" class="cf" :class="[listLength == true ? 'minHeight' : 'autoHeight']">
          <li
            v-for="(item, index) in memberList"
            :key="index"
            :title="item.roomNickName"
          >
            <img :src="getAvatar(item)" alt>
            <p>{{item.roomNickName}}</p>
          </li>
        </ul>
        <p class="watchMore" @click="packUp()">{{showMore}}</p>
      </div>

      <!-- <div class="group_otherBox">
          <p>置顶群消息</p>
          <el-switch  v-model="switchValue1" active-color="#20ab1f" inactive-color="#c9c9c9"> </el-switch>
      </div>-->
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getAssetPath } from '@/tools/resourceTool'
import qs from 'qs'

export default {
  name: 'flockDetail',
  data () {
    return {
      listLength: false, // true超出隐藏  false自适应高度
      showMore: '', // 查看更多群成员文字
      groupName: '',
      // changeNameL: '',
      memberList: [],
      switchValue1: false,

    }
  },
  watch: {
    $route () {
      this.getGroupMemberList()
    },
  },
  mounted () {
    this.getGroupMemberList()
    let te = this.$refs.liBox.offsetHeight
    // 高度超过5行
    if (te > 405) {
      this.showMore = '查看更多群成员'
      this.listLength = true
    } else {
      this.showMore = ''
    }

  },
  methods: {
    // 获取群成员列表
    getGroupMemberList () {
      var info = this.$route.params
      this.$http.post('/api/im/chatroom/findChatRoomByPmCode.do', {
        pmCode:info.pmCode,
      }).then(res => {
        //  console.log(res)
        if (res.data.result) {
          this.memberList = res.data.returnObject.rows
        //  console.log(this.memberList)
        }
      })
    },
    getAvatar (item) {
      let avatar = item.headUrl
      if (!avatar) {
        avatar = getAssetPath('static/img/default-group.png')
      }
      return avatar
    },
    packUp () {
      this.listLength = !this.listLength
      if (this.listLength) {
        this.showMore = '查看更多群成员'
      } else {
        this.showMore = '收起'
      }
    },

  }
}
</script>

<style lang="less" scoped="scoped">
.groun-detail-con{
  width: 100%;
  height: 100%;

}
.groupBox {
  width: 100%;
  height: 100%;
  padding: 15px 0 0 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .group_searchBox {
    width: 90%;
    padding-bottom: 15px;
    box-sizing: border-box;
    border-bottom: 1px solid #c7c7c7;
    .search_border {
      width: 95%;
      border-radius: 3px;
      height: 30px;
      display: flex;
      align-items: center;
      margin: 0 auto;
      background-color: #fff;
      .searchTh {
        width: 85%;
        height: 21px;
        border: none;
        margin-left: 4%;
        border-radius: 20px;
        font-size: 12px;
        background-color: transparent;
        color: #000;
      }
      img {
        width: 20px;
        height: 20px;
      }
    }
  }
  .group_memberbox {
    width: 100%;
    flex: 0 1 auto;
    overflow-y: auto;
    box-sizing: border-box;

    .minHeight {
      height: 405px;
      overflow: hidden;
    }
    .autoHeight {
      height: auto;
    }

    ul {
      &:after {
        content: "";
        display: block;
        clear: both;
      }

      li {
        width: 45px;
        height: 70px;
        overflow: hidden;
        margin: 15px 15px 0 0;
        float: left;
        cursor: pointer;

        img {
          width: 45px;
          height: 45px;
        }

        p {
          font-size: 12px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          text-align: center;
          margin-top: 5px;
        }
      }
    }
    .watchMore {
      text-align: center;
      font-size: 14px;
      margin-top: 10px;
      &:hover {
        color: #20ab1f;
        cursor: pointer;
      }
    }
  }
  .groupName_box {
    padding: 5px 20px 10px 0;
    box-sizing: border-box;
    border-bottom: 1px solid #c7c7c7;
    margin-top: 5px;
    p {
      line-height: 1.8;
      .editInfo {
        width: 24px;
        height: 24px;
        background: url("/static/img/bianji.png") no-repeat;
        background-size: 100% 100%;
        background-position: center;
        display: inline-block;
        float: right;
        cursor: pointer;
      }
    }
    .changeName {
      width: 160px;
      height: 30px;
      border-radius: 5px;
      border: 1px solid #a2a2a2;
      text-indent: 10px;
    }
  }
  .group_otherBox {
    p {
      color: #7d7d7d;
      line-height: 1.8;
    }
  }
}

</style>
