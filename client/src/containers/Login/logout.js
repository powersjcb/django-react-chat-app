import React from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { attemptLogout } from './actions'

class Logout extends React.Component {
  componentWillMount() {
    this.props.dispatch(attemptLogout())
    this.props.dispatch(push('/'))
  }

  render() {
    return null
  }
}

export default connect(null, null)(Logout)

