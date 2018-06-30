const Password = require('./lib/playPassword')

let password = new Password('testpassword')

password.generate()

password.compare('324')
password.compare('testpassword')
