class Inbox {
  constructor () {
    this.messages = []
  }

  addMessages (messages) {
    try {
      let newMessages = JSON.parse(messages)
      let inbox = this
      newMessages.forEach((message) => {
        if (inbox.messages.filter(mess => mess.id === message.id).length === 0) {
          inbox.messages.push(message)
        }
      })
    } catch (err) {
      console.log(err.stack)
    }
  }

  getMessages () {
    return this.messages.slice(0)
  }
}

module.exports = Inbox
