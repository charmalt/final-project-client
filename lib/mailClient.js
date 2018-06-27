const Socket = require('net').Socket
class MailClient {
  constructor () {
    this.connection = null
  }
  newConnection () {
    this.connection = new Socket()
  }
  connect (PORT, HOST) {
    this.connection.connect(PORT, HOST)
  }
}

module.exports = MailClient
