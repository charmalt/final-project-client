/* globals describe, it, expect, jest, beforeEach */
const MailClient = require('../lib/MailClient')
jest.mock('net')

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

  describe('connect', () => {
    it('should be responsive', () => {
      expect(mailClient.connect).not.toEqual(undefined)
    })
    it('should assign a new socket to the connection property', () => {
      mailClient.connect()
      expect(mailClient.connection).toBeInstanceOf(socketMock)
    })
  })
})
