const pg = require('pg')
const env = require('../config/databases.js')
const connectionString = process.env.DATABASE_URL || env['development']

const client = new pg.Client(connectionString)
client.connect()
const query = client.query(
  'CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(20), password VARCHAR(60));'
)
query.on('end', () => { client.end() })

const connectionStringTest = process.env.DATABASE_URL || env['test']

const clientTest = new pg.Client(connectionStringTest)
clientTest.connect()
const queryTest = clientTest.query(
  'CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(20), password VARCHAR(60));'
)
queryTest.on('end', () => { clientTest.end() })