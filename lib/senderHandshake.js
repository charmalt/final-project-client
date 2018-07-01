class SenderHandshake {
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

  checkResponse (response) {
    this._responseProcessor(response, this._functionOrder[0][1])
  }

  _handshake () {
    if (this._functionOrder[0] !== undefined) {
      let theFunction = this._functionOrder[0][0]
      theFunction.call(this)
    } else {
      if (this.connection.end()) console.log('Disconnected from SMTP Server')
    }
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

module.exports.SenderHandshake = SenderHandshake

class SenderHandshakeFactory {
  static build (message, connection) {
    return new SenderHandshake(message, connection)
  }
}

module.exports.SenderHandshakeFactory = SenderHandshakeFactory
