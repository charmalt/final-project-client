class Sender {
  constructor (message, connection) {
    this._functionOrder = [
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

  _ehloMethod () {
    this.connection.write('EHLO')
  }

  _mailFromMethod () {
    this.connection.write(`MAIL FROM: ${this.message['MAIL_FROM']}`)
  }

  _rcptToMethod () {
    this.connection.write(`RCPT TO: ${this.message['RCPT_TO']}`)
  }

  _dataMethod () {
    this.connection.write('DATA')
  }

  _transmissionMethod () {
    let self = this
    let arrayOfLines = this.message['DATA'].split('\n')
    arrayOfLines.forEach((line) => {
      self.connection.write(`${line}\n`)
    })
    this.connection.write('\r\n.\r\n')
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

module.exports = Sender
