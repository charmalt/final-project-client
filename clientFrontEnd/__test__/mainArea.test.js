import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import MainArea from '../src/mainArea'

Enzyme.configure({adapter: new Adapter()})

class MockCompose extends React.Component {
  render () {
    return (
      <div>Compose</div>
    )
  }
}

class MockInbox extends React.Component {
  render () {
    return (
      <div>Inbox</div>
    )
  }
}

MainArea.__Rewire__('Compose', MockCompose)
MainArea.__Rewire__('Inbox', MockInbox)

describe('<MainArea />', () => {
  let mainArea

  beforeEach(() => {
    mainArea = mount(<MainArea />)
  })

  it('renders Compose when props.compose is true', () => {
    mainArea.setProps({ compose: true });
    expect(mainArea.find(MockCompose).length).toEqual(1)
  })

  it('renders Inbox when props.compose is false', () => {
    mainArea.setProps({ compose: false });
    expect(mainArea.find(MockInbox).length).toEqual(1)
  })
})
