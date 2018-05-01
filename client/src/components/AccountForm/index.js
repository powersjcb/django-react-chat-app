import React from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from "prop-types"

const AccountForm = ({
  formLabel,
  submitLabel,
  submitForm,
  loggedIn,
}) => {
  let usernameInput, passwordInput;
  if (loggedIn) {
    return <Redirect to="/" />
  }
  return (
    <form onSubmit={submitEvent => {
      submitEvent.preventDefault()
      submitForm(
        usernameInput.value,
        passwordInput.value)
      }}>
      <h3>{formLabel}</h3>
      <label>
        Username
        <input type="text" ref={(node) => {usernameInput = node}}/>
      </label>
      <label>
        Password
        <input type="password" ref={(node) => {passwordInput = node}}/>
      </label>
      <input type="submit" value={submitLabel}/>
    </form>
  );
}

AccountForm.propTypes = {
  formLabel: PropTypes.string,
  submitLabel: PropTypes.string,
  submitForm: PropTypes.func,
}

export default AccountForm
