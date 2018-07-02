/* global describe it expect  */
import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import App from '../src/app'

Enzyme.configure({adapter: new Adapter()})

class MockHeader extends React.Component {
  render () {
    return (
      <div>Header</div>
    )
  }
}

class MockBody extends React.Component {
  render () {
    return (
      <div>Body</div>
    )
  }
}

App.__Rewire__('Header', MockHeader)
App.__Rewire__('Body', MockBody)

describe('<App/>', () => {
  it('It renders a header', () => {
    const app = shallow(<App />)
    expect(app.find(MockHeader).length).toEqual(1)
  })
  it('It renders a body', () => {
    const app = shallow(<App />)
    expect(app.find(MockBody).length).toEqual(1)
  })
})
