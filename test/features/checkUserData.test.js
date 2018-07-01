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
      console.log('BEGIN MY TEST')
      let resultCHECK = (() => checkUserData.nameCheck(name))()
      console.log('EXECUTE MY FUNCTION', resultCHECK)
      setTimeout(() => {
        expect(resultCHECK).toBe(true)
        done()
      }, 4000)
      console.log('INSIDE THE TIMEOUT', resultCHECK)
    })
    xit('should return false if the user does not exist', done => {
      let result = (() => checkUserData.nameCheck('BOB'))()
      setTimeout(() => {
        console.log('I AM THE RESULT', result)
        expect(result).toEqual(false)
        done()
      }, 1000)
    })
  })
})
