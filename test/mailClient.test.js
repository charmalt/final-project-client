/* globals describe, it, expect, jest, beforeEach */
const MailClient = require('../lib/MailClient')
jest.mock('net')
jest.mock('../lib/sender')

describe('MailClient', () => {
  let Socket = require('net').Socket
  let Sender = require('../lib/sender')
  let spyNewConnection
  let spySocket
  let mailClient
  const PORT = 1337
  const HOST = '127.0.0.1'
  beforeEach(() => {
    mailClient = new MailClient()
    spyNewConnection = jest.spyOn(mailClient, 'newConnection')
    Sender.send = () => {}
  })

  it('should create a new socket on newConnection()', () => {
    mailClient.newConnection()
    expect(spyNewConnection).toHaveBeenCalled()
  })

  it('should connect to a server on connect()', () => {
    mailClient.newConnection()
    spySocket = jest.spyOn(mailClient.connection, 'connect')
    mailClient.connect(PORT, HOST)
    expect(spySocket).toHaveBeenCalled()
  })

  it('sets sendMode to on', () => {
    mailClient.sendModeOn()
    expect(mailClient.sendMode).toBeTruthy()
  })

  it('sets sendMode to off', () => {
    mailClient.sendModeOff()
    expect(mailClient.sendMode).toBeFalsy()
  })

  it('sends the message if sendMode is on', () => {
    mailClient.newConnection()
    mailClient.sendModeOn()
    let Senderspy = jest.spyOn(Sender, 'send')
    mailClient.connect(PORT, HOST)
    expect(Senderspy).toHaveBeenCalledWith(mailClient.message, mailClient.connection.connect(PORT, HOST))
  })
})
