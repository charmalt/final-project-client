const Sender = require('../lib/sender')

describe('Sender', function () {
  let connectionMock = {
    on: jest.fn()
  }
  let message = {
    MAIL_FROM: 'john@john.com',
    RCPT_TO: 'igor@john.com',
    DATA: 'Hi Igor'
  }
  describe('send method', function () {
    it('should call ', function () {
      Sender.send(message, connectionMock)
      expect(connectionMock.on).toHaveBeenCalledWith('connect', expect.any(Function))
    })
  })
  describe('_handshake', function () {
    it('should call .write method', function () {

    })
  })

})
