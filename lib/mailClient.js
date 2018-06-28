const Sender = require('./sender')
const Socket = require('net').Socket

class MailClient {
  constructor (port, host) {
    this.connection = null
    this.port = port
    this.host = host
    this.message = {
      MAIL_FROM: 'john@john.com',
      RCPT_TO: 'igor@john.com',
      DATA: 'From: John\nTo: Igor\nSubject: SMTP Feature Testing\n\nHi, Igor.\nThis is a test message.\nAnd this is line 3.\n\nYours,\nJohn'
    }
    this.sender = null
  }

  connect () {
    this.connection = new Socket()
    this.connection.setEncoding('utf-8')
    this.connection.setNoDelay(true)
  }
}

module.exports = MailClient
