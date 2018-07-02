// const MailClient = require('../../lib/mailClient')
// const net = require('net')
//
// describe('Feature Test', () => {
//   let client
//   let server
//
//   beforeAll(async () => {
//     server = await net.createServer({ port: 1337, host: '127.0.0.1' }, () => {
//       client = new MailClient(1337, '127.0.0.1', 5001, '127.0.0.1')
//     })
//     console.log = jest.fn()
//   })
//
//   beforeEach(() => {
//     console.log.mockClear()
//   })
//
//   afterAll(() => {
//     server.close()
//   })
//
//   it('connects to pop Server', async (done) => {
//     await client.send('message')
//     setTimeout(() => {
//       expect(console.log.mock.calls[0][0]).toEqual('Connected to server')
//       done()
//     }, 100)
//   })
// })
