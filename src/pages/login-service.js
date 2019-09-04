import local_storage from '@/tools/local_storage'
import Vue from 'vue'
import SocketioPlugin from '@/vuePlugins/SocketioPlugin'
import { NOW_SELECT_GUIDE } from '@/store/type'

import {
  chatUtils
} from '@/utils/chatUtils'

import { UPDATE_USER_INFO } from '@/store/type'

const SOCKET_PORT_WS = '1315'
const SOCKET_PORT_WSS = '1316'
// 登陆成功，获取到用户信息以后
const service = {}

// 需要vue实例, 用户信息
service.loginSuccess = async function (self, userInfo,token) {
  self.$cfg.set('userInfo', userInfo)
  self.$cfg.set('token', token)
  local_storage.put('accessToken', token)

  // #region 初始化 socketio client
  let nettyAddress = userInfo.nettyAddress
  let protocal = location.protocol
  let nettyPort = protocal.indexOf('https') > -1 ? SOCKET_PORT_WSS : SOCKET_PORT_WS
  let socketUrl = `${protocal}//${nettyAddress}:${nettyPort}`

  Vue.use(SocketioPlugin, {
    loginToken: token,
    clientId: 1,
    socketUrl
  })

  chatUtils.init(Vue.prototype.$socket, self.$store, self.$http)
  // #endregion

  // 将用户信息写入 vuex
  self.$store.commit(UPDATE_USER_INFO, userInfo)

  // let memberNoGm = userInfo.memberNoGuid
  let assistantNo = userInfo.memberNoGuid
  let merchantNo = userInfo.memberNoMerchant
  let allDevices = []
  let urlParams = local_storage.get('urlParams')

  // 请求导购的设备终端
  let salesDevices = await self.$http({
    type: 'post',
    url: '/api/imh5/friendsjob/findShopTerminalList.do',
    params: {
      //memberNoGm,
      assistantNo,
      merchantNo
    }
  })


  if (salesDevices.data.result) {
    let data = salesDevices.data.returnObject
    // console.log(data)
    //存储店铺信息
    data.forEach((item, index)=>{
      if (urlParams && urlParams.wxId == item.noWx) {
        self.$store.commit(NOW_SELECT_GUIDE, data[index])
      } else {
        self.$store.commit(NOW_SELECT_GUIDE, data[0])
      }
    })

    // //存储第一个店铺信息
    // self.$store.commit(NOW_SELECT_GUIDE, data[0])
    for (let i = 0; i < data.length; i++) {
      let item = data[i]
      // 设置导购角色
      item._role = ['ShoppingGuide']
      allDevices.push(item)
    }
  }

  // 如果是管理员，那么请求管理员的
  // if (userInfo.adminUserId) {
  //   let adminDevices = await self.$http({
  //     type: 'post',
  //     url: '/api/imh5/friendsjob/findShopTerminalList.do',
  //     params: {
  //       merchantNo,
  //       assistantNo: userInfo.adminUserId
  //     }
  //   })
  //
  //   if (adminDevices.data.result) {
  //     let data = adminDevices.data.returnObject
  //     // console.log(data)
  //     for (let i = 0; i < data.length; i++) {
  //       let item = data[i]
  //       let findIndex = allDevices.findIndex((thisItem) => {
  //         return thisItem.noWx === item.noWx
  //       })
  //
  //       if (findIndex === -1) {
  //         item._role = ['admin']
  //
  //         allDevices.push(item)
  //       } else {
  //         allDevices[findIndex]._role.push('admin')
  //       }
  //     }
  //   }
  // }


  let serviceInfo = {}

  for (let item of allDevices) {
    serviceInfo[item.noWx] = item
  }

  self.$cfg.set('serviceInfo', serviceInfo)
  self.$cfg.set('serviceInfoOrigin', allDevices)
  self.$cfg.set('nowSelectInfo', allDevices[0])

  // 更改状态机制中的所有和选中的
  self.$store.commit('ALL_DEVICES', allDevices)
  self.$store.commit('SERVICEINFO', allDevices[0])

  if (self.$cfg.lastUrl && self.$cfg.lastUrl !== '/') {
    self.$router.replace({
      path: self.$cfg.lastUrl
    })
  } else {
      if (urlParams.code && urlParams.memberNoGm && urlParams.memberNo) {
        self.$router.replace({    //乐莎莎跳转聊天
          path : `/im-web/app/${self.$cfg.nowSelectInfo.noWx}/user/chat/${urlParams.code}/${urlParams.memberNoGm}/${urlParams.memberNo}`
        })
      } else {
        self.$router.replace({   //乐莎莎跳转加好友
          path: `/im-web/app/${self.$cfg.nowSelectInfo.noWx}`
        })
      }

  }

  // self.$message({
  //   message: res.data.errorMessage,
  //   type: 'error'
  // })

}

export default service
