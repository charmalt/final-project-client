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

class MockLogin extends React.Component {
  render () {
    return (
      <div>{this.props.setUser}</div>
    )
  }
}

App.__Rewire__('Header', MockHeader)
App.__Rewire__('Body', MockBody)
App.__Rewire__('Login', MockLogin)

describe('<App/>', () => {
  let app
  beforeEach(() => {
    app = shallow(<App />)
  })

  it('It renders a header', () => {
    expect(app.find(MockHeader).length).toEqual(1)
  })

  describe('display', () => {
    it('It renders login when sessionUser is equal to null', () => {
      expect(app.find(MockLogin).length).toEqual(1)
    })

    it('It renders body when sessionUser is not equal to null', () => {
      app.setState({sessionUser: 'user'})
      expect(app.find(MockBody).length).toEqual(1)
    })
  })

  describe('#setUser', () => {
    it('sets sessionUser to the argument', () => {
      app.instance().setUser('fred')
      expect(app.state('sessionUser')).toEqual('fred')
    })
  })
})
