class Receiver {
  constructor (connection) {
    this.connection = connection
    this.messages = []
    this._functionOrder = [
      [this._helloMethod, '250'],
      [this._receiveMessage, '250']
    ]
  }

  receive () {
    this._handshake()
  }

  checkResponse (response) {
    this._responseProcessor(response, this._functionOrder[0][1])
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

  _responseProcessor (response, expectedResponse) {
    console.log(response.toString())
    if (response.toString() !== expectedResponse) {
      this.connection.end()
    } else {
      this._functionOrder.splice(0, 1)
      this._handshake()
    }
  }

  _receiveMessage () {
    this.connection.write('Please Send Message(s)')
  }

}

module.exports = Receiver