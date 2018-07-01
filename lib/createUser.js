const PasswordCreator = require('./passwordCreator')
const DBConnection = require('../models/dbConnection')

class CreateUser {
  constructor (passwordCreator = new PasswordCreator(), dbConnection = new DBConnection()) {
    this.passwordCreator = passwordCreator
    this.dbConnection = dbConnection
    this.name = null
    this.password = null
  }

  saveName (name) {
    this.name = name
  }

  savePassword (plainTextPassword) {
    this.password = this.passwordCreator.generate(plainTextPassword)
  }

  create () {
    this.dbConnection.client.query(`INSERT INTO user (name, password) VALUES ('${this.name}', '${this.password}');`)
  }
}

module.exports = CreateUser
