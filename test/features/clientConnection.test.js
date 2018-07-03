const MailClient = require('../../lib/mailClient')
const net = require('net')

describe('CLient connects to server', () => {
  let client
  let server

  beforeAll(async (done) => {
    server = net.createServer()
    server.listen({
      host: 'localhost',
      port: 1337
    }, () => {
      client = new MailClient(1337, '127.0.0.1', 5001, '127.0.0.1')
      done()
    })
  })

  beforeEach(() => {
    console.log = jest.fn()
  })

  afterAll((done) => {
    server.close(() => {
      done()
    })
  })

  it('connects to pop Server', (done) => {
    client.send('message')
    setTimeout(() => {
      expect(console.log.mock.calls[0][0]).toEqual('Connected to server')
      done()
    }, 100)
  })
})
