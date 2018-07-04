import React, { Component } from 'react'

class Header extends Component {
  render () {
    return (
      <div className="Header">
      <span className="logo">
      <i className="far fa-envelope"></i>
      </span>
        <span className="title">Retro Mail</span>
      </div>
    )
  }
}

export default Header
