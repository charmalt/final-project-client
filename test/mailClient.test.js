/* globals describe, it, expect, jest, beforeEach */
const MailClient = require('../lib/MailClient')
jest.mock('net')
jest.mock('../lib/sender')
jest.mock('../lib/receiver')

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
  let ReceiverMock = require('../lib/receiver')

  SenderMock.mockImplementation(() => {
    return senderMock
  })

  ReceiverMock.mockImplementation(() => {
    return receiverMock
  })

  let senderMock = {
    checkResponse: jest.fn(),
    send: jest.fn()
  }

  let receiverMock = {
    checkResponse: jest.fn(),
    receive: jest.fn()
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

    it('should set connectionModeOperator to sender', () => {
      mailClient.send()
      expect(mailClient.connectionModeOperator).toEqual(mailClient.sender)
    })

    it('should call send on sender', () => {
      mailClient.send()
      let senderSpy = jest.spyOn(senderMock, 'send')
      expect(senderSpy).toHaveBeenCalled()
    })
  })

  describe('receive', () => {
    it('should call _connect', () => {
      let connectSpy = jest.spyOn(mailClient, '_connect')
      mailClient.receive()
      expect(connectSpy).toHaveBeenCalled()
    })
    it('should create new receiver object', () => {
      mailClient.receive()
      expect(mailClient.receiver).toBe(receiverMock)
    })

    it('should set connectionModeOperator to receiver', () => {
      mailClient.receive()
      expect(mailClient.connectionModeOperator).toEqual(mailClient.receiver)
    })

    it('should call receive on receiver', () => {
      mailClient.receive()
      let receiverSpy = jest.spyOn(receiverMock, 'receive')
      expect(receiverSpy).toHaveBeenCalled()
    })
  })
})
