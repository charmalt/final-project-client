const PasswordCreator = require('../lib/passwordCreator.js')

describe('PasswordCreator', () => {
  describe('generate', async () => {
    let passwordCreator = new PasswordCreator()
    let hash = await passwordCreator.generate()
    expect(hash.length).toEqual(60)
  })
})
