const DBConnection = require('../models/dbConnection')

class CheckUserData {
  constructor (dbConnection = new DBConnection()) {
    this.dbConnection = dbConnection
  }
  async nameCheck (name) {
    let result = await this.dbConnection.client.query(`SELECT name FROM users WHERE name = '${name}'`, (err, res) => {
      if (err) {
        console.log(err.stack)
        return false
      }
      this.dbConnection.client.end()
    })
    if (result.rowCount > 0) {
      return true
    } else {
      return false
    }
  }
}

module.exports = CheckUserData
