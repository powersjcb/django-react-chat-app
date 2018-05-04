import React from "react"
import { Link } from 'react-router-dom'
import styled from 'styled-components';

export default ({active, name, id}) => {
  const ActiveLink = styled(Link)`
    border: 3px black;
    font-weight: bolt;
  `
  const StyledLink = active ? ActiveLink : Link;
  return (
    <div>
      <StyledLink to={`/channel/${id}`}>
        {name}
      </StyledLink>
    </div>
  )
}
