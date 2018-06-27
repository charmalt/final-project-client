class Sender {
  static send (message, connection) {
    connection.on('connect', Sender._handshake(message, connection))
  }
  static _handshake (message, connection) {
    connection.write('EHLO')
  }
}

module.exports = Sender