desc('Create main local Databse')
task('makeDatabases', { async: true }, function () {
  var cmds = [
    'createdb mailclient;',
    'createdb testmailclient;',
    'node models/tableGenerator.js'
  ]
  jake.exec(cmds, {printStdout: true}, function () {
    console.log('All tests passed.')
    complete()
  })
})
