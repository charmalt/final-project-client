/* global it, describe, test, expect */

const Sender = require('../lib/sender')
const sinon = require('sinon')

describe('Sender', function () {
  let connectionMock = {
    on: jest.fn(),
    write: jest.fn(),
    destroy: jest.fn()
  }
  let message = {
    MAIL_FROM: 'john@john.com',
    RCPT_TO: 'igor@john.com',
    DATA: 'Hi Igor.\n' +
    'This is a test message\n' +
    'Have fun testing me, you MOFA!\n'
  }
  describe('send method', function () {
    it('should call connection.on ', function () {
      Sender.send(message, connectionMock)
      expect(connectionMock.on).toHaveBeenCalledWith('connect', expect.any(Function))
    })
    xit('should call Sender._handshake', function () {
      let handshakeSpy = jest.spyOn(Sender, '_handshake')
      Sender.send(message, connectionMock)
      expect(handshakeSpy).toHaveBeenCalled()
    })
  })
  describe('_handshake', function () {
    it('should call ehlo method', function () {
      let ehloSpy = jest.spyOn(Sender, 'ehloMethod')
      Sender._handshake(message, connectionMock)
      expect(ehloSpy).toHaveBeenCalled()
    })
  })

  describe('ehloMethod', function () {
    it('call connection.write', function () {
      Sender.ehloMethod(connectionMock)
      expect(connectionMock.write).toHaveBeenCalledWith('EHLO')
    })

    it('call connection.on', function () {
      Sender.ehloMethod(connectionMock)
      expect(connectionMock.on).toHaveBeenCalledWith('data', expect.any(Function) )
    })
  })
  describe('_responseProcessor', function () {
    it('should return false if the code is not what is expected', function () {
      expect(Sender._responseProcessor(connectionMock, 250, '260')).toBeFalsy()
    })
    it('should return true if the code is what is expected', function () {
      expect(Sender._responseProcessor(connectionMock, 250, '250')).toBeTruthy()
    })
  })
  describe('mailFromMethod', function () {
    it('call connection.write', function () {
      Sender.mailFromMethod(connectionMock, message)
      expect(connectionMock.write).toHaveBeenCalledWith('MAIL FROM: john@john.com')
    })

    it('call connection.on', function () {
      Sender.mailFromMethod(connectionMock, message)
      expect(connectionMock.on).toHaveBeenCalledWith('data', expect.any(Function) )
    })
  })

  describe('rcptToMethod', function () {
    it('call connection.write', function () {
      Sender.rcptToMethod(connectionMock, message)
      expect(connectionMock.write).toHaveBeenCalledWith('RCPT TO: igor@john.com')
    })

    it('call connection.on', function () {
      Sender.rcptToMethod(connectionMock, message)
      expect(connectionMock.on).toHaveBeenCalledWith('data', expect.any(Function) )
    })
  })

  describe('dataMethod', function () {
    it('call connection.write', function () {
      Sender.dataMethod(connectionMock)
      expect(connectionMock.write).toHaveBeenCalledWith('DATA')
    })

    it('call connection.on', function () {
      Sender.dataMethod(connectionMock)
      expect(connectionMock.on).toHaveBeenCalledWith('data', expect.any(Function) )
    })
  })
})
