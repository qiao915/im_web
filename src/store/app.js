import * as types from './type'
import Vue from 'vue'
import {
  getChatMessages,
  findPersonMember,
  findChatRoom,
  findFlockRoom,
  withdrawMessage,
  findPersonMemberList,
  requestZkUploadChatFile
} from '@/api'
import { findBiggerIndex } from '@/utils/algo'
import qs from 'qs'
import { CHAT_USER_TYPE } from '@/utils/constants'

const state = {
  loading: false,
  sendMessage: null,
  // 所有的终端
  allDevices: [],
  serviceInfo: null,
  messageListInfo: null,
  searchChatName: null,
  is_moreFunction: false,
  is_messageList: 0,
  is_circleFriendsList: null,
  is_autoReply: false,  //托管 自动回复
  hide_leftBar: true, //隐藏左侧列表
  show_memberDetail: false, //我的客户列表展示客户信息
  // 聊天列表信息
  personMemberList: {},

  currentPersonMember: {},

  currentPersonMemberCode: '',
  // 聊天记录用户在服务端的总数
  personMemberListTotal: 0,
  // 当前聊天用户的详细信息
  currentPersonMemberDetail: {},

  // 聊天消息本地列表(Object)，用 person code 作为 key
  messages: {},

  // 当前登录用户信息
  userInfo: {},

  // 联系人中，我的客户
  contactMyCustomer: [],
  // 联系人中，我的导购
  contactMySales: [],
  // 我们的群聊
  myGroups: [],

  //我的群组
  myFlocks: [],

  // 当前选择的导购
  nowSelectguide: {},
  // 当前选择的群
  nowSelectGroup: {},
  // 待认领客户
  claimedCustomerHasChange: [],

  // 用户类型选择
  personCategoryIndex: 0,

  //群成员集合
  groupMembersList: []
}

const createPersonMessageObj = function (state, code) {
  let obj = state.messages[code]
  if (obj) {
    return
  }
  Vue.set(state.messages, code, {
    init: false,
    messages: [],
    loadCount: 0,
    codes: new Set()
  })
}

// #region mutations
const mutations = {}

mutations[types.HIDE_LOADING] = (state) => {
  state.loading = false
}
mutations[types.SHOW_LOADING] = (state) => {
  state.loading = true
}

mutations[types.SENDMESSAGE] = (state, data) => {
  state.sendMessage = data
}
mutations[types.SERVICEINFO] = (state, data) => {
  state.serviceInfo = data
}
mutations[types.ALL_DEVICES] = (state, data) => {
  state.allDevices = data
}

mutations[types.MESSAGELISTINFO] = (state, data) => {
  state.messageListInfo = data
}
mutations[types.SEARCHCHATNAME] = (state, data) => {
  state.searchChatName = data
}
mutations[types.IS_MOREFUNCTION] = (state, data) => {
  state.is_moreFunction = data
}
mutations[types.IS_AUTOREPLY] = (state, data) => {
  state.is_autoReply = data
}
mutations[types.HIDE_LEFTBAR] = (state, data) => {
  state.hide_leftBar = data
}
mutations[types.IS_MESSAGELIST] = (state, data) => {
  state.is_messageList = data
}
mutations[types.IS_CIRCLEFRIENDSLIST] = (state, data) => {
  state.is_circleFriendsList = data
}
mutations[types.SHOW_MEMBERDETAIL] = (state, data) => {
  state.show_memberDetail = data
}

mutations[types.UPDATE_USER_INFO] = (state, data) => {
  state.userInfo = data
}

mutations[types.CONTACT_MY_CUSTOMER] = (state, data) => {
  state.contactMyCustomer = data
}

mutations[types.CONTACT_MY_SALES] = (state, data) => {
  state.contactMySales = data
}

mutations[types.NOW_SELECT_GUIDE] = (state, data) => {
  state.nowSelectguide = data
}

