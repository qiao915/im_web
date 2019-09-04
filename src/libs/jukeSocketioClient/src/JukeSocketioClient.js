import io from 'socket.io-client'
import {
  EventEmitter
} from 'events'
import {
  createMessage
} from './messageUtils'
import {
  DaoGou
} from './connectSource'
import {
  ConnectFail,
  ConnectTimeout,
  LoginFail,
  PrepareFail
} from './errorTypes'
import {
  JukeClientError
} from './JukeClientError'

import {
  LoginRequest,
  LoginResult,
  HeartBeatRequest,
  ChatInfoRequest,
  ErrorChatInfoResponse,
  CommonResponse,
  FileUrl
} from './messageCodes'

import { MSG_TXT, MSG_PHOTO, MSG_VOICE, MSG_VIDEO, MSG_ACTIVE } from './chatMessageTypes'

export default class JukeClient extends EventEmitter {
  /**
   * 创建client并建立连接，如果 opts 中传入 loginToken 则自动登录
   * @param  {string} url
   * @param  {any} opts
   */
  constructor (url, opts) {
    super()
    opts.reconnectionAttempts = opts.reconnectionAttempts || 3
    this.connectUrl = url
    this.connectOpts = opts
    this.connectOpts.reconnection = false

    this.socket = io.connect(this.connectUrl, this.connectOpts)

    this.eventName = opts.eventName || 'jukeMessage'
    this.loginToken = opts.loginToken
    this.clientId = opts.clientId || '1'
    this.preparedEventName = opts.preparedEventName || 'jukeProxyPrepared'
    this.heartJumpInterval = opts.heartJumpInterval || (1000 * 60 * 2)

    this.isReady = false

    this.initSocketState()
  }

  initSocketState () {
    this.heartJumpTimer = null
    // 是否第一次连接还是重连
    this.isReconnecting = false
    this.isClosed = false

    this.socket.on('connect', this.connectHandle.bind(this))
    this.socket.on('disconnect', this.disconnectHandle.bind(this))
    this.socket.on('connect_timeout', () => {
      this.emit('error', new JukeClientError(ConnectTimeout, '连接超时'))
    })
    this.socket.on('connect_error', () => {
      this.emit('error', new JukeClientError(ConnectFail, '连接失败'))
    })
    this.socket.on('reconnecting', this.reconnectingHandle.bind(this))
    this.socket.on('reconnect', this.reconnectHandle.bind(this))

    this.socket.on(this.eventName, this.messageHandle.bind(this))
    this.socket.on(this.preparedEventName, this.preparedHandle.bind(this))
  }

  reconnect () {
    if (this.socket.connected) {
      this.socket.disconnect()
    }
    this.socket = io.connect(this.connectUrl, this.connectOpts)
    this.initSocketState()
  }

  connectHandle () {
    this.emit('connect')
  }

  disconnectHandle () {
    this.clearHeartJump()
    this.emit('disconnect')
  }

  reconnectingHandle () {
    this.isReconnecting = true
    this.emit('reconnecting')
  }

  preparedHandle (data) {
    if (!data.success) {
      this.emmit('error', new JukeClientError(PrepareFail, '连接失败！'))
      return
    }

    if (this.loginToken) {
      this.sendLogin({
        token: this.loginToken
      })
    } else if (!this.isReconnecting) {
      this.emit('ready')
    } else {
      this.isReconnecting = false
      this.emit('reconnected')
    }
  }

  reconnectHandle () {
    if (this.loginToken) {
      this.sendLogin({
        token: this.loginToken
      })
    } else {
      this.isReconnecting = false
      this.emit('reconnect')
    }
  }

  messageHandle (message) {
    const code = message.code

    // 如果收到的不是确认包，先发送确认包
    if (code !== CommonResponse) {
      this.sendConfirm({
        msgId: message.msgId,
        messageCode: code
      })
    }

    this.messageHandleByCode(message)
  }

  messageHandleByCode (message) {
    const code = message.code
    const bodyObj = JSON.parse(message.body)
    switch (code) {
      case LoginResult:
        this.messageHandleLoginResult(bodyObj)
        break
      case ErrorChatInfoResponse:
        this.emit('errorChat', bodyObj)
        break
      case CommonResponse:
        this.emit('responseMessage', message)
        break
      case ChatInfoRequest:
        bodyObj.msgId = message.msgId
        this.emit('chatInfo', bodyObj)
        break
      case FileUrl:
        this.emit('fileUrl', bodyObj)
        break
      default:
        break
        // console.error('no meaning message', message)
    }
  }

  messageHandleLoginResult (data) {
    if (!data.result) {
      this.emit('error', new JukeClientError(LoginFail, `登录失败：${data.message}`))
    } else if (!this.isReconnecting) {
      this.emit('ready')
    } else {
      this.isReconnecting = false
      this.emit('reconnected')
    }
  }

  disconnect () {
    this.clearHeartJump()
    this.socket.close()
  }

  // 建立链接并登录成功
  onReady (callback) {
    this.on('ready', callback)
  }

  onError (callback) {
    this.on('error', callback)
  }

  onConnect (callback) {
    this.on('connect', callback)
  }

  // 重连时，如果有 loginToken，会自动登录，登录成功会触发此事件
  // 重连成功时被调用
  onReconnect (callback) {
    this.on('reconnect', callback)
  }

