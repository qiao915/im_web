import JukeSocketioClient from '@/libs/jukeSocketioClient'

export default {
  install (Vue, options) {
    let client = Vue.prototype.$socket
    if (client) {
      client.disconnect()
    }

    // const socketUrl = 'http://localhost:1315'
    const socketUrl = options.socketUrl

    client = new JukeSocketioClient(socketUrl, {
      loginToken: options.loginToken,
      clientId: (new Date()).getTime()
    })

    Vue.prototype.$socket = client
    client.on('ready', () => {
      console.log(`socket client connect ready! ${(new Date()).toISOString()}`)
    })

    client.on('disconnect', () => {
      console.log(`socket client disconnect ${(new Date()).toISOString()}`)
    })
  }
}
