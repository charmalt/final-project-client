class CreateUser {
  constructor () {
    this.name = null
    this.password = null
  }

  saveName (name) {
    this.name = name
  }

  savePassword (password) {
    this.password = password
  }
}

module.exports = CreateUser
