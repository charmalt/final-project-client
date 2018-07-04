import React, { Component } from 'react'

class Email extends Component {
  render () {
    return (
      <div className={'email style-' + this.props.cname}>
        <label htmlFor="mailfrom">Mail From: </label>{this.props.email.mailfrom}<br/>
        <label htmlFor="mailbody">Message: </label>{this.props.email.mailbody}
      </div>
    )
  }
}

export default Email
