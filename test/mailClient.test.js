/* globals describe, it, expect, jest, beforeEach */
const MailClient = require('../lib/MailClient')

describe('MailClient', () => {
  let mailClient
  const smtpPort = 1337
  const smtpHost = '127.0.0.1'
  const popPort = 5001
  const popHost = '198.168.0.5'
  const message = 'Message'
  const userName = 'user@user.com'
  const ReceiverHandshakeFactoryMock = 'ReceiverHandshakeFactoryMock'
  const SenderHandshakeFactoryMock = 'SenderHandshakeFactoryMock'
  let mockConnection = { connectAndHandshake: jest.fn() }
  const ServerConnectionFactoryMock = { build: jest.fn(() => { return mockConnection }) }
  let serverConnectionFactorySpy
  let connectionSpy

  beforeEach(() => {
    serverConnectionFactorySpy = jest.spyOn(ServerConnectionFactoryMock, 'build')
    connectionSpy = jest.spyOn(mockConnection, 'connectAndHandshake')
    mailClient = new MailClient(smtpPort, smtpHost, popPort, popHost, userName,
      ServerConnectionFactoryMock, SenderHandshakeFactoryMock, ReceiverHandshakeFactoryMock)
    connectionSpy.mockClear()
  })

  it('creates a new serverConnection and supplies the SenderHandshakeFactory, port and host', () => {
    expect(serverConnectionFactorySpy).toHaveBeenCalledWith(smtpPort, smtpHost, userName, SenderHandshakeFactoryMock)
  })

  it('creates a new serverConnection and supplies the SenderHandshakeFactory, port and host', () => {
    expect(serverConnectionFactorySpy).toHaveBeenCalledWith(popPort, popHost, userName, ReceiverHandshakeFactoryMock)
  })

  describe('send', () => {
    it('sends the message', () => {
      mailClient.send(message)
      expect(connectionSpy).toHaveBeenCalledWith(message)
    })
  })

  describe('receive', () => {
    it('initiates the receive handshake', () => {
      mailClient.receive()
      expect(connectionSpy).toHaveBeenCalledWith(mailClient.inbox)
    })
  })
})
