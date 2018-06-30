var bcrypt = require('bcrypt')

class Password {
  constructor (plaintextPassword) {
    this.saltRounds = 10
    this.plaintextPassword = plaintextPassword
    this.passwordHash = null
  }

  generate () {
    bcrypt.genSalt(this.saltRounds, (err, salt) => {
      if (err) { return err }

      bcrypt.hash(this.plaintextPassword, salt, (err, hash) => {
        if (err) { return err }

        this.passwordHash = hash
        console.log(`Password hash : ${this.passwordHash}`)
      })
    })
  }
}

module.exports = Password
