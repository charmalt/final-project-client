const ServerConnectionFactory = require('../lib/serverConnection').ServerConnectionFactory
jest.mock('net')

describe('SMTPConnection', () => {
  let connection
  let senderConnection
  const serverPort = 5001
  const serverHost = 'host'
  const message = 'Message'
  let connectionObject = { port: serverPort, host: serverHost }
  let socketMock = require('net').Socket
  let connectionMock = {
    connect: jest.fn(),
    setEncoding: jest.fn(),
    setNoDelay: jest.fn(),
    on: jest.fn()
  }
  const handshakeConnection = { init: jest.fn() }
  const senderHandshakeConnection = { init: jest.fn() }
  let handshakeConnectionSpy = jest.spyOn(handshakeConnection, 'init')
  let senderHandshakeConnectionSpy = jest.spyOn(senderHandshakeConnection, 'init')
  const mockHandshake = { checkResponse: jest.fn(), initiateHandshake: jest.fn() }
  const mockHandshakeFactory = { build: jest.fn((connection, message) => {
    handshakeConnection.init(connection, message)
    return mockHandshake
  }) }
  const mockSenderHandshakeFactory = { build: jest.fn((connection, message) => {
    senderHandshakeConnection.init(connection, message)
    return mockHandshake
  }) }
  let connectionSpy

  beforeEach(() => {
    connection = ServerConnectionFactory.build(serverPort, serverHost, mockHandshakeFactory)
    senderConnection = ServerConnectionFactory.build(serverPort, serverHost, mockSenderHandshakeFactory)
    connectionSpy = jest.spyOn(connectionMock, 'connect')
    socketMock.mockImplementation(() => {
      return connectionMock
    })
    handshakeConnectionSpy.mockClear()
    connection.connectAndHandshake()
  })

  describe('connectAndHandshake', () => {
    it('creates a connection on a defined port and host', () => {
      expect(connectionSpy).toHaveBeenCalledWith(connectionObject, expect.any(Function))
    })

    it('should set encoding of connection to utf-8', () => {
      let socketSpy = jest.spyOn(connectionMock, 'setEncoding')
      expect(socketSpy).toHaveBeenCalledWith('utf-8')
    })

    it('should set no delay to true', () => {
      let socketSpy = jest.spyOn(connectionMock, 'setNoDelay')
      expect(socketSpy).toHaveBeenCalledWith(true)
    })

    it('should call .on method with arguments', () => {
      let connectionSpy = jest.spyOn(connectionMock, 'on')
      expect(connectionSpy).toHaveBeenCalledWith('data', expect.any(Function))
    })

    it('creates a new handshake with one argument for receiver', () => {
      expect(handshakeConnectionSpy).toHaveBeenCalledWith(connectionMock, undefined)
    })

    it('creates a new handshake with two arguments for sender', () => {
      senderConnection.connectAndHandshake(message)
      expect(senderHandshakeConnectionSpy).toHaveBeenCalledWith(connectionMock, message)
    })

    it('initiates the handshake', () => {
      let handshakeSpy = jest.spyOn(mockHandshake, 'initiateHandshake')
      expect(handshakeSpy).toHaveBeenCalled()
    })
  })

  describe('parseResponse', () => {
    const data = 123

    beforeEach(() => {
      connection.parseResponse(data)
    })

    it('checks the response', () => {
      let mockHandshakeSpy = jest.spyOn(mockHandshake, 'checkResponse')
      expect(mockHandshakeSpy).toHaveBeenCalledWith(data.toString())
    })
  })
})
