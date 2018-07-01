import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Body from '../src/body'

Enzyme.configure({adapter: new Adapter()})

class MockMainArea extends React.Component {
  render () {
    return (
      <div>MainArea</div>
    )
  }
}

Body.__Rewire__('MainArea', MockMainArea)

describe('<Body/>', () => {
  let body
  beforeEach(() => {
    body = shallow(<Body />)
  })

  it('It has a inbox button', () => {
    expect(body.text()).toContain('INBOX')
  })

  it('It has a compose button', () => {
    expect(body.text()).toContain('COMPOSE')
  })

  it('renders Body component', () => {
    expect(body.find(MockMainArea).length).toEqual(1)
  })
})
