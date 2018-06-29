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

  describe('handshake methods', () => {
    let connectionSpy = jest.spyOn(connection, 'write')
    describe('_helloMethod', () => {
      it('should write "Hello" to the connection', function () {
        receiver._helloMethod()
        expect(connectionSpy).toHaveBeenCalledWith('Hello')
      })
    })

    describe('_receiveMessage', () => [
      it('should write "Please Send Message(s)" to the connection', function () {
        receiver._receiveMessage()
        expect(connectionSpy).toHaveBeenCalledWith('Please Send Message(s)')
      })
    ])
  })

  describe('checkResponse', () => {
    it('calls _responseProcessor', () => {
      let response = 'anything'
      let expectedResponse = '250'
      let processorSpy = jest.spyOn(receiver, '_responseProcessor')
      receiver.checkResponse(response)
      expect(processorSpy).toHaveBeenCalledWith(response, expectedResponse)
    })
  })

  describe('_responseProcessor', () => {
    it('should console.log the response received', function () {
      console.log = jest.fn()
      let actualResponse = 5
      let expectedResponse = '5'
      receiver._responseProcessor(actualResponse, expectedResponse)
      expect(console.log).toHaveBeenCalledWith(actualResponse.toString())
    })

    it('should call connection.end if response differs from expected response', function () {
      let connectionSpy = jest.spyOn(connection, 'end')
      let actualResponse = 5
      let expectedResponse = '6'
      receiver._responseProcessor(actualResponse, expectedResponse)
      expect(connectionSpy).toHaveBeenCalled()
    })

    it('should remove the first member of sender._functionOrder', function () {
      let actualResponse = 5
      let expectedResponse = '5'
      let firstFunction = receiver._functionOrder[0]
      receiver._responseProcessor(actualResponse, expectedResponse)
      expect(receiver._functionOrder[0]).not.toEqual(firstFunction)
    })

    it('should call the _handshake method', function () {
      let actualResponse = 5
      let expectedResponse = '5'
      let handshakeSpy = jest.spyOn(receiver, '_handshake')
      handshakeSpy.mockClear()
      receiver._responseProcessor(actualResponse, expectedResponse)
      expect(handshakeSpy).toHaveBeenCalled()
    })
  })

})