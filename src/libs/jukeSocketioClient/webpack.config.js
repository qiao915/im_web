const path = require('path')

const resolve = (...args) => { return path.resolve(__dirname, ...args) }
const config = {
  // entry: resolve('./src/index.js'),
  entry: resolve('./test/index2.js'),
  output: {
    path: resolve('./dist'),
    filename: 'juke-socket-io-client.js'
  },
  watch: true
}

module.exports = config
