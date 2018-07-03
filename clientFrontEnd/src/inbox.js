import React, { Component } from 'react'
import Email from './email'

class Inbox extends Component {
  constructor (props) {
    super(props)
    this.i = 0
    this.state = {
      emails: []
    }
    this.alternateColour = this.alternateColour.bind(this)
  }

  componentDidMount () {
    fetch('/api/emails', {
      method: 'GET',
      datatype: 'json',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(emails => emails.json())
      .then(emails => { console.log('THIS IS EMAILS.JSON:\n' + JSON.stringify(emails) + '\n___________'); return emails })
      .then(emails => this.setState({ emails }))
  }

  alternateColour () {
    this.i === 0 ? this.i = 1 : this.i = 0
    return this.i
  }

  render () {
    var emails = this.state.emails.map(email =>
      <Email key={email.id} cname={this.alternateColour()} email={email} />
    )
    return (
      <div className="Inbox">
        {emails}
      </div>
    )
  }
}

export default Inbox
