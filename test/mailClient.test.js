/* globals describe, it, expect, jest, beforeEach */
const MailClient = require('../lib/MailClient')
jest.mock('net')
jest.mock('../lib/sender')

describe('MailClient', () => {
  let mailClient
  let clientPort = 1337
  let clientHost = '127.0.0.1'
  let clientMessage = {
    MAIL_FROM: 'john@john.com',
    RCPT_TO: 'igor@john.com',
    DATA: 'From: John\nTo: Igor\nSubject: SMTP Feature Testing\n\nHi, Igor.\nThis is a test message.\nAnd this is line 3.\n\nYours,\nJohn'
  }

  let socketMock = require('net').Socket
  let SenderMock = require('../lib/sender')

  SenderMock.mockImplementation(() => {
    return senderMock
  })

  let senderMock = {
    checkResponse: jest.fn(),
    send: jest.fn()
  }

  beforeEach(() => {
    mailClient = new MailClient(clientPort, clientHost)
  })

  it('has a connection property that is set to null', () => {
    expect(mailClient.connection).toEqual(null)
  })

  it('has a port property', () => {
    expect(mailClient.port).toEqual(clientPort)
  })

  it('has a host property', () => {
    expect(mailClient.host).toEqual(clientHost)
  })

  it('has a mail property object', () => {
    expect(mailClient.message).toEqual(clientMessage)
  })

  it('has a property of sender', () => {
    expect(mailClient.sender).toEqual(null)
  })

  describe('send', () => {
    it('should call _connect', () => {
      let connectSpy = jest.spyOn(mailClient, '_connect')
      mailClient.send()
      expect(connectSpy).toHaveBeenCalled()
    })

    it('should create new sender object', () => {
      mailClient.send()
      expect(mailClient.sender).toBe(senderMock)
    })

    it('should call send on sender', () => {
      mailClient.send()
      let senderSpy = jest.spyOn(senderMock, 'send')
      expect(senderSpy).toHaveBeenCalled()
    })
  })

  describe('_connect', () => {
    beforeEach(() => {
      mailClient._connect()
    })

    it('should assign a new socket to the connection property', () => {
      expect(mailClient.connection).toBeInstanceOf(socketMock)
    })

    it('should set encoding of connection to utf-8', () => {
      let socketSpy = jest.spyOn(mailClient.connection, 'setEncoding')
      expect(socketSpy).toHaveBeenCalledWith('utf-8')
    })

    it('should set no delay to true', () => {
      let socketSpy = jest.spyOn(mailClient.connection, 'setNoDelay')
      expect(socketSpy).toHaveBeenCalledWith(true)
    })

    it('should call connect method with three arguments (port, host, function)', () => {
      let socketSpy = jest.spyOn(mailClient.connection, 'connect')
      let portHash = {port: clientPort, host: clientHost}
      expect(socketSpy).toHaveBeenCalledWith(portHash, expect.any(Function))
    })

    it('should call ', function () {
      let connectionSpy = jest.spyOn(mailClient.connection, 'on')
      expect(connectionSpy).toHaveBeenCalledWith('data', expect.any(Function))
    })
  })

  describe('_parseResponse', () => {
    it('should call Sender#checkResponse and pass data', () => {
      mailClient.sender = senderMock
      let spyOnSender = jest.spyOn(mailClient.sender, 'checkResponse')
      let data = 5
      mailClient._parseResponse(data)
      expect(spyOnSender).toHaveBeenCalledWith('5')
    })
  })

  describe('receive', () => {
    it('should call _connect', () => {
      let connectSpy = jest.spyOn(mailClient, '_connect')
      mailClient.receive()
      expect(connectSpy).toHaveBeenCalled()
    })
    
  })
})
