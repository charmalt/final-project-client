const PasswordCreator = require('./passwordCreator')

class CreateUser {
  constructor (passwordCreater = new PasswordCreator()) {
    this.passwordCreater = passwordCreater
    this.name = null
    this.password = null
  }

  saveName (name) {
    this.name = name
  }

  savePassword (plainTextPassword) {
    this.password = this.passwordCreater.generate(plainTextPassword)
  }

  create () {
    console.log(this.name + ' :' + this.password)
    return 'User created'
  }
}

module.exports = CreateUser
