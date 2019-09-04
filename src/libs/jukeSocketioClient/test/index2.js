import JukeSocketioClient from '../index.js'

let getLoginToken = async function () {
  // const phone = 13439412611
  // const password = 'zxc123'

  const phone = '13681568819'
  const password = '568819'
  const url = 'http://localhost:8087/api/api/member/h5Login.do?mobile=13681568819&pwd=568819&appKey=juke_im'

  var formd = new FormData()
  formd.append('mobile', phone)
  formd.append('pwd', password)
  formd.append('appKey', 'juke_im:pc-web:1')

  return fetch(url, {
    method: 'POST',
    body: formd
  }).then((res) => {
    return res.json()
  }).then((res) => {
    return res.returnObject.token
  })
}

const socketUrl = 'http://localhost:9092'
const connectButton = document.querySelector('#connect-button')
connectButton.addEventListener('click', async () => {
  let loginToken = await getLoginToken()

  console.log('get login token', loginToken)
  let client = new JukeSocketioClient(socketUrl, { loginToken, clientId: 1 })
  client.on('ready', () => {
    console.log('JukeSocketioClient ready!')
  })
})

const loginButton = document.querySelector('#login-button')
loginButton.addEventListener('click', () => {
  let client = new JukeSocketioClient(socketUrl, {
    loginToken: '787eb17c58b94eee96c00aa6cfb56ca8'
  })

  client.on('ready', () => {
    console.log('JukeSocketioClient ready!')
  })
})

