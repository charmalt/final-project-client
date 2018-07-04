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
})

app.get('/api/emails', (req, res) => {
  res.json([{})
})

app.post('/api/emails', (req, res) => {
})

app.listen(port, () => console.log(`Listening on port ${port}`))
