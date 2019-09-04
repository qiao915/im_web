import qs from 'qs'
import { Message } from 'element-ui'

export const senderType = {
  send: 1,
  receive: 2
}

class ChatUtils {
  init (socket, store, http) {
    this.socket = socket
    this.store = store
    this.http = http
    this.forceClose = false
    this.reconnectTime = 0
    this.minutelyReconnectTime = 0

    setTimeout(() => {
      this.minutelyReconnectTime = 0
    }, 60 * 1000)

    this.socket.onChatInfo((message) => {
      if (message.groupUserName) {
        message.chatroomType = 2
      } else {
        message.chatroomType = 1
      }

      message = this.createPersonMemberMessage(senderType.receive, message.msgId, message)
      this.store.dispatch('receiveMessage', { message })
    })

    this.socket.onFileUrl((message) => {
      this.store.dispatch('receiveFileDownloadUrl', {
        messageCode: message.msgId,
        fileUrl: message.fileUrl
      })
    })

    this.fetchTimer = null

    let clearFetchTimer = () => {
      if (this.fetchTimer) {
        clearInterval(this.fetchTimer)
        this.fetchTimer = null
      }
    }

    let createFetchTimer = () => {
      clearFetchTimer()
      this.fetchTimer = setInterval(() => {
        this.store.dispatch('fetchMessageByHttp')
      }, 1000 * 20)
    }

    createFetchTimer()

    this.socket.onReady(() => {
      clearFetchTimer()
      this.reconnectTime = 0
    })

    this.socket.onDisconnect(() => {
      createFetchTimer()

      if (!this.forceClose && this.reconnectTime <= 3 && this.minutelyReconnectTime <= 5) {
        window.setTimeout(() => {
          this.socket.reconnect()
          this.reconnectTime++
          this.minutelyReconnectTime++
        }, 1000 * (this.reconnectTime + 1))
      }
    })

    this.socket.onError(() => {
      createFetchTimer()
      this.reconnectTime++
    })
  }

  async receiveResponseMessagePromise (msgId) {
    const responseMessage = 'responseMessage'
    return new Promise((resolve, reject) => {
      let callback = (message) => {
        if (message.msgId !== msgId) {
          return
        }

        this.socket.removeListener(responseMessage, callback)
        clearTimeout(t)

        let body = JSON.parse(message.body)
        if (!body.result) {
          reject()
        } else {
          resolve()
        }
      }

      let t = setTimeout(() => {
        clearTimeout(t)
        this.socket.removeListener(responseMessage, callback)
        reject()
      }, 1000 * 10)

      this.socket.on(responseMessage, callback)
    })
  }

  async sendPhotoChatMessage (payload) {
    return await this.sendMessageByHttp(payload)
  }

  async sendVoiceChatMessage (payload) {
    return await this.sendMessageByHttp(payload)
  }

  async sendVideoChatMessage (payload) {
    return await this.sendMessageByHttp(payload)
  }

  async sendActivityChatMessage (payload) {
    return await this.sendMessageByHttp(payload)
  }

  async sendMessageByHttp (payload) {
      return await this.http.post('/api/imh5/index/sendChatMessage.do',payload)
  }

  async sendMessageAsync (payload) {

    let res = await this.sendMessageByHttp(payload)
    //console.log(res)
    if (res && res.data.result) {
      let message = this.createPersonMemberMessage(senderType.send, payload.msgId, payload)

      if (!message) {
        return
      }
      await this.store.dispatch('appendSendMessage', {
        code: message.memberCode,
        message
      })
      // console.log(payload)
       //显示红包 转账消息
      if(payload.type === 436207665 || payload.type === 419430449){
          Message(res.data.returnObject)
      }

    } else if (!res.data.result) {

      Message(res.data.errorMessage)
      throw new Error(res.data.errorMessage)

    } else {
      let ret = res.data.returnObject

      if (!ret) {
        throw new Error('发送消息失败')
      } else if (ret.zkclient_offline) {
        throw new Error('中间件客户端已经离线')
      }

    }
  }

  // 将接收和发送的 message 统一化
  createPersonMemberMessage (senderTypeFlag, messageId, payload) {
    let o = {
      alias: '',
      chatTime: new Date(),
      chatroomType: 1,
      code: messageId,
      content: '',
      errorCode: '',
      errorMessage: '',
      imei: '',
      memberHeadUrl: '',
      memberName: '',
      memberNameGm: '',
      memberNo: '',
      msgSource: 1,
      noWx: '',
      noWxGm: '',
      resourcesPath: '',
      senderFlag: 1,
      senderSyncStatus: 1,
      shareDes: '',
      shareTitle: '',
      shareUrl: '',
      status: 2,
      thirdReadFlag: 1,
      type: 1
    }

    let message = Object.assign(o, payload)

    let member
    member = this.store.getters.getPersonMemberInfoByMemberNo(message.memberNo)

    if (senderTypeFlag === senderType.send) {
      message.senderFlag = senderType.send
      if (!member) {
      //  console.error('找不到发送用户：', payload)
        return
      }

      if (member.chatRoomFlag) {
        message.chatroomNoWx = member.noWxGm
      }

      message.alias = member.noWxAlias
      message.code = messageId
      message.memberName = member.memberName
      message.memberNameGm = member.memberNameGm
      message.noWxGm = member.noWxGm
    }

    if (member) {
      message.memberCode = member.code
    }

    message.resourcesPath = payload.resources
    return message
  }

}

export const chatUtils = new ChatUtils()
export default ChatUtils
