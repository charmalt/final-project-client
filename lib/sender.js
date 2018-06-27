class Sender {
  static send (message, connection) {
    connection.on('connect', () => { Sender._handshake(message, connection) })
  }
  static _handshake (message, connection) {
    if (!Sender.ehloMethod(connection)) {
      return
    }
    if (!Sender.mailToMethod(connection, message)) {
      return
    }
  }
  static ehloMethod (connection) {
    connection.write('EHLO')
    connection.on('data', (response, connection) => { Sender._responseProcessor(connection, response, '250') }
    )
  }

  static mailToMethod (connection, message) {
    connection.write('MAIL FROM: ' + message['MAIL_FROM'])
    connection.on('data', (response, connection) => { Sender._responseProcessor(connection, response, '250') }
    )
  }

  static _responseProcessor (connection, response, expectedResponse) {
    if (response.toString() !== expectedResponse) {
      connection.destroy()
      return false
    } else {
      return true
    }
  }
}

module.exports = Sender
