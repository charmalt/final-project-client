class ReceiverHandshake {
  constructor (connection, inbox, user) {
    this.connection = connection
    this.messages = inbox
    this._functionOrder = [
      [this._helloMethod, '250'],
      [this._userMethod, '250'],
      [this._receiveMessage],
      [this._quitMethod, '331']
    ]
    this._rcptMode = false
    this.user = user
  }

  initiateHandshake () {
    this._handshake()
  }

  checkResponse (response) {
    if (this._rcptMode === true) {
      this.messages.addMessages(response.toString())
      this._rcptMode = false
      this._responseProcessor(response, response)
    } else {
      if (this._functionOrder[0] !== undefined) this._responseProcessor(response, this._functionOrder[0][1])
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
    this._reply('HELLO')
  }

  _userMethod () {
    this._reply(`USER ${this.user}`)
  }

  _receiveMessage () {
    this._reply('MessageRequest')
    this._rcptMode = true
  }

  _quitMethod () {
    this._reply('QUIT')
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

  _reply (message) {
    console.log(this.connection._writableState.ended)
    if (!this.connection._writableState.ended) this.connection.write(message)
  }
}

module.exports.ReceiverHandshake = ReceiverHandshake

class ReceiverHandshakeFactory {
  static build (connection, inbox, user) {
    return new ReceiverHandshake(connection, inbox, user)
  }
}

module.exports.ReceiverHandshakeFactory = ReceiverHandshakeFactory
