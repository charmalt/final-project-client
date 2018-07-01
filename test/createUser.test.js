const CreateUser = require('../lib/createUser')

describe('CreateUser', () => {
  let createUser
  let mockCreatePassword
  let mockDBConnection
  let fakeHash = '$2b$10$gYJmwWUqH1tW02V4IMFpvuLY3WkV22u/utobWFF58KzPE5XcBb3Te'
  let name = 'ben'

  beforeEach(() => {
    mockCreatePassword = {
      generate: jest.fn(() => { return fakeHash })
    }
    mockDBConnection = {
      client: {
        query: jest.fn()
      }
    }
    createUser = new CreateUser(mockCreatePassword, mockDBConnection)
  })

  describe('saveName', () => {
    it('adds name to class instance', () => {
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

    it('calls the PasswordCreator class', () => {
      let SpyOncreatePassword = jest.spyOn(mockCreatePassword, 'generate')
      createUser.savePassword(password)
      expect(SpyOncreatePassword).toHaveBeenCalledWith(password)
    })
  })

  describe('create', () => {
    it('should send query to the database', function () {
      let clientDBSPy = jest.spyOn(mockDBConnection.client, 'query')
      createUser.name = name
      createUser.password = fakeHash
      createUser.create()
      expect(clientDBSPy).toHaveBeenCalledWith(`INSERT INTO users (name, password) VALUES ('${name}', '${fakeHash}');`)
    })
  })
})
