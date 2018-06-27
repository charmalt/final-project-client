/* globals describe, it, expect, jest, beforeEach */
const MailClient = require('../lib/MailClient')
jest.mock('net')

describe('MailClient', () => {
  let net = require('net')
  let spyNewConnection
  let mailClient
  beforeEach(() => {
    mailClient = new MailClient()
    spyNewConnection = jest.spyOn(mailClient, 'newConnection')
  })

  it('It calls connect command', () => {
    mailClient.newConnection()
    expect(spyNewConnection).toHaveBeenCalled()
  })
})
