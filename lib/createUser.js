const PasswordCreator = require('./PasswordCreator')

class CreateUser {
  constructor (passwordCreater = new PasswordCreator()) {
    this.passwordCreater = passwordCreater
    this.name = null
    this.password = null
  }

  saveName (name) {
    this.name = name
  }

  savePassword (password) {
    let hashedPassword = this.passwordCreater.generate(password)
    this.password = hashedPassword
  }
}

module.exports = CreateUser
