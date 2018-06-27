class Sender {
  constructor (message, connection) {
    this.methodOrder = [
      [this.ehloMethod, '250'],
      [this.mailFromMethod, '250'],
      [this.rcptToMethod, '250'],
      [this.dataMethod, '354'],
      [this.transmissionMethod, '250'],
      [this.quitMethod, '221']
    ]
    this.connection = connection
    this.message = message
  }

  send () {
    this.handshake()
  }

  handshake () {
    if (this.methodOrder[0] !== undefined) {
      let method = this.methodOrder[0][0]
      method.call(this)
    }

  }

  checkResponse (response) {
    this.responseProcessor(response, this.methodOrder[0][1])
  }

  ehloMethod () {
    console.log(this)
    this.connection.write('EHLO')
  }

  mailFromMethod () {
    this.connection.write('MAIL FROM: ' + this.message['MAIL_FROM'])
  }

  rcptToMethod () {
    this.connection.write('RCPT TO: ' + this.message['RCPT_TO'])
  }

  dataMethod () {
    this.connection.write('DATA')
  }

  transmissionMethod () {
    var self = this
    let arrayOfLines = this.message['DATA'].split('\n')
    arrayOfLines.forEach(function (line) {
      self.connection.write(line)
    })
    this.connection.write('\r\n.\r\n')
  }

  quitMethod () {
    this.connection.write('QUIT')
  }

  responseProcessor (response, expectedResponse) {
    console.log(response.toString())
    if (response.toString() !== expectedResponse) {
      this.connection.end()
    } else {
      this.methodOrder.splice(0, 1)
      this.handshake()
    }
  }
}

module.exports = Sender