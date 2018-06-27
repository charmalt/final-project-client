const Socket = require('net').Socket
class MailClient {
  constructor () {
    this.connection = null
    this.communicationMode = null
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
  }
  setMode (mode) {
    this.communicationMode = mode
  }
}

module.exports = MailClient
