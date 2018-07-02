const SenderHandshakeFactory = require('../lib/senderHandshake').SenderHandshakeFactory
const ReceiverHandshakeFactory = require('../lib/receiverHandshake').ReceiverHandshakeFactory
const ServerConnectionFactory = require('../lib/serverConnection').ServerConnectionFactory

class MailClient {
  constructor (smtpPort, smtpHost, popPort, popHost,
    ServerConnectionFactory, SenderHandshakeFactory, ReceiverHandshakeFactory) {
    this.smtpPort = smtpPort
    this.smtpHost = smtpHost
    this.popPort = popPort
    this.popHost = popHost
    this.ServerConnectionFactory = ServerConnectionFactory
    this.SenderHandshakeFactory = SenderHandshakeFactory
    this.ReceiverHandshakeFactory = ReceiverHandshakeFactory
    this.sender = this.ServerConnectionFactory.build(this.smtpPort, this.smtpHost, this.SenderHandshakeFactory)
  }

  send (message) {
    this.sender = this.ServerConnectionFactory.build(this.smtpPort, this.smtpHost, this.SenderHandshakeFactory)
  }

  receive () {
    // this._connect()
    // this.receiver = new Receiver(this.connection)
    // this.connectionModeOperator = this.receiver
    // this.receiver.receive()
  }
}

module.exports = MailClient
