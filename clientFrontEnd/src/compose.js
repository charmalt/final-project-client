/* global fetch  */

import React, { Component } from 'react'

class Compose extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.changeMailTo = this.changeMailTo.bind(this)
    this.changeMailBody = this.changeMailBody.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.sendMail = this.sendMail.bind(this)
  }

  changeMailTo (event) {
    this.setState({ mailto: event.target.value })
  }

  changeMailBody (event) {
    this.setState({ mailbody: event.target.value })
  }

  handleSubmit (event) {
    event.preventDefault()
    var newMail = {}
    newMail['RCPT_TO'] = this.state.mailto
    newMail['DATA'] = this.state.mailbody
    this.sendMail(newMail)
    this.setState({ value: ' ' })
    this.props.backToInbox()
  }

  sendMail (data) {
    fetch('/api/emails', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'}
    })
      .then((response) => {
        return response.json()
      }).then((body) => {
        console.log(body)
      })
  }

  render () {
    return (
      <div className="Compose">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="mailto">Mail To: </label><input type="text" onChange={this.changeMailTo} value={this.state.value} name="mailto" /><br/>
          <label htmlFor="mailbody">Message: </label>
          <textarea type="text" name="mailbody" onChange={this.changeMailBody} value={this.state.value} placeholder="Send some retro mail!!!"></textarea>
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    )
  }
}

export default Compose
