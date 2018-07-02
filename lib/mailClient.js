const SenderHandshakeFactory = require('../lib/senderHandshake').SenderHandshakeFactory
const ReceiverHandshakeFactory = require('../lib/receiverHandshake').ReceiverHandshakeFactory
const Socket = require('net').Socket

class MailClient {
  constructor (smtpPort, smtpHost, popPort, popHost) {
    this.smtpPort = smtpPort
    this.smtpHost = smtpHost
    this.popPort = popPort
    this.popHost = popHost
  }

  send (message) {
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
