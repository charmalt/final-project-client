class Sender {
  static send (message, connection) {
    connection.on('connect', () => { Sender._handshake(message, connection) })
  }
  static _handshake (message, connection) {
    Sender.ehloMethod(connection)
  }
  static ehloMethod (connection) {
    connection.write('EHLO')
    connection.on('data',(response) => { Sender._responseProcessor(response, '250') }
    )
  }

  static _responseProcessor (response, expectedResponse) {
    console.log(response)
    if (response.toString() !== expectedResponse) {
      connection.destroy()
      return false
    }
  }
}

module.exports = Sender
