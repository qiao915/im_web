import qs from 'qs'
import { Message } from 'element-ui'

// 获取聊天数据
export async function getChatMessages (http, {
  memberNo,
  memberNoGm,
  code,
  chatRoomFlag,
  start,
  limit = 20,
  disableLoading = false
}) {
  return await http.post('/api/imh5/index/gmChat.do', {
    memberNo,
    memberNoGm,
    code,
    chatRoomFlag,
    start,
    limit
  }, {
    headers: {
      'inner-disableLoading': disableLoading
    }
  })
}

// 获取我的客户
export async function findFriends (http, {
//  memberNoGm,
  merchantNo,
  noWxGm,
  start = 0,
  limit = 99999
}) {
  return await http.get('/api/im/contacts/findFriends.do', {
  //  memberNoGm,
    merchantNo,
    noWxGm,
    start,
    limit
  })
}

// 获取导购信息
export async function findGm (http, {
  memberNoGm
}) {
  return await http.get('/api/member/findGm.do', {
    memberNoGm
  })
}

// 获取聊天对象集合
export async function findPersonMemberList (http, {
  noWx,
  memberNoGm,
  pageNo,
  pageSize,
  disableLoading = false
}) {
  const res = await http.get('/api/imh5/index/personMemberList.do', {
    noWx,
    memberNoGm,
    pageNo,
    pageSize
  }, {})

  if (!res.data.result) {
    throw new Error('获取聊天对象失败')
  }

  return res.data.returnObject.page
}

// 获取用户详细信息
export async function findPersonMember (http, {
  code,
//pmTypeCode,
  memberNo,
  memberNoGm
}) {
  let res = await http.get('/api/imh5/index/findPersonMember.do', {
    code,
  //pmTypeCode,
    memberNo,
    memberNoGm
  })

  if (res && res.data.result) {
    return res.data.returnObject
  }

  throw new Error('找不到聊天对象信息')
}

// 获取群聊
export async function findChatRoom (http, { memberNoGm, merchantNo, shopNo, start = 0, limit = 9999999 }) {
  let res = await http.get('/api/im/chatroom/findChatRoom.do', {
    memberNoGm,
    merchantNo,
    shopNo,
    start,
    limit
  })

  if (!res || !res.data.result || res.status !== 200) {
    throw new Error('获取群聊信息失败')
  }

  return res.data.returnObject.rows
}

// 获取群聊
export async function findFlockRoom (http, { pmCode }) {
  let res = await http.get('/api/im/chatroom/findChatRoomByPmCode.do', {
    pmCode
  })

  if (!res || !res.data.result || res.status !== 200) {
    throw new Error('获取群组信息失败')
  }

  return res.data.returnObject
}

// 撤回消息
export async function withdrawMessage (http, { code }) {
  let res = await http.post('/api/imh5/index/toCancelChatInfo.do', { code })
  if (res.data.result && res.data.returnObject.success) {
    if(res.data.returnObject.msg){
        Message(res.data.returnObject.msg)
    } else {
      Message('撤回成功')
    }

    return true
  } else {
    Message(res.data.returnObject.msg)
    throw new Error(res.data.errorMessage)
  }

}

// amr 转 mp3
export async function audioConvert (http, { amrUrl }) {
  let res = await http.post('/api/imh5/index/audioConvert.do', { resource: amrUrl })

  if (res.data.result) {
    return res.data.returnObject
  } else {
    throw new Error('转换音频文件失败')
  }
}

// 通知服务端获取文件下载地址
export async function requestZkUploadChatFile (http, { msgId, content, findFlag = 1 }) {
  let res = await http.post('/api/imh5/index/requestZkUploadChatFile.do', { msgId, content, findFlag })

  if (res && res.data.result) {
    return true
  }

  throw new Error('获取下载地址失败!')
}

// 通知服务端获取视频下载地址
export async function requestZkUploadVideoFile (http, { msgId, content, findFlag = 1 }) {
  let res = await http.post('/api/imh5/index/requestZkUploadChatVideo.do', { msgId, content, findFlag })

  if (res && res.data.result) {
    return true
  }

  throw new Error('获取视频下载地址失败!')
}
