/* globals describe, it, expect, jest, beforeEach */
const MailClient = require('../lib/MailClient')
jest.mock('net')

describe('MailClient', () => {
  let mailClient
  let clientPort = 1337
  let clientHost = '127.0.0.1'

  beforeEach(() => {
    mailClient = new MailClient(clientPort, clientHost)
  })

  it('has a connection property that is set to null', () => {
    expect(mailClient.connection).toEqual(null)
  })

  it('has a port property', () => {
    expect(mailClient.port).toEqual(clientPort)
  })

  it('has a host property', () => {
    expect(mailClient.host).toEqual(clientHost)
  })
})
