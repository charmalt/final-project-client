import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Header from '../src/header'

Enzyme.configure({adapter: new Adapter()})

describe('<Header/>', () => {
  it('It renders a header', () => {
    const header = shallow(<Header />)
    expect(header.text()).toContain('Header')
  })
})
