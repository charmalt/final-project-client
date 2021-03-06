import React, {Component} from 'react'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sessionUser: null
    }
    this.changeSessionUser = this.changeSessionUser.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  changeSessionUser (event) {
    this.setState({ sessionUser: event.target.value })
  }

  onSubmit (event) {
    event.preventDefault()
    this.props.setUser(this.state.sessionUser)
  }

  render () {
    return (
      <div className='login'>
        <form onSubmit={this.onSubmit}>
          <label className='label'>Username: </label>
          <input
            type='text'
            name='sessionUser'
            onChange={this.changeSessionUser}
            value={this.state.value}
          />
          <br/>
          <label className='label'>Password: </label>
          <input
            type='password'
            name='password'
          />
          <br/>
          <input type='submit' value='Login' />
        </form>
      </div>
    )
  }
}

export default Login
