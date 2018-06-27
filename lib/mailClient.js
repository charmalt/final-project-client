const Sender = require('./sendMessage')
const Socket = require('net').Socket
class MailClient {
  constructor () {
    this.connection = null
    this.sendMode = false
    this.message = {
      MAIL_FROM: 'john@john.com',
      RCPT_TO: 'igor@john.com',
      DATA: 'Hi Igor'
    }
  }
  newConnection () {
    this.connection = new Socket()
  }
  connect (PORT, HOST) {
    this.connection.connect(PORT, HOST)
    if (this.sendMode) {
      Sender.send(this.message)
    }
  }
  sendModeOn () {
    this.sendMode = true
  }
  sendModeOff () {
    this.sendMode = false
  }
}

module.exports = MailClient
