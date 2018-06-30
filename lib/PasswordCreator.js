var bcrypt = require('bcrypt')

class PasswordCreator {
  generate (plaintext) {
    return new Promise((resolve, reject) => {
      bcrypt.hashSync(plaintext, 10, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }
}

module.exports = PasswordCreator
