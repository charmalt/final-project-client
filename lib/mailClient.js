const Sender = require('./sender')
const Socket = require('net').Socket

class MailClient {
  constructor (port, host) {
    this.connection = null
    this.port = port
    this.host = host
  }
}

module.exports = MailClient
