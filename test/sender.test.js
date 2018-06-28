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
  let sender
  beforeEach(() => {
    sender = new Sender(message, connection)
  })

  describe('send', () => {
    it('should call handshake', () => {
      let handshakeSpy = jest.spyOn(sender, '_handshake')
      sender.send()
      expect(handshakeSpy).toHaveBeenCalled()
    })
  })

  describe('_handshake', () => {
    it('should call the first function of sender._functionOrder', () => {
      let connectionSpy = jest.spyOn(connection, 'write')
      sender._handshake()
      expect(connectionSpy).toHaveBeenCalledWith('EHLO')
    })
    it('should call connection.destroy if sender._functionOrder is empty', function () {
      let connectionSpy = jest.spyOn(connection, 'end')
      sender._functionOrder = []
      sender._handshake()
      expect(connectionSpy).toHaveBeenCalled()
    })
  })

  describe('Handshake methods', () => {
    let connectionSpy = jest.spyOn(connection, 'write')

    describe('_ehloMethod', () => {
      it('should write EHLO to the socket', function () {
        sender._ehloMethod()
        expect(connectionSpy).toHaveBeenCalledWith('EHLO')
      })
    })

    describe('_mailFromMethod', () => {
      it("should write 'MAIL FROM: ' plus the given email address", () => {
        sender._mailFromMethod()
        expect(connectionSpy).toHaveBeenCalledWith(`MAIL FROM: ${sender.message.MAIL_FROM}`)
      })
    })

    describe('_rcptToMethod', () => {
      it("should write 'RCPT TO: ' plus the given email address", () => {
        sender._rcptToMethod()
        expect(connectionSpy).toHaveBeenCalledWith(`RCPT TO: ${sender.message.RCPT_TO}`)
      })
    })

    describe('_dataMethod', () => {
      it('should write DATA', () => {
        sender._dataMethod()
        expect(connectionSpy).toHaveBeenCalledWith('DATA')
      })
    })

    describe('_transmissionMethod', () => {
      beforeEach(() => {
        connectionSpy.mockClear()
      })

      it('create an array of message DATA', () => {
        sender._transmissionMethod()
        expect(connectionSpy).toHaveBeenNthCalledWith(1, 'From: John\n')
        expect(connectionSpy).toHaveBeenNthCalledWith(10, 'John\n')
      })

      it('transmits the termination dot', () => {
        sender._transmissionMethod()
        expect(connectionSpy).toHaveBeenCalledWith('\r\n.\r\n')
      })
    })

    describe('_quitMethod', () => {
      it('should write QUIT', function () {
        sender._quitMethod()
        expect(connectionSpy).toHaveBeenCalledWith('QUIT')
      })
    })
  })

  describe('_responseProcessor', () => {
    it('should console.log the response received', function () {
      console.log = jest.fn()
      let actualResponse = 5
      let expectedResponse = '5'
      sender._responseProcessor(actualResponse, expectedResponse)
      expect(console.log).toHaveBeenCalledWith(actualResponse.toString())
    })

    it('should call connection.end if response differs from expected response', function () {
      let connectionSpy = jest.spyOn(connection, 'end')
      let actualResponse = 5
      let expectedResponse = '6'
      sender._responseProcessor(actualResponse, expectedResponse)
      expect(connectionSpy).toHaveBeenCalled()
    })

    it('should remove the first member of sender._functionOrder', function () {
      let actualResponse = 5
      let expectedResponse = '5'
      let firstFunction = sender._functionOrder[0]
      sender._responseProcessor(actualResponse, expectedResponse)
      expect(sender._functionOrder[0]).not.toEqual(firstFunction)
    })

    it('should call the _handshake method', function () {
      let actualResponse = 5
      let expectedResponse = '5'
      let handshakeSpy = jest.spyOn(sender, '_handshake')
      handshakeSpy.mockClear()
      sender._responseProcessor(actualResponse, expectedResponse)
      expect(handshakeSpy).toHaveBeenCalled()
    })
  })
})
