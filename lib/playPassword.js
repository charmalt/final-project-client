var bcrypt = require('bcrypt')

class Password {
  constructor (plaintextPassword, passwordHash) {
    this.saltRounds = 10
    this.plaintextPassword = plaintextPassword
    this.hashedPassword = null
  }

  generate () {
    this._createPasswordHash()
  }

  compare (passwordProvided) {
    console.log('1')
    bcrypt.compare(passwordProvided, this.hashedPassword, (err, res) => {
      if (err) { return err }
      console.log(res)
      return res
    })
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

module.exports = Password
