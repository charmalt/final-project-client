/* globals describe, it, expect, jest, beforeEach */
const MailClient = require('../lib/MailClient')
jest.mock('net')

describe('MailClient', () => {
  let mailClient

  beforeEach(() => {
    mailClient = new MailClient()
  })

  it('to have a connection property that is set to null', () => {
    expect(mailClient.connection).toEqual(null)
  })
})
