/* globals describe, it, expect, jest, beforeEach */
const MailClient = require('../lib/MailClient')
jest.mock('net')

describe('MailClient', () => {
  let Socket = require('net').Socket
  let spyNewConnection
  let spySocket
  let mailClient
  const PORT = 1337
  const HOST = '127.0.0.1'
  beforeEach(() => {
    mailClient = new MailClient()
    spyNewConnection = jest.spyOn(mailClient, 'newConnection')
  })

  it('should create a new socket on newConnection()', () => {
    mailClient.newConnection()
    expect(spyNewConnection).toHaveBeenCalled()
  })

  it('should connect to a server on connect()', () => {
    mailClient.newConnection()
    spySocket = jest.spyOn(mailClient.connection, 'connect')
    mailClient.connection.connect(PORT, HOST)
    expect(spySocket).toHaveBeenCalled()
  })

  it('sets mode to send', () => {
    mailClient.setMode('send')
    expect(mailClient.communicationMode).toEqual('send')
  })
})
