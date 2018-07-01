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
  let connectionSpy

  beforeEach(() => {
    connection = ServerConnectionFactory.build(serverPort, serverHost)
    connectionSpy = jest.spyOn(connectionMock, 'connect')
    socketMock.mockImplementation(() => {
      return connectionMock
    })
    connection.connect()
  })

  describe('connect', () => {
    it('creates a connection on a defined port and host', () => {
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

    it('should call .on method with arguments', () => {
      let connectionSpy = jest.spyOn(connectionMock, 'on')
      expect(connectionSpy).toHaveBeenCalledWith('data', expect.any(Function))
    })
  })

  // describe('parseResponse', () => {
  //   it('should call Sender#checkResponse and pass data', () => {
  //     connection.send()
  //     //mailClient.sender = senderMock
  //     let spyOnSender = jest.spyOn(mailClient.sender, 'checkResponse')
  //     let data = 5
  //     mailClient._parseResponse(data)
  //     expect(spyOnSender).toHaveBeenCalledWith('5')
  //   })

  //
  // })
})
