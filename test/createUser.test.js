const CreateUser = require('../lib/createUser.js')

describe('CreateUser', () => {
  let createUser
  let fakeHash = '$2b$10$gYJmwWUqH1tW02V4IMFpvuLY3WkV22u/utobWFF58KzPE5XcBb3Te'

  beforeEach(() => {
    let createPasswordMock = {
      generate: jest.fn(() => { return fakeHash })
    }
    createUser = new CreateUser(createPasswordMock)
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
      expect(createUser.password).toEqual(fakeHash)
    })
  })
})