mutations[types.NOE_SELECT_GROUP] = (state, data) => {
  state.nowSelectGroup = data
}

mutations[types.CLAIMED_CUSTOMER_HAS_CHANGE] = (state, data) => {
  state.claimedCustomerHasChange = data
}

mutations[types.GROUP_MEMBERS_LIST] = (state, data) => {
  state.groupMembersList = data
}

mutations[types.CURRENT_PERSON_MEMBER] = (state, data) => {
  state.currentPersonMember = data
}

mutations[types.SET_PERSON_MEMBER_LIST] = (state, data) => {
  Vue.set(state, 'personMemberList', {})

  let now = new Date().getTime()
  data.forEach((item) => {
    item.lastModified = now
    now -= 10
    Vue.set(state.personMemberList, item.code, item)
  })
}

mutations[types.APPEND_PERSON_MEMBER_LIST] = function (state, data) {
  let now = new Date().getTime()
  Object.keys(state.personMemberList).forEach((key) => {
    const val = state.personMemberList[key]
    now = Math.min(val.lastModified, now)
  })

  data.forEach((item) => {
    const oldVal = state.personMemberList[item.code]
    if (oldVal) {
      item.lastModified = oldVal.lastModified
    } else {
      item.lastModified = now
      now -= 100
    }

    Vue.set(state.personMemberList, item.code, item)
  })
}

mutations[types.SET_CURRENT_PERSON_MEMBER_CODE] = (state, data) => {
  state.currentPersonMemberCode = data
}

mutations[types.SET_PERSON_MEMBER_LIST_TOTAL] = (state, payload) => {
  state.personMemberListTotal = payload
}

mutations[types.SET_PERSON_MESSAGES_BY_CODE] = (state, { personCode, messages }) => {
  Vue.set(state.messages, personCode, messages)
}

mutations[types.SET_CURRENT_PERSON_MEMBER_DETAIL] = (state, payload) => {
  state.currentPersonMemberDetail = payload
}

mutations[types.UPDATE_UNREAD_COUNT] = (state, { code, unreadCount }) => {
  let member = state.personMemberList[code]

  if (member) {
    member.unreadCount = unreadCount
  }
}

mutations[types.EDIT_NICKNAME] = (state, { code, nickName }) => {
  let member = state.personMemberList[code]

  if (member) {
    member.memberName = nickName
  }

  if (state.currentPersonMemberDetail.code === code) {
    state.currentPersonMemberDetail.memberName = nickName
  }
}

mutations[types.RENEW_PSRSON_MEMBER_ORDER] = (state, { code }) => {
  let member = state.personMemberList[code]

  if (!member) {
    return
  }

  member.lastModified = (new Date()).getTime()
}

mutations[types.SET_PERSON_MEMBER_MESSAGES] = (state, { code, messages, total }) => {
  let codes = new Set()
  messages.forEach((message) => {
    codes.add(message.code)
  })
  Vue.set(state.messages, code, {
    init: false,
    messages: messages.slice(0),
    total,
    codes
  })
}

mutations[types.INSERT_PERSON_MEMEBER_MESSAGES] = (state, { code, message }) => {
  createPersonMessageObj(state, code)

  let obj = state.messages[code]

  if (obj.codes.has(message.code)) {
    return false
  }

  let index = findBiggerIndex(obj.messages, message, (a, b) => {
    let res = a.chatTime - b.chatTime
    return res
  })

  obj.messages.splice(index, 0, message)
  obj.codes.add(message.code)

  return true
}

// type: 0: append end, 1: append before
mutations[types.APPEND_PERSON_MEMEBER_MESSAGES] = (state, { code, messages, total, noMore }) => {
  createPersonMessageObj(state, code)

  let obj = state.messages[code]

  messages = messages.filter((m) => {
    return !obj.codes.has(m.code)
  })

  obj.total = total
  obj.messages.unshift(...messages)

  messages.forEach((m) => {
    obj.codes.add(m.code)
  })

  obj.noMore = noMore
}

