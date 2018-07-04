import React, { Component } from 'react'
import Email from './email'

class Inbox extends Component {
  constructor (props) {
    super(props)
    this.state = {
      emails: []
    }
    this.alternateColour = this.alternateColour.bind(this)
    this.pullEmails = this.pullEmails.bind(this)
  }

  componentDidMount () {
    this.pullEmails()
    this.interval = setInterval(() => this.pullEmails(), 2000)
  }

  pullEmails () {
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
  alternateColour (index) {
    return (index % 2 === 0) ? 1 : 0
  }

  sortEmails (emails) {
    return emails.sort(this._compare)
  }

  _compare (a, b) {
    return (a.id > b.id) ? -1 : 1
  }

  render () {
    var emails = this.sortEmails(this.state.emails).map((email, index) =>
      <Email key={email.id} cname={this.alternateColour(index)} email={email}/>
    )
    return (
      <div className="Inbox">
        {emails}
      </div>
    )
  }
}

export default Inbox
