class Sender {
  constructor (message, connection) {
    this.functionOrder = [
      [this._ehloMethod, '250'],
      [this._mailFromMethod, '250'],
      [this._rcptToMethod, '250'],
      [this._dataMethod, '354'],
      [this._transmissionMethod, '250'],
      [this._quitMethod, '221']
    ]
    this.connection = connection
    this.message = message
  }
  send () {
    this._handshake()
  }
  _handshake () {

  }

  _ehloMethod() {
    this.connection.write('EHLO')
  }
}

module.exports = Sender
