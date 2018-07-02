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
  let mockConnection = { connectAndHandshake: jest.fn() }
  const ServerConnectionFactoryMock = { build: jest.fn(() => { return mockConnection }) }
  let serverConnectionFactorySpy
  let connectionSpy

  beforeEach(() => {
    serverConnectionFactorySpy = jest.spyOn(ServerConnectionFactoryMock, 'build')
    connectionSpy = jest.spyOn(mockConnection, 'connectAndHandshake')
    mailClient = new MailClient(smtpPort, smtpHost, popPort, popHost,
      ServerConnectionFactoryMock, SenderHandshakeFactoryMock, ReceiverHandshakeFactoryMock)
    connectionSpy.mockClear()
  })

  it('creates a new serverConnection and supplies the SenderHandshakeFactory, port and host', () => {
    expect(serverConnectionFactorySpy).toHaveBeenCalledWith(smtpPort, smtpHost, SenderHandshakeFactoryMock)
  })

  it('creates a new serverConnection and supplies the SenderHandshakeFactory, port and host', () => {
    expect(serverConnectionFactorySpy).toHaveBeenCalledWith(popPort, popHost, ReceiverHandshakeFactoryMock)
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
      expect(connectionSpy).toHaveBeenCalledWith()
    })
  })
})
