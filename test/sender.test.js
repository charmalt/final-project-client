/* global it, describe, test, expect */

const Sender = require('../lib/sender')
jest.mock('net')

describe('Sender', function () {
  let Socket = require('net').Socket
  let message = {
    MAIL_FROM: 'john@john.com',
    RCPT_TO: 'igor@john.com',
    DATA: 'From: John\nTo: Igor\nSubject: SMTP Feature Testing\n\nHi, Igor.\nThis is a test message.\nAnd this is line 3.\n\nYours,\nJohn'
  }
  let connection = new Socket()
  let sender = new Sender(message, connection)

  let connectionSpy = jest.spyOn(connection, 'write')

  describe('send', () => {
    it('should call handshake', () => {
      let handshakeSpy = jest.spyOn(sender, '_handshake')
      sender.send()
      expect(handshakeSpy).toHaveBeenCalled()
    })
  })

  describe('_handshake', () => {
    xit('should call the first function of sender.functionOrder', () => {
      expect(sender._handshake).to
    })
  })

  describe('_ehloMethod', () => {
    it('should write EHLO to the socket', function () {
      sender._ehloMethod()
      expect(connectionSpy).toHaveBeenCalledWith('EHLO')
    })
  })

  describe('_mailFromMethod', () => {
    it("should write 'MAIL FROM:' plus the given email address", () => {
      sender._mailFromMethod()
      expect(connectionSpy).toHaveBeenCalledWith(`MAIL FROM: ${sender.message.MAIL_FROM}`)
    })
  })
})
