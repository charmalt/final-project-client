const Sender = require('../lib/sender')

describe('Sender', function () {
  let connectionMock = {
    on: jest.fn()
  }
  let message = message = {
    MAIL_FROM: 'john@john.com',
    RCPT_TO: 'igor@john.com',
    DATA: 'Hi Igor'
  }
  describe('send method', function () {
    it('should call ', function () {
      Sender.send('message', connectionMock)
      expect(connectionMock.on).toHaveBeenCalledWith('connect', Sender._handshake('message'))
    })
  })
  describe('_handshake', function () {
    it('should ', function () {
      
    })
  })

})