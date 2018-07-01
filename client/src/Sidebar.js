import React, { Component } from 'react'

class SideBar extends Component {
  render () {
    return (
      <div className="sideBar">
        <button className="inbox" type="button">INBOX </button>
        <button className="inbox" type="button">COMPOSE </button>
      </div>
    )
  }
}

export default SideBar
