/* global it, describe, test, expect */
const ReceiverHandshakeFactory = require('../lib/receiverHandshake').ReceiverHandshakeFactory

describe('Receiver', () => {
  let receiver, failedReceiver
  let inbox = { addMessages: jest.fn() }
  let inboxSpy, connectionSpy, endedSpy
  const userName = 'user@user.com'
  let mockWritablestateEnded = { ended: true }
  let mockWritablestateNotEnded = { ended: false }
  let goodConnection = { end: jest.fn(), write: jest.fn(), _writableState: mockWritablestateNotEnded }
  let badConnection = { end: jest.fn(), write: jest.fn(), _writableState: mockWritablestateEnded }

  beforeEach(() => {
    receiver = ReceiverHandshakeFactory.build(goodConnection, inbox, userName)
    failedReceiver = ReceiverHandshakeFactory.build(badConnection, inbox, userName)
  })

  describe('failed connection', () => {
    it('shouldnt write if the connection has ended', () => {
      let connectionSpy = jest.spyOn(badConnection, 'write')
      failedReceiver._handshake()
      expect(connectionSpy).not.toHaveBeenCalled()
    })
  })

  describe('initiateHandshake', () => {
    it('calls _handshake', () => {
      let handshakeSpy = jest.spyOn(receiver, '_handshake')
      receiver.initiateHandshake()
      expect(handshakeSpy).toHaveBeenCalled()
    })
  })

  describe('_handshake', () => {
    it('should call the first function of sender._functionOrder', () => {
      let connectionSpy = jest.spyOn(goodConnection, 'write')
      receiver._handshake()
      expect(connectionSpy).toHaveBeenCalledWith('HELLO')
    })

    it('should call connection.end if sender._functionOrder is empty', () => {
      let connectionSpy = jest.spyOn(goodConnection, 'end')
      receiver._functionOrder = []
      receiver._handshake()
      expect(connectionSpy).toHaveBeenCalled()
    })

    it('should console log "Disconnected from POP Server" if connection terminated successfully', () => {
      let connectionSpy = jest.spyOn(goodConnection, 'end')
      connectionSpy.mockReturnValueOnce(true)
      console.log = jest.fn()
      receiver._functionOrder = []
      receiver._handshake()
      expect(console.log).toHaveBeenCalledWith('Disconnected from POP Server')
    })
  })

  describe('handshake methods', () => {
    let connectionSpy = jest.spyOn(goodConnection, 'write')

    beforeEach(() => {
      connectionSpy.mockClear()
    })

    describe('_helloMethod', () => {
      it('should write "Hello" to the connection', () => {
        receiver._helloMethod()
        expect(connectionSpy).toHaveBeenCalledWith('HELLO')
      })
    })

    describe('userMethod', () => {
      it('should write USER and an email address to the connection', () => {
        receiver._userMethod()
        expect(connectionSpy).toHaveBeenCalledWith(`USER ${userName}`)
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
      inboxSpy = jest.spyOn(inbox, 'addMessages')
      receiver._rcptMode = true
      receiver.checkResponse(response)
      expect(inboxSpy).toHaveBeenCalledWith(response.toString())
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
      let connectionSpy = jest.spyOn(goodConnection, 'end')
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
