const Socket = require('net').Socket

class Connection {
  constructor (port, host) {
    this.port = port
    this.host = host
  }

  connect () {
    this.connection = new Socket()
    this.connection.setEncoding('utf-8')
    this.connection.setNoDelay(true)
    this.connection.connect({ port: this.port, host: this.host }, expect.any(Function))
  }
}

module.exports.Connection = Connection

class ConnectionFactory {
  static build (port, host) {
    return new Connection(port, host)
  }
}

module.exports.ConnectionFactory = ConnectionFactory
