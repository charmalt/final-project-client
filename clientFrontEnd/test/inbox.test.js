/* global describe it expect beforeEach  */
import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Inbox from '../src/inbox'

Enzyme.configure({adapter: new Adapter()})

class MockEmail extends React.Component {
  render () {
    return (
      <div>Email</div>
    )
  }
}
Inbox.__Rewire__('Email', MockEmail)

describe('<Inbox />', () => {
  let inbox
  let emailOne
  let emailTwo
  let emailThree

  beforeEach(() => {
    emailOne = {id: 2}
    emailTwo = {id: 5}
    emailThree = {id: 4}
    inbox = mount(<Inbox />)
    inbox.setState({emails: [emailOne, emailTwo, emailThree]})
  })

  it('Renders email component three times', () => {
    expect(inbox.find(MockEmail).length).toEqual(3)
  })

  it('sorts emails by id', () => {
    expect(inbox.instance().sortEmails(inbox.state('emails'))).toEqual([emailTwo, emailThree, emailOne])
  })
})
