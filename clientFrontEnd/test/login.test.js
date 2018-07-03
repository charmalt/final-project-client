/* global describe it expect */
import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Login from '../src/login'

Enzyme.configure({adapter: new Adapter()})

describe('<Login />', () => {
  let login
  let mockFunction

  beforeEach(() => {
    mockFunction = jest.fn()
    login = shallow(<Login setUser={mockFunction} />)
  })

  it('changes the sessionUser state', () => {
    let name = 'Jeez'
    let mockSessionUser = { target: { value: name } }
    login.instance().changeSessionUser(mockSessionUser)
    expect(login.state('sessionUser')).toEqual(name)
  })
})
