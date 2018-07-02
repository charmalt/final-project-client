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

  beforeEach(() => {
    const email = 'test'
    inbox = mount(<Inbox />)
    inbox.setState({emails: [email, email, email]})
  })

  it('should render email component three times', () => {
    expect(inbox.find(MockEmail).length).toEqual(3)
  })
})
