const PasswordCreator = require('./passwordCreator')
const DBConnection = require('../models/dbConnection')

class CreateUser {
  constructor (passwordCreator = new PasswordCreator(), dbConnection = new DBConnection()) {
    this.passwordCreator = passwordCreator
    this.dbConnection = dbConnection
    this.name = null
    this.password = null
    this.dbName = 'users'
  }

  saveName (name) {
    this.name = name
  }

  savePassword (plainTextPassword) {
    this.password = this.passwordCreator.generate(plainTextPassword)
  }

  create () {
    this.dbConnection.client.query(`INSERT INTO ${this.dbName} (name, password) VALUES ('${this.name}', '${this.password}');`, (err, res) => {
      console.log(err ? err.stack : res.command)
      this.dbConnection.client.end()
    })
  }
}

module.exports = CreateUser
