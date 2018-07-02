import React, { Component } from 'react'

class Email extends Component {
  render () {
    return (
      <div className="Email">
        <label for="mailto">Mail to:</label> {this.props.email.mailto} 
      </div>
    )
  }
}

export default Email
