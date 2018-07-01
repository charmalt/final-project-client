const CreateUser = require('../../lib/createUser')

describe('Full create a user journey', () => {
  let createUser
  let name = 'albert'
  let password = 'any old thing'

  beforeEach(() => {
    createUser = new CreateUser()
  })

  it('user name saved in object', () => {
    createUser.saveName(name)
    expect(createUser.name).toEqual(name)
  })

  it('user password saved in object', () => {
    createUser.savePassword(password)
    expect(createUser.password.length).toEqual(60)
  })

  it('saves the user into the database with name and password', done => {
    createUser.saveName(name)
    createUser.savePassword(password)
    console.log = jest.fn()
    createUser.create()

    setTimeout(() => {
      expect(console.log).toHaveBeenCalledWith('INSERT')
      done()
    }, 100)
  })

  it('should log an error if query is wrong', done => {
    createUser.dbName = 'WRONG'
    createUser.saveName(name)
    createUser.savePassword(password)
    console.log = jest.fn()
    createUser.create()

    setTimeout(() => {
      expect(console.log.mock.calls[0][0]).toContain('error: relation')
      done()
    }, 100)
  })
})
