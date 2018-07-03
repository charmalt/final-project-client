/* global describe it expect */
import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Login from '../src/login'

Enzyme.configure({adapter: new Adapter()})

describe('<Login />', () => {
  let login
  let mockSetUser

  beforeEach(() => {
    mockSetUser = jest.fn()
    login = shallow(<Login setUser={mockSetUser} />)
  })

  it('changes the sessionUser state', () => {
    let name = 'Jeez'
    let mockSessionUser = { target: { value: name } }
    login.instance().changeSessionUser(mockSessionUser)
    expect(login.state('sessionUser')).toEqual(name)
  })

  describe('onSubmit', () => {
    let mockEvent = { preventDefault: jest.fn() }

    beforeEach(() => {
      login.instance().onSubmit(mockEvent)
    })

    it('calls preventDefault', () => {
      let spyOnPreventDefault = jest.spyOn(mockEvent, 'preventDefault')

      expect(spyOnPreventDefault).toHaveBeenCalled()
    })
  })
})
