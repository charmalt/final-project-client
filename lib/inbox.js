class Inbox {
  constructor () {
    this.messages = []
  }

  addMessages (messages) {
    console.log('--------------------message', messages)

    try {
      let newMessages = JSON.parse(messages)
      let inbox = this
      newMessages.forEach((message) => {
        if (inbox.messages.filter(mess => mess.id === message.id).length === 0) {
          inbox.messages.push(message)
        }
      })
    } catch (e) {
      console.log('--------error', e.stack)
    }
  }

  getMessages () {
    return this.messages.slice(0)
  }
}

module.exports = Inbox
