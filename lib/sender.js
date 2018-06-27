class Sender {
  static send (message, connection) {
    connection.on('connect', () => { Sender._handshake(message, connection) })
  }
  static _handshake (message, connection) {
    Sender.ehloMethod(connection)
  }
  static ehloMethod (connection) {
    connection.write('EHLO')
    connection.on('data', function (response) {
      let receivedCode = response.toString()
      console.log(receivedCode)
      if (receivedCode !== '250') {
        connection.destroy()
        return false
      }
    })
  }
}

module.exports = Sender
