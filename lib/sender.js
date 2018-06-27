class Sender {
  static send (message, connection) {
    connection.on('connect', () => { Sender._handshake(message, connection) })
  }
  static async _handshake (message, connection) {
    if (await Sender.ehloMethod(connection) === false) {
      console.log('Hi')
      return
    } else {
      if (await Sender.mailFromMethod(connection, message) === false) {
        return
    }
    } else {

    }
    if (await Sender.rcptToMethod(connection, message) === false) {
      return
    }
    if (await Sender.dataMethod(connection) === false) {
      return
    } else if (await Sender.dataMethod(connection, message) === true) {
      if (await Sender.transmissionMethod(connection, message) === false) {
        return
      }
    }
    if (await Sender.quitMethod(connection) === false) {
      return
    }
    connection.end()
  }
  static ehloMethod (connection) {
    connection.write('EHLO')
    connection.on('data', (response, connection) => { Sender._responseProcessor(connection, response, '250') }
    )
  }

  static mailFromMethod (connection, message) {
    connection.write('MAIL FROM: ' + message['MAIL_FROM'])
    connection.on('data', (response, connection) => { Sender._responseProcessor(connection, response, '250') }
    )
  }

  static rcptToMethod (connection, message) {
    connection.write('RCPT TO: ' + message['RCPT_TO'])
    connection.on('data', (response, connection) => { Sender._responseProcessor(connection, response, '250') }
    )
  }

  static dataMethod (connection) {
    connection.write('DATA')
    connection.on('data', (response, connection) => { Sender._responseProcessor(connection, response, '354') }
    )
  }

  static transmissionMethod (connection, message) {
    let arrayOfLines = message['DATA'].splice('\n')
    arrayOfLines.forEach(function (line) {
      connection.write(line)
    })
    connection.write('\r\n.\r\n')
    connection.on('data', (response, connection) => { Sender._responseProcessor(connection, response, '250') })
  }

  static quitMethod (connection) {
    connection.write('QUIT')
    connection.on('data', (response, connection) => { Sender._responseProcessor(connection, response, '221') }
    )
  }


  static _responseProcessor (connection, response, expectedResponse) {
    console.log(response.toString())
    if (response.toString() !== expectedResponse) {
      connection.end()
      return false
    } else {
      return true
    }
  }
}

module.exports = Sender
