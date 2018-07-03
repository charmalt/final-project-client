const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3001

const mailClient = require('./scripts/clientSetup')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/api/emails', (req, res) => {
  mailClient.receive()
  res.json(mailClient.inbox.getMessages())
})

app.post('/api/emails', (req, res) => {
  mailClient.send(req.body)
})

app.post('/login', (req, res) => {
  console.log(req.body)
})

app.listen(port, () => console.log(`Listening on port ${port}`))
