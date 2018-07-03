import React, { Component } from 'react'
import Header from './header'
import Body from './body'
import Login from './login'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sessionUser: null
    }
  }
  render () {
    var display = this.state.sessionUser === null ? <Login /> : <Body />

    return (
      <div className="App">
        <Header />
        {display}
      </div>
    )
  }
}

export default App
