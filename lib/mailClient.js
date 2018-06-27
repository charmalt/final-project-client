const Sender = require('../lib/Sender')
const Socket = require('net').Socket
class MailClient {
  constructor (port, host) {
    this.connection = null
    this.message = {
      MAIL_FROM: 'john@john.com',
      RCPT_TO: 'igor@john.com',
      DATA: 'Hi Igor.\n' +
      'This is a test message.\n' +
      'And so this is line 3.'
    }
    this.sender = null
    this.port = port
    this.host = host
  }

  connect () {
    this.connection = new Socket()
    this.connection.setEncoding('utf-8')
    this.connection.connect({ port: this.port, host: this.host }, () => {
      console.log('connected')
    })
    this.connection.on('data', (data) => {
      this.parseResponse(data)
    })
  }

  send () {
    this.connect()
    this.sender = new Sender(this.message, this.connection)
    console.log(this.sender)
    this.sender.send()
  }

  parseResponse (data) {
    this.sender.checkResponse(data.toString())
  }
}

module.exports = MailClient