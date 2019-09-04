let content = ''
const initSocket = function () {
  let socket = window.io.connect('http://localhost:9092') // 本地windows测试环境
  socket.on('connect', function () {
    console.log('socket连接成功')
    appendLine('socket 连接成功')
  })

  socket.on('disconnect', function () {
    console.log('socket连接失败')
  })

  socket.on('enewbuy', function (res) {
    // ....收到消息后具体操作
    console.log('enewbuy', res)
  })

  socket.on('jukeMessage', function (res) {
    // ....收到消息后具体操作
    console.log('jukeMessage', res)
    appendLine(res.body)
  })

  return socket
}

let socket = null

const connectButton = document.querySelector('#connect-button')
connectButton.addEventListener('click', () => {
  if (!socket) {
    socket = initSocket()
  }
})

const cons = []
const addConnectionButton = document.querySelector('#add-connect-button')
addConnectionButton.addEventListener('click', () => {
  let newS = initSocket()
  cons.push(newS)
})

window.KDC
const loginButton = document.querySelector('#login-button')
loginButton.addEventListener('click', () => {
  console.log('login-button click')
  window.KDC.getLoginToken().then((token) => {
    let req = window.KDC.createLoginRequest(token, 'GM', null, (new Date()).getTime())
    let message = window.KDC.createMessage(req.msgCode, JSON.stringify(req))
    socket.emit('jukeMessage', message)
  })
})

const button1 = document.querySelector('#button1')
button1.addEventListener('click', () => {
  console.log('button1 click')
  // socket.send('messageevent', 'I am fish')
  socket.emit('inevent', {
    msgContent: 'I am fish'
  })
})

const contentEl = document.querySelector('#show-content')
let appendContent = function (str) {
  content += str
  contentEl.textContent = content
}

let appendLine = function (str) {
  appendContent(str + '\n')
}
