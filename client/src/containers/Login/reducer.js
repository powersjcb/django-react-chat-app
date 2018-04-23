import {
  SUBMIT_LOGIN,
  SUBMIT_LOGOUT,
  LOGIN_SUCCEEDED,
} from './constants'

const initialState = {
  username: '',
  password: '',
  loggedIn: false,
  token: ''
}

const login = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_LOGIN:
      return {
        ...state,
        username: action.username,
        password: action.password
      }
    case LOGIN_SUCCEEDED:
      return {
        username: action.username,
        loggedIn: true,
        token: action.token,
        password: ''
      }
    case SUBMIT_LOGOUT:
      return initialState
    default:
      return state
  }
}

export default login