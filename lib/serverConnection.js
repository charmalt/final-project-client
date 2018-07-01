const Socket = require('net').Socket

class ServerConnection {
  constructor (port, host) {
    this.port = port
    this.host = host
  }

  connect () {
    this.connection = new Socket()
    this.connection.setEncoding('utf-8')
    this.connection.setNoDelay(true)
    this.connection.connect({ port: this.port, host: this.host }, expect.any(Function))
    this.connection.on('data', (data) => { this._parseResponse(data) })
  }
}

module.exports.ServerConnection = ServerConnection

class ServerConnectionFactory {
  static build (port, host) {
    return new ServerConnection(port, host)
  }
}

module.exports.ServerConnectionFactory = ServerConnectionFactory
