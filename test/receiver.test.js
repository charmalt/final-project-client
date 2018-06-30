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

  describe('_handshake', () => {
    it('should call the first function of sender._functionOrder', () => {
      let connectionSpy = jest.spyOn(connection, 'write')
      receiver._handshake()
      expect(connectionSpy).toHaveBeenCalledWith('Hello')
    })
    it('should call connection.end if sender._functionOrder is empty', () => {
      let connectionSpy = jest.spyOn(connection, 'end')
      receiver._functionOrder = []
      receiver._handshake()
      expect(connectionSpy).toHaveBeenCalled()
    })

    it('should console log "Disconnected from POP Server" if connection terminated successfully', () => {
      let connectionSpy = jest.spyOn(connection, 'end')
      connectionSpy.mockReturnValueOnce(true)
      console.log = jest.fn()
      receiver._functionOrder = []
      receiver._handshake()
      expect(console.log).toHaveBeenCalledWith('Disconnected from POP Server')
    })
  })

  describe('handshake methods', () => {
    let connectionSpy = jest.spyOn(connection, 'write')
    describe('_helloMethod', () => {
      it('should write "Hello" to the connection', () => {
        receiver._helloMethod()
        expect(connectionSpy).toHaveBeenCalledWith('Hello')
      })
    })

    describe('_receiveMessage', () => {
      it('should write "MessageRequest" to the connection', () => {
        receiver._receiveMessage()
        expect(connectionSpy).toHaveBeenCalledWith('MessageRequest')
      })

      it('should change the _rcptMode to true', () => {
        receiver._receiveMessage()
        expect(receiver._rcptMode).toBeTruthy()
      })
    })

    describe('_quitMethod', () => {
      it('should write QUIT', () => {
        receiver._quitMethod()
        expect(connectionSpy).toHaveBeenCalledWith('QUIT')
      })
    })
  })

  describe('checkResponse', () => {
    it('calls _responseProcessor', () => {
      let response = 'anything'
      let expectedResponse = '250'
      let processorSpy = jest.spyOn(receiver, '_responseProcessor')
      receiver.checkResponse(response)
      expect(processorSpy).toHaveBeenCalledWith(response, expectedResponse)
    })

    it('should push response into message array in rcpt mode', () => {
      let response = 5
      receiver._rcptMode = true
      receiver.checkResponse(response)
      expect(receiver.messages).toContain(response.toString())
    })

    it('should change _rcptMode to false once the message has been received', () => {
      let response = 5
      receiver._rcptMode = true
      receiver.checkResponse(response)
      expect(receiver._rcptMode).toBeFalsy()
    })
  })

  describe('_responseProcessor', () => {
    it('should console.log the response received', () => {
      console.log = jest.fn()
      let actualResponse = 5
      let expectedResponse = '5'
      receiver._responseProcessor(actualResponse, expectedResponse)
      expect(console.log).toHaveBeenCalledWith('SERVER SAYS:\n' + actualResponse.toString())
    })

    it('should console.log error code on wrong response', function () {
      console.log = jest.fn()
      let actualResponse = 5
      let expectedResponse = '6'
      receiver._responseProcessor(actualResponse, expectedResponse)
      expect(console.log).toHaveBeenCalledWith('ERROR CODE: ' + actualResponse.toString() + ' received. Connection closed.')
    })

    it('should call connection.end if response differs from expected response', () => {
      let connectionSpy = jest.spyOn(connection, 'end')
      let actualResponse = 5
      let expectedResponse = '6'
      receiver._responseProcessor(actualResponse, expectedResponse)
      expect(connectionSpy).toHaveBeenCalled()
    })

    it('should remove the first member of sender._functionOrder', () => {
      let actualResponse = 5
      let expectedResponse = '5'
      let firstFunction = receiver._functionOrder[0]
      receiver._responseProcessor(actualResponse, expectedResponse)
      expect(receiver._functionOrder[0]).not.toEqual(firstFunction)
    })

    it('should call the _handshake method', () => {
      let actualResponse = 5
      let expectedResponse = '5'
      let handshakeSpy = jest.spyOn(receiver, '_handshake')
      handshakeSpy.mockClear()
      receiver._responseProcessor(actualResponse, expectedResponse)
      expect(handshakeSpy).toHaveBeenCalled()
    })
  })

})