mutations[types.SET_MESSAGES] = (state, messages) => {
  Vue.set(state, 'messages', messages)
}

mutations[types.SET_MESSAGE] = (state, { code, message }) => {
  let obj = state.messages[code]

  if (!obj || !obj.codes.has(message.code)) {
    return
  }

  let index = obj.messages.findIndex((m) => {
    m.code === message.code
  })

  if (index >= 0) {
    obj[index] = menubar
  }
}

mutations[types.SET_PERSON_CATEGORY_INDEX] = (state, index) => {
  state.personCategoryIndex = index
}

mutations[types.SET_MY_GROUPS] = (state, groups) => {
  state.myGroups = groups
}

mutations[types.SET_MY_FLOCKS] = (state, flocks) => {
  state.myFlocks = flocks
}

mutations[types.WITHDRAW_MESSAGE] = (state, { code, messageCode }) => {
  let messageObj = state.messages[code]

  if (messageObj) {
    let message = messageObj.messages.find((ele) => {
      return ele.code === messageCode
    })
    // if (message) {
    //   message.content = '你撤回了一条消息'
    //   message.type = 1
    // }
  }
}
// #endregion

// #region getters
const getters = {
  loading (state) {
    return state.loading
  },
  sendMessage (state) {
    return state.sendMessage
  },
  serviceInfo (state) {
    return state.serviceInfo
  },
  allDevices (state) {
    return state.allDevices
  },
  messageListInfo (state) {
    return state.messageListInfo
  },
  searchChatName (state) {
    return state.searchChatName
  },
  is_moreFunction (state) {
    return state.is_moreFunction
  },
  is_autoReply (state) {
    return state.is_autoReply
  },
  hide_leftBar (state) {
    return state.hide_leftBar
  },
  is_messageList (state) {
    return state.is_messageList
  },
  is_circleFriendsList (state) {
    return state.is_circleFriendsList
  },
  show_memberDetail (state) {
    return state.show_memberDetail
  },

  userInfo (state) {
    return state.userInfo
  },

  contactMyCustomer (state) {
    return state.contactMyCustomer
  },

  contactMySales (state) {
    return state.contactMySales
  },

  nowSelectGroup (state) {
    return state.nowSelectGroup
  },

  nowSelectguide (state) {
    return state.nowSelectguide
  },

  claimedCustomerHasChange (state) {
    return state.claimedCustomerHasChange
  },

  groupMembersList (state) {
    return state.groupMembersList
  },

  personMemberList (state) {
    return state.personMemberList
  },

  // currentPersonMember (state) {
  //   return state.currentPersonMember
  // },

  getPersonMemberInfo: (state) => (code) => {
    let member = state.personMemberList[code]
    return member
  },

  getPersonMemberInfoByMemberNo: (state) => (memberNo) => {
    return Object.values(state.personMemberList).find((val) => {
      return val.memberNo === memberNo
    })
  },

  personMemberSortedList (state) {
    let list = []

    Object.keys(state.personMemberList).forEach((key) => {
      list.push(state.personMemberList[key])
    })

    list = list.sort((a, b) => {
      return b.lastModified - a.lastModified
    })

    return list
  },

  // 当前选择的单聊对象 code
  currentPersonMemberCode (state) {
    return state.currentPersonMemberCode
  },

  // 当前选择的单聊对象信息
  currentPersonMember (state) {
    return state.personMemberList[state.currentPersonMemberCode] || state.currentPersonMember
  },

  personMemberListTotal (state) {
    return state.personMemberListTotal
  },

  getPersonMessages: (state) => (personCode) => {
    return state.messages[personCode]
  },

  getPersonMessage: (state) => ({ personMemberCode, messageCode }) => {
    let mObj = state.messages[personMemberCode]

    if (!mObj) {
      return null
    }

    let ret = mObj.messages.find((m) => {
      return m.code === messageCode
    })

    return ret
  },

  currentPersonMemberDetail (state) {
    return state.currentPersonMemberDetail
  },

  currentPersonMessages (state) {
    let m = state.messages[state.currentPersonMemberCode]

    if (!m) {
      return {
        init: false,
        messages: []
      }
    } else {
      return m
    }
  },

  personCategoryIndex (state) {
    return state.personCategoryIndex
  },

  myGroups (state) {
    return state.myGroups
  },

  myFlocks (state) {
    return state.myFlocks
  },
}
// #endregion

