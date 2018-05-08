import React from 'react'
import { connect } from 'react-redux'
import { SUBMIT_LOGIN } from './constants'
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

const Login = ({loggedIn, submitForm}) => {
  return (
    <div>
      <AccountForm
        submitLabel={"Login"}
        formLabel={"Login to application"}
        submitForm={submitForm}
        loggedIn={loggedIn}
      >
      </AccountForm>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
