const Socket = require('net').Socket

class ServerConnection {
  constructor (port, host, HandshakeFactory) {
    this.port = port
    this.host = host
    this.HandshakeFactory = HandshakeFactory
  }

  connect (message) {
    this.connection = new Socket()
    this.connection.setEncoding('utf-8')
    this.connection.setNoDelay(true)
    this.connection.connect({ port: this.port, host: this.host }, () => {
      console.log('Connected to server')
    })
    this.connection.on('data', (data) => { this.parseResponse(data) })
    this._performHandshake(message)
  }

  parseResponse (data) {
    this.handshake.checkResponse(data.toString())
  }

  _createHandshake (message) {
    return this.HandshakeFactory.build(this.connection, message)
  }

  _performHandshake (message) {
    this.handshake = this._createHandshake(message)
  }
}

module.exports.ServerConnection = ServerConnection

class ServerConnectionFactory {
  static build (port, host, handshake) {
    return new ServerConnection(port, host, handshake)
  }
}

module.exports.ServerConnectionFactory = ServerConnectionFactory
