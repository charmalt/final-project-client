const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3001

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

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
    mailbody: 'Am I a real boy?'
  }, {
    id: 3,
    mailto: 'beauty@ilikebooks.com',
    mailfrom: 'beast@findmesomebodytolove.com',
    mailbody: 'Join me for dinner tonight?'
  }])
})

app.post('/send', (req, res) => {
  console.log(req.body)
})

app.listen(port, () => console.log(`Listening on port ${port}`))
