class Inbox {
  constructor () {
    this.messages = []
  }

  addMessages (messages) {
    this.messages = JSON.parse(messages)
  }
}

module.exports = Inbox
