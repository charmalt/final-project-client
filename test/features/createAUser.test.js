const CreateUser = require('../../lib/createUser')

describe('Full create a user journey', () => {
  let createUser

  beforeEach(() => {
    createUser = new CreateUser()
  })

  it('User details saved in object', () => {
    let name = 'albert'
    let password = '1358264tw'
    createUser.saveName(name)
    expect(createUser.name).not.toEqual(null)
    createUser.savePassword(password)
    expect(createUser.password.length).toEqual(60)
  })
})
