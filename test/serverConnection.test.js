const ServerConnectionFactory = require('../lib/serverConnection').ServerConnectionFactory
jest.mock('net')

describe('SMTPConnection', () => {
  let connection
  const serverPort = 5001
  const serverHost = 'host'
  let connectionObject = { port: serverPort, host: serverHost }
  let socketMock = require('net').Socket
  let connectionMock = {
    connect: jest.fn(),
    setEncoding: jest.fn(),
    setNoDelay: jest.fn(),
    on: jest.fn()
  }
  const handshakeConnection = { init: jest.fn() }
  let handshakeConnectionSpy = jest.spyOn(handshakeConnection, 'init')
  const mockHandshake = { checkResponse: jest.fn() }
  const mockHandshakeFactory = { build: jest.fn((connection) => {
    handshakeConnection.init(connection)
    return mockHandshake
  }) }
  let connectionSpy

  beforeEach(() => {
    connection = ServerConnectionFactory.build(serverPort, serverHost, mockHandshakeFactory)
    connectionSpy = jest.spyOn(connectionMock, 'connect')
    socketMock.mockImplementation(() => {
      return connectionMock
    })
    connection.connect()
  })

  describe('connect', () => {
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
  })

  describe('parseResponse', () => {
    const data = 123

    beforeEach(() => {
      connection.parseResponse(data)
    })

    it('creates a new handshake', () => {
      expect(handshakeConnectionSpy).toHaveBeenCalledWith(connectionMock)
    })

    it('checks the response', () => {
      let mockHandshakeSpy = jest.spyOn(mockHandshake, 'checkResponse')
      expect(mockHandshakeSpy).toHaveBeenCalledWith(data.toString())
    })
  })
})
