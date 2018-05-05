import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { SUBMIT_LOGIN, SUBMIT_LOGOUT } from './constants'
import PropTypes from 'prop-types'

import AccountForm from '../../components/AccountForm/index'

const attemptLogin = (username, password) => {
  return {
    type: SUBMIT_LOGIN,
    user: {
      username,
      password,
    },
  }
}

const attemptLogout = {
  type: SUBMIT_LOGOUT,
}

const Login = ({loggedIn, submitForm, dispatch}) => {
  if (loggedIn) {
    return (
      <button onClick={() => {dispatch(attemptLogout)}}>
        Log Out
      </button>
    )
  }
  return (
    <div>
      <AccountForm
        submitLabel={"Login"}
        formLabel={"Login to application"}
        submitForm={submitForm}
        loggedIn={loggedIn}
      >
      </AccountForm>
      <Link to="/signup">Signup</Link>
    </div>
    )
}

Login.propTypes = {
  loggedIn: PropTypes.bool,
  submitForm: PropTypes.func,
  dispatch: PropTypes.func,
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.login.user.loggedIn,
    username: state.login.user.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitForm: (u, p) => {
     dispatch(attemptLogin(u, p))
    },
    dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
