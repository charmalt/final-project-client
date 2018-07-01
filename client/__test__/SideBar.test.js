import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SideBar from '../src/SideBar'

Enzyme.configure({adapter: new Adapter()})
describe('<SideBar/>', () => {
  let sidebar
  beforeEach(() => {
    sidebar = shallow(<SideBar />)
  })

  it('It has a inbox button', () => {
    expect(sidebar.text()).toContain('INBOX')
  })

  it('It has a compose button', () => {
    expect(sidebar.text()).toContain('COMPOSE')
  })
})
