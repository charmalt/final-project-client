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
    DATA: 'Hi Igor'
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
})