  onReconnecting (callback) {
    this.on('reconnecting', callback)
  }

  onDisconnect (callback) {
    this.on('disconnect', callback)
  }

  // 收到对方发送来的消息
  onChatInfo (callback) {
    this.on('chatInfo', callback)
  }

  // 收到后台推送的离线消息
  onOfflineChatInfo (callback) {
    this.on('offlineChatInfo', callback)
  }

  // 收到发送消息失败
  onErrorChat (callback) {
    this.on('errorChat', callback)
  }

  // 收到应答消息
  onResponseMessage (callback) {
    this.on('responseMessage', callback)
  }

  onFileUrl (callback) {
    this.on('fileUrl', callback)
  }

  // 请求登录，通过 onReady 监听登录成功结果
  sendLogin ({
    token,
    type = DaoGou
  }) {
    const body = {
      token,
      type,
      clientType: 'pc-web',
      clientId: this.clientId
    }

    this.sendMessage({
      code: LoginRequest,
      body
    })
  }

  // 发送心跳包。此心跳包是应用心跳包，不是网络层心跳包
  sendHeartJump () {
    const body = {}

    this.sendMessage({
      code: HeartBeatRequest,
      body
    })
  }

  // 发送应答消息
  sendConfirm ({
    msgId,
    messageCode
  }) {
    const body = {
      messageCode
    }

    this.sendMessage({
      code: CommonResponse,
      msgId,
      body
    })
  }

  sendTextChatMessage ({
    msgId,
    memberNoGm,
    noWxGm,
    memberNo,
    noWx,
    content
  }) {
    let data = {
      msgId,
      memberNoGm,
      noWxGm,
      memberNo,
      noWx,
      content,
      type: MSG_TXT
    }

    this.sendChatMessage(data)
  }

  sendPhotoChatMessage ({
      msgId,
      memberNoGm,
      noWxGm,
      memberNo,
      noWx,
      resources
  }) {
    let data = {
      msgId,
      memberNoGm,
      noWxGm,
      memberNo,
      noWx,
      resources,
      type: MSG_PHOTO
    }

    this.sendChatMessage(data)
  }

  sendVoiceChatMessage ({
      msgId,
      memberNoGm,
      noWxGm,
      memberNo,
      noWx,
      resources
  }) {
    let data = {
      msgId,
      memberNoGm,
      noWxGm,
      memberNo,
      noWx,
      resources,
      type: MSG_VOICE
    }

    this.sendChatMessage(data)
  }

  sendVideoChatMessage ({
      msgId,
      memberNoGm,
      noWxGm,
      memberNo,
      noWx,
      resources
  }) {
    let data = {
      msgId,
      memberNoGm,
      noWxGm,
      memberNo,
      noWx,
      resources,
      type: MSG_VIDEO
    }

    this.sendChatMessage(data)
  }

  sendActivityChatMessage ({
      msgId,
      memberNoGm,
      noWxGm,
      memberNo,
      noWx,
      shareTitle,
      shareDes,
      shareUrl,
      iconUrl
  }) {
    let data = {
      msgId,
      memberNoGm,
      noWxGm,
      memberNo,
      noWx,
      shareTitle,
      shareDes,
      shareUrl,
      type: MSG_ACTIVE
    }

    if (iconUrl) {
      data.resources = iconUrl
    }

    this.sendChatMessage(data)
  }

  // 发送聊天消息
  sendChatMessage ({
    msgId,
    memberNoGm, // 导购编号，非空
    noWxGm, // 导购微信号，非空
    memberNo, // 客户编号，非空
    noWx, // 客户微信号，非空
    alias, // 客户微信别名
    type, // 消息类型, 非空
    senderFlag, // 发送人标识(1：导购发送2：客户发送)
    content, // 内容，非空
    resources, // 资源路径：语音、图片、视频
    shareTitle, // 分享标题
    shareDes, // 分享描述
    shareUrl, // 分享链接
    createTime = (new Date()).getTime(), // 创建时间
    groupUserName, // 群聊发送人微信
    headUrl, // 群头像
    roomNickName, // 群昵称
    memberNickName, // 群聊发送人昵称
    memberHeadUrl // 群聊发送人头像
  }) {
    const body = {
      msgID: msgId,
      memberNoGm,
      noWxGm,
      memberNo,
      noWx,
      alias,
      type,
      senderFlag,
      content,
      resources,
      shareTitle,
      shareDes,
      shareUrl,
      createTime,
      groupUserName,
      headUrl,
      roomNickName,
      memberNickName,
      memberHeadUrl
    }

    this.sendMessage({
      msgId,
      code: ChatInfoRequest,
      body
    })
  }

  sendMessage ({
    code,
    msgId,
    body
  }) {
    const message = createMessage(code, msgId, body)
    this.socket.emit('jukeMessage', message)
    this.resetHeartJump()
  }

  resetHeartJump () {
    if (this.heartJumpTimer) {
      this.clearHeartJump()
    }

    this.heartJumpTimer = setTimeout(() => {
      this.sendHeartJump()
      this.resetHeartJump()
    }, this.heartJumpInterval)
  }

  clearHeartJump () {
    clearTimeout(this.heartJumpTimer)
    this.heartJumpTimer = null
  }
}
