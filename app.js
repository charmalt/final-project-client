const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3001
const MailClient = require('./lib/mailClient')

let smtpPort = 1337
let smtpHost = '127.0.0.1'
let popPort = 5001
let popHost = '127.0.0.1'

let mailClient = new MailClient(smtpPort, smtpHost, popPort, popHost)
mailClient.receive()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/api/emails', (req, res) => {
  mailClient.receive()
  res.json(mailClient.inbox.getMessages())
})

app.post('/api/messages', (req, res) => {
  mailClient.send(req.body)
})

app.listen(port, () => console.log(`Listening on port ${port}`))
