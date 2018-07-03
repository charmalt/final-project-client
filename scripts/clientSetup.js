const MailClient = require('../lib/mailClient')
const env = process.env.NODE_ENV || 'development'
const Env = require('../config')[env]

module.exports = (() => {
  let mailClient = new MailClient(Env.smtpPort, Env.smtpHost, Env.popPort, Env.popHost)
  mailClient.receive()
  return mailClient
})()
