import React, { Component } from 'react'

class Email extends Component {
  render () {
    return (
      <div className={'email style-' + this.props.cname}>
        <div className='from'>{this.props.email.mailfrom}</div>
        <div className='message'>{this.props.email.mailbody}</div>
      </div>
    )
  }
}

export default Email
