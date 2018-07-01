import React, { Component } from 'react'
import Header from './header'
class App extends Component {
  constructor(props) {
  super(props)
  this.state = {
    emails: []
  }
}


  componentDidMount() {
    fetch('/api/emails')
      .then(emails => emails.json())
      .then(emails => this.setState({ emails }));
  }

  render() {
    return (
      <div className="App">
        < Header />
      </div>
    );
  }
}

export default App;
