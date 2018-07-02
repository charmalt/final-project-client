const Socket = require('net').Socket

class ServerConnection {
  constructor (port, host, HandshakeFactory) {
    this.port = port
    this.host = host
    this.HandshakeFactory = HandshakeFactory
  }

  connectAndHandshake (message) {
    this.connection = new Socket()
    this._configureConnection()
    this.connection.connect({ port: this.port, host: this.host }, () => {
      console.log('Connected to server')
    })
    this._manageConnection()
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
    this.handshake.initiateHandshake()
  }

  _configureConnection () {
    this.connection.setEncoding('utf-8')
    this.connection.setNoDelay(true)
  }

  _manageConnection () {
    this.connection.on('data', (data) => { this.parseResponse(data) })
  }
}

module.exports.ServerConnection = ServerConnection

class ServerConnectionFactory {
  static build (port, host, handshake) {
    return new ServerConnection(port, host, handshake)
  }
}

module.exports.ServerConnectionFactory = ServerConnectionFactory
