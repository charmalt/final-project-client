const DBConnection = require('../models/dbConnection')

class CheckUserData {
  constructor (dbConnection = new DBConnection()) {
    this.dbConnection = dbConnection
  }
  nameCheck (name) {
    this.dbConnection.client.query(`SELECT name FROM users WHERE name = '${name}'`, (err, res) => {
      if (err) {
        console.log(err.stack)
      }
      console.log(res)
      if (res.rowCount > 0) { return true }
      this.dbConnection.client.end()
    })
  }
}

module.exports = CheckUserData