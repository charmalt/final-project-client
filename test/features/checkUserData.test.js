const CheckUserData = require('../../lib/checkUserData')
const CreateUser = require('../../lib/createUser')

describe('Check User Existence and Data', () => {
  let createUser = new CreateUser()
  let checkUserData
  let name = 'ben'
  let password = 'any old thing'
  createUser.saveName(name)
  createUser.savePassword(password)
  createUser.create()

  beforeEach(() => {
    checkUserData = new CheckUserData
  })

  describe('Check user exists', () => {
    it('should return true if the user exists', async (done) => {
      let resultCHECK = await checkUserData.nameCheck(name)
      setTimeout(() => {
        expect(resultCHECK).toBe(true)
        done()
      }, 100)
    })

    it('should return false if the user does not exist', async (done) => {
      let result = await checkUserData.nameCheck('BOB')
      setTimeout(() => {
        expect(result).toEqual(false)
        done()
      }, 100)
    })
  })
})
