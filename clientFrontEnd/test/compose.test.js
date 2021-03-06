/* global describe it expect beforeEach jest fetch */

import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Compose from '../src/compose'

Enzyme.configure({adapter: new Adapter()})

describe('<Compose />', () => {
  let compose
  let out
  let submitOut
  let preventSpy

  beforeEach(() => {
    compose = shallow(<Compose />)
    out = {target: { value: 'test' }}
    submitOut = {preventDefault: () => {}}
    preventSpy = jest.spyOn(submitOut, 'preventDefault')
  })

  describe('handleChanges methods', () => {
    it('changeMailBody changes state', () => {
      compose.instance().changeMailBody(out)
      expect(compose.state().mailbody).toEqual('test')
    })

    it('changeMailto changes state', () => {
      compose.instance().changeMailTo(out)
      expect(compose.state().mailto).toEqual('test')
    })
  })

  describe('#sendMail', () => {
    it('Calls fetch with a argument send and post', () => {
      compose.instance().sendMail({test: 'test'})
      expect(fetch).toHaveBeenCalledWith('/api/emails', {'body': '{"test":"test"}', 'headers': {'Content-Type': 'application/json'}, 'method': 'POST'})
    })
  })
})
