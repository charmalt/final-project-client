const express = require('express')

const app = express()
const port = process.env.PORT || 3001

app.get('/api/emails', (req, res) => {
  res.json([{
    id: 1,
    mailto: 'wendy@darling.com',
    mailfrom: 'peter@pan.com',
    mailbody: 'Join me and Micheal in Neverland'
  }, {
    id: 2,
    mailto: 'igor@igor.com',
    mailfrom: 'pino@chio.com',
    mailbody: 'I\'m a real boy'
  }, {
    id: 3,
    mailto: 'beauty@ilikebooks.com',
    mailfrom: 'beast@findmesomebodytolove.com',
    mailbody: 'Join me for dinner tonight?'
  }])
})

app.listen(port, () => console.log(`Listening on port ${port}`))
