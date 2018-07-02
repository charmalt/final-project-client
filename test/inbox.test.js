const Inbox = require('../lib/inbox')

describe('Inbox', () => {
  let inbox
  const messagesString = '[{"id": 1, "mailfrom": "George", "mailto": "Charlene", "mailbody": "HI"},' +
    '{"id": 2, "mailfrom": "John", "mailto": "Igor", "mailbody": "BYE"}]'
  const messages = [{"id": 1, "mailfrom": "George", "mailto": "Charlene", "mailbody": "HI"},
    {"id": 2, "mailfrom": "John", "mailto": "Igor", "mailbody": "BYE"}]
  const moreMessagesString = '[{"id": 2, "mailfrom": "John", "mailto": "Igor", "mailbody": "BYE"},' +
    '{"id": 3, "mailfrom": "Tom", "mailto": "Will", "mailbody": "Cheerio "}]'
  const moreMessages = [{"id": 1, "mailfrom": "George", "mailto": "Charlene", "mailbody": "HI"},
    {"id": 2, "mailfrom": "John", "mailto": "Igor", "mailbody": "BYE"},
    {"id": 3, "mailfrom": "Tom", "mailto": "Will", "mailbody": "Cheerio "}]

  beforeEach(() => {
    inbox = new Inbox()
  })

  describe('addMessages', () => {
    it('adds messages to the inbox', () => {
      inbox.addMessages(messagesString)
      expect(inbox.messages).toEqual(messages)
    })

    it('does not duplicate messages', () => {
      inbox.addMessages(messagesString)
      inbox.addMessages(moreMessagesString)
      expect(inbox.messages).toEqual(moreMessages)
    })
  })
})
