const CreateUser = require('../../lib/createUser')

describe('Full create a user journey', () => {
  let createUser

  beforeEach(() => {
    createUser = new CreateUser()
  })

  it('User name saved in object', () => {
    let name = 'albert'
    createUser.saveName(name)
    expect(createUser.name).toEqual(name)
  })

  it('User password saved in object', () => {
    createUser.savePassword('string')
    expect(createUser.password.length).toEqual(60)
  })
})
