import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { SIGNUP_SUBMIT } from './constants.js'
import AccountForm from '../../components/AccountForm/index'
import PropTypes from 'prop-types'

// ({ formLabel, submitLabel, submitForm }) => {

const createAccount = (username, password) => {
  return {
    type: SIGNUP_SUBMIT,
    username,
    password,
  }
}

const SignUp = ({ submitForm }) => (
  <div>
    <AccountForm
      formLabel={'Sign up'}
      submitLabel={'Create Account'}
      submitForm={submitForm}
    />
    <Link to="/">Login</Link>
  </div>
)

SignUp.propTypes = {
  submitForm: PropTypes.func,
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.login.user.loggedIn,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitForm: (u, p) => {
      dispatch(createAccount(u, p))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)