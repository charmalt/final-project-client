const CreateUser = require('../lib/createUser')

describe('CreateUser', () => {
  let createUser
  let mockCreatePassword
  let fakeHash = '$2b$10$gYJmwWUqH1tW02V4IMFpvuLY3WkV22u/utobWFF58KzPE5XcBb3Te'

  beforeEach(() => {
    mockCreatePassword = {
      generate: jest.fn(() => { return fakeHash })
    }
    createUser = new CreateUser(mockCreatePassword)
  })

  describe('saveName', () => {
    it('adds name to class instance', () => {
      let name = 'ben'
      createUser.saveName(name)
      expect(createUser.name).toEqual(name)
    })
  })

  describe('savePassword', () => {
    let password = 'Plain text'

    it('adds password to class instance', () => {
      createUser.savePassword(password)
      expect(createUser.password).toEqual(fakeHash)
    })

    it('calles the PasswordCreator class', () => {
      let SpyOncreatePassword = jest.spyOn(mockCreatePassword, 'generate')
      createUser.savePassword(password)
      expect(SpyOncreatePassword).toHaveBeenCalledWith(password)
    })
  })
})
