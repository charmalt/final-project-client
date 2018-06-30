const CreateUser = require('../lib/createUser.js')

describe('CreateUser', () => {
  let createUser

  beforeEach(() => {
    createUser = new CreateUser()
  })

  describe('saveName', () => {
    it('adds name to class instance', () => {
      let name = 'ben'
      createUser.saveName(name)
      expect(createUser.name).toEqual(name)
    })
  })

  describe('savePassword', () => {
    it('adds password to class instance', () => {
      let password = 'pretendHash'
      createUser.savePassword(password)
      expect(createUser.password).toEqual(password)
    })
  })
})
