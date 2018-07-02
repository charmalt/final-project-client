class ReceiverHandshake {
  constructor (connection, inbox) {
    this.connection = connection
    this.messages = inbox
    this._functionOrder = [
      [this._helloMethod, '250'],
      [this._receiveMessage],
      [this._quitMethod, '331']
    ]
    this._rcptMode = false
  }

  initiateHandshake () {
    this._handshake()
  }

  checkResponse (response) {
    if (this._rcptMode === true) {
      this.messages.push(response.toString())
      this._rcptMode = false
      this._responseProcessor(response, response)
    } else {
      this._responseProcessor(response, this._functionOrder[0][1])
    }
  }

  _handshake () {
    if (this._functionOrder[0] !== undefined) {
      let theFunction = this._functionOrder[0][0]
      theFunction.call(this)
    } else {
      if (this.connection.end()) console.log('Disconnected from POP Server')
    }
  }

  _helloMethod () {
    this.connection.write('Hello')
  }

  _receiveMessage () {
    this.connection.write('MessageRequest')
    this._rcptMode = true
  }

  _quitMethod () {
    this.connection.write('QUIT')
  }

  _responseProcessor (response, expectedResponse) {
    if (response.toString() !== expectedResponse) {
      this.connection.end()
      console.log('ERROR CODE: ' + response + ' received. Connection closed.')
    } else {
      console.log('SERVER SAYS:\n' + response.toString())
      this._functionOrder.splice(0, 1)
      this._handshake()
    }
  }
}

module.exports.ReceiverHandshake = ReceiverHandshake

class ReceiverHandshakeFactory {
  static build (connection, inbox) {
    return new ReceiverHandshake(connection, inbox)
  }
}

module.exports.ReceiverHandshakeFactory = ReceiverHandshakeFactory
