import React, { Component } from 'react'
import MainArea from './mainArea'

class Body extends Component {
  constructor (props) {
    super(props)
    this.state = {compose: false}
    this.compose = this.compose.bind(this)
    this.inbox = this.inbox.bind(this)
  }

  compose () {
    this.setState({compose: true})
  }

  inbox () {
    this.setState({compose: false})
  }
  render () {
    return (
      <div className="main">
        <div className="sideBar">
          <button className="inbox" onClick={this.inbox} type="button">INBOX </button>
          <button className="compose" onClick={this.compose} type="button">COMPOSE </button>
        </div>
        <MainArea compose={this.state.compose} />
      </div>
    )
  }
}

export default Body
