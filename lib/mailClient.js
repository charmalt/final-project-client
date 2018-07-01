const Sender = require('../lib/sender')
const Receiver = require('../lib/receiver')
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
    this.receiver = null
    this.connectionModeOperator = null
  }

  send () {
    this._connect()
    this.sender = new Sender(this.message, this.connection)
    this.connectionModeOperator = this.sender
    this.sender.send()
  }

  receive () {
    this._connect()
    this.receiver = new Receiver(this.connection)
    this.connectionModeOperator = this.receiver
    this.receiver.receive()
  }
}

module.exports = MailClient
