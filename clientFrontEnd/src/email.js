import React, { Component } from 'react'

class Email extends Component {
  render () {
    return (
      <div className={"Email" + this.props.cname}>
        <label for="mailto">Mail To: </label> {this.props.email.mailto}<br/>
        <label for="mailfrom">Mail From: </label> {this.props.email.mailfrom}<br/>
        <label for="mailbody">Message: </label> {this.props.email.mailbody}
      </div>
    )
  }
}

export default Email
