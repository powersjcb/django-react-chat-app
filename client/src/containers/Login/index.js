import React from 'react'
import { connect } from 'react-redux'
import { SUBMIT_LOGIN, SUBMIT_LOGOUT } from './constants'

const attemptLogin = (username, password) => {
  return {
    type: SUBMIT_LOGIN,
    username,
    password
  }
}

const attemptLogout = () => {
  return {
    type: SUBMIT_LOGOUT,
  }
}

class Login extends React.Component {
  render() {
    let usernameInput, passwordInput;
    if (this.props.loggedIn) {
      return (
        <div>
          <a
            onClick={(e) => {
              e.preventDefault()
              this.props.dispatch(attemptLogout())
            }}
          >
            Log out
          </a>
        </div>
      )
    }
    return (
      <form onSubmit={(e) => {
        e.preventDefault()
        this.props.dispatch(attemptLogin(
          usernameInput.value,
          passwordInput.value
        ))
      }}>
        <label>
          Username
          <input type="text" ref={node => usernameInput = node}/>
        </label>
        <label>
          Password
          <input type="password" ref={node => passwordInput = node} />
        </label>
        <span>still failing</span>
        <button>Login</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.login.loggedIn,
    username: state.login.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {dispatch}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
