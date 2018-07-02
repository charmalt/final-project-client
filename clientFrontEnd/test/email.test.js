/* global describe it expect beforeEach */
import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Email from '../src/email'

Enzyme.configure({adapter: new Adapter()})

describe('<Email/>', () => {
  let email
  let obj
  beforeEach(() => {
    obj = {
      id: 2,
      mailto: 'igor@igor.com',
      mailfrom: 'pino@chio.com',
      mailbody: 'Am I a real boy?'
    }
    email = shallow(<Email key={1} cname={1} email={obj} />)
  })

  it('Displays mailto', () => {
    expect(email.text()).toContain('Mail To: igor@igor.com')
  })

  it('Displays mailfrom', () => {
    expect(email.text()).toContain('Mail From: pino@chio.com')
  })

  it('Displays mailbody', () => {
    expect(email.text()).toContain('Message: Am I a real boy?')
  })
})
