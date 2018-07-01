var bcrypt = require('bcrypt')

class PasswordCreator {
  constructor () {
    this.saltRounds = 1
    this.password = null
  }

  generate (plaintext) {
    this.password = bcrypt.hashSync(plaintext, this.saltRounds)
    return this.password
  }
}

module.exports = PasswordCreator
