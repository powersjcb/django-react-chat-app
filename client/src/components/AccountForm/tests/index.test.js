import React from 'react'
import AccountForm from '../index'
import renderer from 'react-test-renderer';
import { mount } from 'enzyme'
import { Link } from 'react-router-dom'
import { MemoryRouter } from 'react-router-dom';

test('Consistently renders the account form', () => {
  const component = renderer.create(
    <MemoryRouter>
      <AccountForm />
    </MemoryRouter>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})


test('Displays the signup Link when enabled', () => {
  const component = mount(
    <MemoryRouter>
      <AccountForm />
    </MemoryRouter>
  )
  expect(component.find(Link).text()).toContain('Signup')
})