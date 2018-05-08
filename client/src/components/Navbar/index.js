import React from 'react'
import { Link } from 'react-router-dom'
import { Toolbar, NavLink } from 'rebass'

export default ({signedIn}) => (
  <Toolbar>
    {signedIn && (
      <NavLink is={Link} to='/messenger/'>Messenger</NavLink>
    )}

    {signedIn && (
    <NavLink
      is={Link}
      to='/channels/'
    >
      Channels
    </NavLink>
    )}

    {/* ml -> margin-left */}
    <NavLink
      is={Link}
      to='/logout/'
      ml="auto"
    >
      Logout
    </NavLink>
  </Toolbar>
)