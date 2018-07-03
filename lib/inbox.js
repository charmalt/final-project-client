class Inbox {
  constructor () {
    this.messages = []
  }

  addMessages (messages) {
    let newMessages = JSON.parse(messages)
    let inbox = this
    newMessages.forEach((message) => {
      if (inbox.messages.filter(mess => mess.id === message.id).length === 0) {
        inbox.messages.push(message)
      }
    })
  }

  getMessages () {
    return this.messages.slice(0)
  }
}

module.exports = Inbox
