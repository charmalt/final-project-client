import React, {Component} from 'react'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sessionUser: null
    }
  }

  changeSessionUser (event) {
    this.setState({ sessionUser: event.target.value })
  }

  render () {
    return (
      <div>
        <form>
        Username
        Password
        Button
        </form>
      </div>
    )
  }
}

export default Login
