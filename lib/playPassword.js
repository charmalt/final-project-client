var bcrypt = require('bcrypt')

class CreatePassword {
  constructor (plaintextPassword, passwordHash) {
    this.saltRounds = 10
    this.plaintextPassword = plaintextPassword
    this.hashedPassword = null
  }

  generate () {
    this._createPasswordHash()
  }

  _createPasswordHash () {
    bcrypt.hash(this.plaintextPassword, this.saltRounds, (err, passwordHash) => {
      if (err) { return err }
      this._addPassword(passwordHash)
    })
  }

  _addPassword (passwordHash) {
    this.hashedPassword = passwordHash
    console.log(`Password hash : ${this.hashedPassword}`)
  }
}

module.exports = CreatePassword
