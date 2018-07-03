import React, { Component } from 'react'
import Header from './header'
import Body from './body'
import Login from './login'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sessionUser: null
    }
    this.setUser = this.setUser.bind(this)
  }

  async setUser (name) {
    await this.setState({sessionUser: name})
    this.sendUser()
  }

  sendUser () {
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {'Content-Type': 'application/json'}
    })
      .then((response) => {
        return response.json()
      }).then((body) => {
        console.log(body)
      })
  }

  render () {
    var display = this.state.sessionUser === null ? <Login setUser={this.setUser} /> : <Body />

    return (
      <div className="App">
        <Header />
        {display}
      </div>
    )
  }
}

export default App
