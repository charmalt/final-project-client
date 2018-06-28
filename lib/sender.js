class Sender {
  constructor (message, connection) {
    this.methodOrder = [
      [this.ehloMethod, '250'],
      [this.mailFromMethod, '250'],
      [this.rcptToMethod, '250'],
      [this.dataMethod, '354'],
      [this.transmissionMethod, '250'],
      [this.quitMethod, '221']
    ]
    this.connection = connection
    this.message = message
  }
}

module.exports = Sender
