/* global it, describe, test, expect */

const Receiver = require('../lib/receiver')
jest.mock('net')

describe('Receiver', () => {
  it('works', () => {
    expect(2).toEqual(2)
  })
})