const CheckUserData = require('../../lib/checkUserData')
const CreateUser = require('../../lib/createUser')

describe('Check User Existence and Data', () => {
  let createUser = new CreateUser()
  let checkUserData = new CheckUserData
  let name = 'ben'
  let password = 'any old thing'
  createUser.saveName(name)
  createUser.savePassword(password)
  createUser.create()

  describe('Check user exists', () => {
    it('should return true if the user exists', done => {
      let result = () => checkUserData.nameCheck(name)()
      setTimeout(() => {
        expect(result).toBeTruthy()
        done()
      }, 100)
    })
  })
})