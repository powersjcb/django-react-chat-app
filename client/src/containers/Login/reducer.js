import {
  SUBMIT_LOGIN,
  SUBMIT_LOGOUT,
  LOGIN_SUCCEEDED,
  LOGIN_REFRESHED,
} from './constants'

const getInitialState = () => {
  return {
    username: '',
    password: '',
    loggedIn: false,
    access: window.sessionStorage.getItem('access') || '',
    refresh: window.sessionStorage.getItem('refresh') || '',
    iat: parseInt(window.sessionStorage.getItem('iat') || 0, 10), // refresh token created
    rat: parseInt(window.sessionStorage.getItem('lastRefresh') || 0, 10), // access token created
  }
}

const login = (state = getInitialState(), action) => {
  const timestamp = Date.now()
  switch (action.type) {
    case SUBMIT_LOGIN:
      return {
        ...state,
        ...action.user,
      }
    case LOGIN_SUCCEEDED:
      // this seems like the appropriate place to break our abstractions
      window.sessionStorage.setItem('access', action.user.access)
      window.sessionStorage.setItem('refresh', action.user.refresh)
      window.sessionStorage.setItem('iat', timestamp)
      window.sessionStorage.setItem('lastRefresh', timestamp)
      return {
        ...state,
        ...action.user,
        loggedIn: true,
        password: '',
        iat: timestamp,
        rat: timestamp,
      }
    case LOGIN_REFRESHED:
      window.sessionStorage.setItem('access', action.user.access)
      window.sessionStorage.setItem('lastRefresh', timestamp)
      return {
        ...state,
        ...action.user,
        rat: timestamp,
      }
    case SUBMIT_LOGOUT:
      window.sessionStorage.flush()
      return getInitialState()
    default:
      return state
  }
}

export default login