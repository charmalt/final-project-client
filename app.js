require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3001
const MailClient = require('./lib/mailClient')
const env = process.env.NODE_ENV || 'development'
const Env = require('./config')[env]

let mailClient

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.post('/login', (req, res) => {
  let user = req.body.sessionUser
  mailClient = new MailClient(Env.smtpPort, Env.smtpHost, Env.popPort, Env.popHost, user)
})

app.get('/api/emails', (req, res) => {
  mailClient.receive()
  res.json(mailClient.inbox.getMessages())
})

app.post('/api/emails', (req, res) => {
  mailClient.send(req.body)
})

app.listen(port, () => console.log(`Listening on port ${port}`))
