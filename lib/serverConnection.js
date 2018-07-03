const Socket = require('net').Socket

class ServerConnection {
  constructor (port, host, user, HandshakeFactory) {
    this.port = port
    this.host = host
    this.user = user
    this.HandshakeFactory = HandshakeFactory
  }

  connectAndHandshake (handshakeArgument) {
    this.connection = new Socket()
    this._configureConnection()
    this.connection.connect({ port: this.port, host: this.host }, () => {
      console.log('Connected to server')
    })
    this._manageConnection()
    this._performHandshake(handshakeArgument)
  }

  parseResponse (data) {
    this.handshake.checkResponse(data.toString())
  }

  _createHandshake (handshakeArgument) {
    return this.HandshakeFactory.build(this.connection, handshakeArgument, this.user)
  }

  _performHandshake (handshakeArgument) {
    this.handshake = this._createHandshake(handshakeArgument)
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
  static build (port, host, user, handshake) {
    return new ServerConnection(port, host, user, handshake)
  }
}

module.exports.ServerConnectionFactory = ServerConnectionFactory
