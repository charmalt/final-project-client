const PasswordCreator = require('../lib/passwordCreator.js')

describe('PasswordCreator', () => {
  it('generate', () => {
    let passwordCreator = new PasswordCreator()
    passwordCreator.generate('string')
    expect(passwordCreator.password.length).toEqual(60)
  })
})
