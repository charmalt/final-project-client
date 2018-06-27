const net = require('net')
class MailClient {
  constuctor () {
    this.connection = null
  }
  newConnection () {
    this.connection = new net.Socket()
  }
}

module.exports = MailClient
