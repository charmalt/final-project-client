/* globals describe, it, expect, jest, beforeEach */
const MailClient = require('../lib/MailClient')

describe('MailClient', () => {
  let mailClient
  let smtpPort = 1337
  let smtpHost = '127.0.0.1'
  let popPort = 5001
  let popHost = '198.168.0.5'
  const message = 'Message'
  const ReceiverHandshakeFactoryMock = 'ReceiverHandshakeFactoryMock'
  const SenderHandshakeFactoryMock = 'SenderHandshakeFactoryMock'
  const ServerConnectionFactoryMock = { build: jest.fn() }
  let serverConnectionFactorySpy

  beforeEach(() => {
    serverConnectionFactorySpy = jest.spyOn(ServerConnectionFactoryMock, 'build')
    mailClient = new MailClient(smtpPort, smtpHost, popPort, popHost,
      ServerConnectionFactoryMock, SenderHandshakeFactoryMock, ReceiverHandshakeFactoryMock)
  })

  it('creates a new serverConnection and supplies the SenderHandshakeFactory, port and host', () => {
    expect(serverConnectionFactorySpy).toHaveBeenCalledWith(smtpPort, smtpHost, SenderHandshakeFactoryMock)
  })

  it('creates a new serverConnection and supplies the SenderHandshakeFactory, port and host', () => {
    expect(serverConnectionFactorySpy).toHaveBeenCalledWith(popPort, popHost, ReceiverHandshakeFactoryMock)
  })

  describe('send', () => {

  })

  describe('receive', () => {

  })
})
