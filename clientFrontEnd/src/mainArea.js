import React, { Component } from 'react'
import Compose from './compose'
import Inbox from './inbox'

class MainArea extends Component {
  render () {
    return (
      <div className="mainArea">
        {this.props.compose && < Compose backToInbox={this.props.backToInbox}/>}
        {!this.props.compose && < Inbox/>}
      </div>
    )
  }
}

export default MainArea
