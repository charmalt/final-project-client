const SenderHandshakeFactory = require('../lib/senderHandshake').SenderHandshakeFactory
const ReceiverHandshakeFactory = require('../lib/receiverHandshake').ReceiverHandshakeFactory
const ServerConnectionFactory = require('../lib/serverConnection').ServerConnectionFactory
const Inbox = require('../lib/inbox')

class MailClient {
  constructor (smtpPort, smtpHost, popPort, popHost, user,
    serverConnectionFactory = ServerConnectionFactory, senderHandshakeFactory = SenderHandshakeFactory,
    receiverHandshakeFactory = ReceiverHandshakeFactory) {
    this.sender = serverConnectionFactory.build(smtpPort, smtpHost, user, senderHandshakeFactory)
    this.receiver = serverConnectionFactory.build(popPort, popHost, user, receiverHandshakeFactory)
    this.inbox = new Inbox()
  }

  send (message) {
    this.sender.connectAndHandshake(message)
  }

  receive () {
    this.receiver.connectAndHandshake(this.inbox)
  }
}

module.exports = MailClient
