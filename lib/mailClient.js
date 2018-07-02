const SenderHandshakeFactory = require('../lib/senderHandshake').SenderHandshakeFactory
const ReceiverHandshakeFactory = require('../lib/receiverHandshake').ReceiverHandshakeFactory
const ServerConnectionFactory = require('../lib/serverConnection').ServerConnectionFactory

class MailClient {
  constructor (smtpPort, smtpHost, popPort, popHost,
    ServerConnectionFactory, SenderHandshakeFactory, ReceiverHandshakeFactory) {
    this.sender = ServerConnectionFactory.build(smtpPort, smtpHost, SenderHandshakeFactory)
    this.receiver = ServerConnectionFactory.build(popPort, popHost, ReceiverHandshakeFactory)
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
