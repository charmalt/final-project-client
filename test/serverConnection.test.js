const ConnectionFactory = require('../lib/serverConnection').ConnectionFactory
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
    setNoDelay: jest.fn()
  }
  let connectionSpy

  beforeEach(() => {
    connection = ConnectionFactory.build(serverPort, serverHost)
    connectionSpy = jest.spyOn(connectionMock, 'connect')
    socketMock.mockImplementation(() => {
      return connectionMock
    })
  })

  it('creates a connection on a defined port and host', () => {
    console.log(connectionObject)
    connection.connect()
    expect(connectionSpy).toHaveBeenCalledWith(connectionObject, () => {
      console.log('Connected to server')
    })
  })

  it('should set encoding of connection to utf-8', () => {
    let socketSpy = jest.spyOn(connectionMock, 'setEncoding')
    expect(socketSpy).toHaveBeenCalledWith('utf-8')
  })

  it('should set no delay to true', () => {
    let socketSpy = jest.spyOn(connectionMock, 'setNoDelay')
    expect(socketSpy).toHaveBeenCalledWith(true)
  })
})
