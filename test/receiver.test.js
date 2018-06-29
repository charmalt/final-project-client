/* global it, describe, test, expect */

const Receiver = require('../lib/receiver')
jest.mock('net')

describe('Receiver', () => {
  let Socket = require('net').Socket
  let messageJSON = {
    "messageObject": {
      "mailFrom": "john@john.com",
      "rcptTo": "igor@john.com",
      "messageBody": "Hi, Igor\n"
    }
  }
  let connection = new Socket()
  let receiver
  beforeEach(() => {
    receiver = new Receiver(connection)
  })
  describe('receive method', () => {
    it('calls _handshake', () => {
      let handshakeSpy = jest.spyOn(receiver, '_handshake')
      receiver.receive()
      expect(handshakeSpy).toHaveBeenCalled()
    })
  })

  describe('_helloMethod', () => {
    let connectionSpy = jest.spyOn(connection, 'write')
    it('should write "Hello" to the connection', function () {
      receiver._helloMethod()
      expect(connectionSpy).toHaveBeenCalledWith('Hello')
    })
  })

})