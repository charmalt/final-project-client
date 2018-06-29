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

  _handshake () {

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

}

module.exports = Receiver