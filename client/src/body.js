import React, { Component } from 'react'
import MainArea from './mainArea'

class Body extends Component {
  render () {
    return (
      <div className="main">
        <div className="sideBar">
          <button className="inbox" type="button">INBOX </button>
          <button className="compose" type="button">COMPOSE </button>
        </div>
        <MainArea />
      </div>
    )
  }
}

export default Body
