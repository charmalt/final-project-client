const pg = require('pg')
const env = require('../config/databases')

class DBConnection {
  constructor (dbClient = new pg.Client(env['test'])) {
    this.client = dbClient
    this.client.connect()
  }
}

module.exports = DBConnection
