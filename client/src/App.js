import React, { Component } from 'react';

class App extends Component {
  state = {
    emails: []
  };

  componentDidMount() {
    fetch('/api/emails')
      .then(emails => emails.json())
      .then(emails => this.setState({ emails }));
  }

  render() {
    return (
      <div className="App">
          {this.state.emails.map(email =>
          <div className={email.id}>{email.mailto}</div>
          )}
      </div>
    );
  }
}

export default App;
