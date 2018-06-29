class Receiver {
  constructor (connection) {
    this.connection = connection
    this.messages = []
    this._functionOrder = [
      [this._helloMethod, '250'],
      [this._receiveMessage],
      [this._quitMethod, '331']
    ]
    this._rcptMode = false
  }

  receive () {
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
    console.log(response.toString())
    if (response.toString() !== expectedResponse) {
      this.connection.end()
    } else {
      this._functionOrder.splice(0, 1)
      this._handshake()
    }
  }



}

module.exports = Receiver