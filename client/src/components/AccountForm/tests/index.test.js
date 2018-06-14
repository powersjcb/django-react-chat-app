import React from 'react'
import AccountForm from '../index'
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

test('Renders login page', () => {
  const component = renderer.create(
    <MemoryRouter>
      <AccountForm />
    </MemoryRouter>
  )

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()

})