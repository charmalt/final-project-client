import React, { Component } from 'react'
import Email from './email'

class Inbox extends Component {
  constructor (props) {
    super(props)
    this.state = {
      emails: []
    }
  }

  componentDidMount () {
    fetch('/api/emails')
      .then(emails => emails.json())
      .then(emails => this.setState({ emails }))
  }

  render () {
    var emails = this.state.emails.map(email =>
      <Email key={email.id} email={email}/>
    )
    return (
      <div className="Inbox">
        {emails}
      </div>
    )
  }
}

export default Inbox
