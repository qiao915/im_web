const ConnectSource_GM = 'GM' // eslint-disable-line
const ConnectSource_ZK = 'ZK' // eslint-disable-line

let KDC = {}
window.KDC = KDC;

(function () {
  KDC.createMessage = function (code, body, msgId = null) {
    return {
      code,
      body,
      msgId
    }
  }

  KDC.createLoginRequest = function (token, type, imei, timestamp) {
    return {
      msgCode: 2000,
      token,
      type,
      imei,
      timestamp
    }
  }

  KDC.getLoginToken = function () {
    const phone = 13439412611
    const password = 'zxc123'
    const url = 'https://deal-api-test3.kuick.cn/api/v1.0/juke/member/login'

    var formd = new FormData()
    formd.append('phone_num', phone)
    formd.append('password', password)

    return fetch(url, {
      method: 'POST',
      body: formd
    }).then((res) => {
      return res.json()
    }).then((res) => {
      return res.data.jukeMember.token
      // return res.data.token
    })
  }
})()
