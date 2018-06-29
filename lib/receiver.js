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

}

module.exports = Receiver