// #region actions
const actions = {
  hideLoading: ({
    commit
  }) => {
    commit(types.HIDE_LOADING)
  },
  showLoading: ({
    commit
  }) => {
    commit(types.SHOW_LOADING)
  },

  sendMessage: ({
    commit
  }, data) => { // 发送消息
    commit(types.SENDMESSAGE, data)
  },
  serviceInfo: ({
    commit
  }, data) => { // 微信号切换
    commit(types.SERVICEINFO, data)
  },
  allDevices: ({
    commit
  }, data) => { // 所有终端
    commit(types.ALL_DEVICES, data)
  },

  messageListInfo: ({
    commit
  }, data) => { // 列表消息切换
    commit(types.MESSAGELISTINFO, data)
  },
  searchChatName: ({
    commit
  }, data) => { // 搜索聊天名称
    commit(types.SEARCHCHATNAME, data)
  },
  is_moreFunction: ({
    commit
  }, data) => { // 右侧功能 、客户信息切换
    commit(types.IS_MOREFUNCTION, data)
  },
  is_autoReply: ({
    commit
  }, data) => { // 托管
    commit(types.IS_AUTOREPLY, data)
  },
  hide_leftBar: ({
    commit
  }, data) => { // 影藏leftBar
    commit(types.HIDE_LEFTBAR, data)
  },
  is_messageList: ({
    commit
  }, data) => { // 消息列表切换
    commit(types.IS_MESSAGELIST, data)
  },
  is_circleFriendsList: ({
    commit
  }, data) => { // 朋友圈切换
    commit(types.IS_CIRCLEFRIENDSLIST, data)
  },
  show_memberDetail: ({
    commit
  }, data) => { // 我的客户列表展示客户信息
    commit(types.SHOW_MEMBERDETAIL, data)
  },

  updateUserInfo: ({
    commit
  }, data) => { // 朋友圈切换
    commit(types.UPDATE_USER_INFO, data)
  },

  nowSelectguide: ({
    commit
  }, data) => { // 当前选择的导购
    commit(types.NOW_SELECT_GUIDE, data)
  },

  contactMyCustomer: ({
    commit
  }, data) => {
    commit(types.CONTACT_MY_CUSTOMER, data)
  },

  contactMySales: ({
    commit
  }, data) => {
    commit(types.CONTACT_MY_SALES, data)
  },


  currentPersonMember: ({
    commit
  }, data) => {
    commit(types.CURRENT_PERSON_MEMBER, data)
  },


  claimedCustomerHasChange: ({
    commit
  }, data) => {
    commit(types.CLAIMED_CUSTOMER_HAS_CHANGE, data)
  },

  groupMembersList: ({
    commit
  }, data) => {
    commit(types.GROUP_MEMBERS_LIST, data)
  },



  async fetchPersonMemberList ({dispatch, commit, state }, { pageSize = 99999 }) {
    // dispatch('showLoading')
    const data = await findPersonMemberList(Vue.prototype.$http, {
      noWx: state.nowSelectguide.noWx,
      memberNoGm: state.userInfo.memberNoGuid,
      pageNo: 1,
      pageSize: pageSize
    })
    if(data) {
      // dispatch('hideLoading')
    }

    commit(types.SET_PERSON_MEMBER_LIST, data.rows)
    return data
  },

  async setPersonMemberList ({ commit }, { list }) {
    commit(types.SET_PERSON_MEMBER_LIST, list)
  },

  async fetchAppendPersonMemberList ({ commit }, { pageNo, pageSize }) {
    const res = await Vue.prototype.$http.get('/api/imh5/index/personMemberList.do', {
      noWx: state.nowSelectguide.noWx,
      memberNoGm: state.userInfo.memberNoGuid,
      pageNo: pageNo,
      pageSize: pageSize
    })

    if (!res.data.result) {
      return
    }

    let data = res.data.returnObject.page
    commit(types.APPEND_PERSON_MEMBER_LIST, data.rows)
    commit(types.SET_PERSON_MEMBER_LIST_TOTAL, data.total)

    return data
  },

  // 更改当前选择的用户
  async changeCurrentMessagePerson ({ commit, getters }, code) {

    commit(types.SET_CURRENT_PERSON_MEMBER_CODE, code)

    let curr = getters.currentPersonMember

    if (!curr) {
      return
    }

    // 获取单聊对象详细信息
    if (!curr.chatRoomFlag) {

      try {
        let res = await findPersonMember(Vue.prototype.$http, {
          memberNoGm: curr.memberNoGm,
          code: curr.code || curr.codePm,
          memberNo:curr.memberNo
        })

        commit(types.SET_CURRENT_PERSON_MEMBER_DETAIL, res)
      } catch (ex) { }
    }

    return curr
  },

  // 更新未读数为 0
  async updateThirdHaveRead ({ commit, getters }, code) {
    let member = getters.personMemberList[code]
    if (!member) {
      return
    }

    let data = {
      memberNo: member.memberNo,
      merchantNo: member.merchantNo
    }

    if (!member.chatRoomFlag) {
      data.memberNoGm = member.memberNoGm
    }

    let res = await Vue.prototype.$http.post('/api/imh5/index/updateThirdHaveRead.do', data)

    if (res.data.result) {
      commit(types.UPDATE_UNREAD_COUNT, { code, unreadCount: 0 })
    }

    return res
  },

  // 修改用户昵称
  async editNickName ({ commit, getters }, { code, nickName }) {
    let member = getters.getPersonMemberInfo(code)
    if (!member) {
      return
    }

    let res = await Vue.prototype.$http.post('/api/imh5/index/updatePersonMember.do', {
      memberNoGm: member.memberNoGm, // 导购编号
      memberNo: member.memberNo, // 客户编号
      memberName: nickName // 客户名称
    })

    if (res.data.result) {
      commit(types.EDIT_NICKNAME, { code, nickName })
    }
    return res
  },

  async initPersonMemberMessages ({ commit, getters }, { code }) {
    let member = getters.personMemberList[code] || state.currentPersonMember

    if (Object.keys(member).length === 0) {
      return
    }

    let memberNoGm = member.chatRoomFlag ? null : member.memberNoGm
    let res = await getChatMessages(Vue.prototype.$http, {
      memberNoGm,
      memberNo: member.memberNo,
      chatRoomFlag: member.chatRoomFlag,
      code,
      start: 0
    })

    if (res.data.result) {
      let messages = res.data.returnObject.rows
      messages.forEach((message) => {
        message.chatTime = new Date(message.chatTime)
      })

      messages.reverse()
      commit(types.SET_PERSON_MEMBER_MESSAGES, { code, messages })
      return res
    }
  },

  async reFetchCurrentPersonMemberMessages ({ getters, dispatch }) {
    if (Object.keys(getters.currentPersonMember).length === 0) {
      return
    }
    dispatch('initPersonMemberMessages', { code: getters.currentPersonMemberCode })
  },

  async appendOldPersonMemberMessages ({ commit, getters }, { code }) {
    let member = getters.personMemberList[code]
    if (!member) {
      return
    }

    let messageObj = getters.getPersonMessages(code)

    let start = 0
    if (messageObj) {
      start = messageObj.messages.length
    }
    let memberNoGm = member.chatRoomFlag ? null : member.memberNoGm
    let res = await getChatMessages(Vue.prototype.$http, {
      memberNoGm,
      memberNo: member.memberNo,
      chatRoomFlag: member.chatRoomFlag,
      code,
      start
    })

    if (res.data.result) {
      let messages = res.data.returnObject.rows
      messages.forEach((message) => {
        message.chatTime = new Date(message.chatTime)
      })

      messages.reverse()

      commit(types.APPEND_PERSON_MEMEBER_MESSAGES, { code, messages, type: 0, loadCount: 20 })
    }

    return res
  },

  async insertPersonMemberMessage ({ commit, getters }, { code, message }) {
    let messageObj = getters.getPersonMessages(code)

    // 此条信息已经存在
    if (messageObj && messageObj.codes && messageObj.codes.has(code)) {
      return false
    }

    if (!(message.chatTime instanceof Date)) {
      message.chatTime = new Date(message.chatTime)
    }

    commit(types.INSERT_PERSON_MEMEBER_MESSAGES, { code, message })
    return true
  },

  // 在渲染前发出事件，用于测量窗口等
  async appendSendMessageAfter (_, { code }) {
    return true
  },

  // 记录发送的消息
  async appendSendMessage ({ dispatch, commit }, { code, message }) {
    await dispatch('insertPersonMemberMessage', {
      code,
      message
    })

    commit(types.RENEW_PSRSON_MEMBER_ORDER, { code })
    await dispatch('appendSendMessageAfter', { code })
  },

  // 从网络收到消息
  async receiveMessage ({ dispatch, commit, getters }, { message }) {
    let code = message.memberCode
    let memberInfo = getters.getPersonMemberInfo(code)
    await dispatch('receiveMessageBefore', { code })

    if (!memberInfo) {
      let res = await findPersonMember(Vue.prototype.$http, { memberNo: message.memberNo, memberNoGm: message.memberNoGm })
      commit(types.APPEND_PERSON_MEMBER_LIST, [res])

      code = res.code
      memberInfo = getters.getPersonMemberInfo(code)
    }

    let res = await dispatch('insertPersonMemberMessage', {
      code,
      message
    })

    if (!res) {
      return
    }

    commit(types.RENEW_PSRSON_MEMBER_ORDER, { code })

    // 更新未读数
    if (code === getters.currentPersonMemberCode) {
      await dispatch('receiveMessageForCurrentPersonMemeber', { code })
    } else {
      commit(types.UPDATE_UNREAD_COUNT, { code, unreadCount: memberInfo.unreadCount + 1 })
    }
  },

  // 在渲染前发出事件，用于测量窗口等
  async receiveMessageBefore (_, { code }) {
    return
  },

  async receiveMessageForCurrentPersonMemeber ({ dispatch }, { code }) {
    await dispatch('updateThirdHaveRead', code)
  },

  async prepareChating ({ commit, getters }, { code, chatUserType, memberNoGm }) {
    let pm = getters.personMemberList[code]
    //console.log(getters.personMemberList)
    if (!pm) {
      if (chatUserType === CHAT_USER_TYPE.group) {
        let group = getters.myGroups.find((group) => {
          return group.code === code
        })
        if (!group) {
          throw new Error('无法找到聊天群')
        }

        pm = Object.assign({}, group)
        pm.memberName = pm.roomNickName
        pm.memberNo = pm.code
        pm.chatRoomFlag = true
        pm.unreadCount = 0
      } else if (chatUserType === CHAT_USER_TYPE.flock){

        let flock = getters.myFlocks.find((flock) => {
          return flock.code === code
        })
        // console.log(flock)
        // if (!flock) {
        //   throw new Error('无法找到群组')
        // }

        pm = Object.assign({}, flock)
        pm.memberName = pm.pmName
        pm.memberNo = pm.code
        pm.chatRoomFlag = true
        pm.unreadCount = 0

      } else {
        let customer = getters.contactMyCustomer.find((customer) => {
          // console.log(customer.codePm)
          // console.log(code)
          return customer.codePm === code
        })
        if (!customer) {
          throw new Error('无法找到聊天对象')
        }

        pm = Object.assign({}, customer)
        pm.code = pm.codePm
        pm.chatRoomFlag = false
        pm.unreadCount = 0
      }
      if (!pm) {
        throw new Error('无法获取聊天对象信息')
      }

      pm.lastModified = (new Date()).getTime()
      commit(types.APPEND_PERSON_MEMBER_LIST, [pm])
    }

    commit(types.RENEW_PSRSON_MEMBER_ORDER, { code })
    commit(types.SET_PERSON_CATEGORY_INDEX, 0)
  },

  async clearAfterChangingServiceInfo ({ commit }) {
    commit(types.SET_PERSON_MEMBER_LIST, [])
    commit(types.SET_CURRENT_PERSON_MEMBER_CODE, '')
    commit(types.SET_MESSAGES, {})
    commit(types.SET_CURRENT_PERSON_MEMBER_DETAIL, {})
  },

  async fetchMyGroups ({ commit }, { memberNoGm, merchantNo, shopNo }) {
    let groups = await findChatRoom(Vue.prototype.$http, {
      memberNoGm, merchantNo, shopNo
    })

    commit(types.SET_MY_GROUPS, groups)
    return groups
  },

  async fetchMyFlocks ({ commit }, { pmCode }) {
    let flocks = await findFlockRoom(Vue.prototype.$http, {
      pmCode
    })

    commit(types.SET_MY_FLOCKS, flocks)
    return flocks
  },


  async withdrawMessage ({ commit }, { code, messageCode }) {
    let res = withdrawMessage(Vue.prototype.$http, { code: messageCode })
    if (res) {
      commit(types.WITHDRAW_MESSAGE, { code, messageCode })
    }
  },

  async fetchMessageByHttp ({ dispatch, getters }) {
    await dispatch('fetchPersonMemberList', { pageSize: 9999999 })
    await dispatch('updateThirdHaveRead', getters.currentPersonMemberCode)
    await dispatch('reFetchCurrentPersonMemberMessages')
  },

  async requestZkUploadChatFile ({ getters, commit }, { personMemberCode, msgId, content }) {
    let message = getters.getPersonMessage({
      personMemberCode,
      messageCode: msgId
    })

    if (!message) {
      throw new Error('消息不存在')
    }

    Vue.set(message, 'downloading', true)
    commit(types.SET_MESSAGE, {
      code: personMemberCode,
      message
    })

    try {
      requestZkUploadChatFile(Vue.prototype.$http, {
        msgId,
        content
      })
    } catch (ex) {
      message.downloading = false
      commit(types.SET_MESSAGE, {
        code: personMemberCode,
        message
      })
      throw ex
    }
  },

  async receiveFileDownloadUrl ({ dispatch, commit, state }, { messageCode, fileUrl }) {
    let personMemberCode
    let message

    let codes = Object.keys(state.messages)

    // TODO: 性能优化，目前是全遍历
    for (let i = 0; i < codes.length; i++) {
      let code = codes[i]
      let mObj = state.messages[code]

      for (let j = 0; j < mObj.messages.length; j++) {
        if (mObj.messages[j].code === messageCode) {
          message = mObj.messages[j]
          personMemberCode = code
          break
        }
      }

      if (message) {
        break
      }
    }

    if (!message) {
      return
    }

    Vue.set(message, 'resourcesPath', fileUrl)
    message.downloading = false
    commit(types.SET_MESSAGE, {
      code: personMemberCode,
      message
    })

    await dispatch('receiveFileDownloadUrlAfter', {
      title: message.shareTitle,
      url: message.resourcesPath
    })
  },

  async receiveFileDownloadUrlAfter (_, { title, url }) {
  }
}
// #endregion

export default {
  name: 'app',
  state,
  mutations,
  actions,
  getters
}
