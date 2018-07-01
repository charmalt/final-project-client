import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import App from '../src/App'

Enzyme.configure({adapter: new Adapter()})

class MockHeader extends React.Component {
  render () {
    return (
      <div>Header</div>
    )
  }
}

App.__Rewire__('Header', MockHeader)

describe('<App/>', () => {
  it('It renders a header', () => {
    const app = shallow(<App />);
    expect(app.find(MockHeader).length).toEqual(1);
  })
})
