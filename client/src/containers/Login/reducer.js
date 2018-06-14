import {
  SUBMIT_LOGIN,
  SUBMIT_LOGOUT,
  LOGIN_SUCCEEDED,
  LOGIN_REFRESHED,
  LOGIN_FAILED,
} from './constants'

class HeadlessSessionStorage {
  constructor() {
    this.storage = {}
  }
  getItem(key) {
    return this.storage[key]
  }
  setItem(key, value) {
    this.storage[key] = value
  }

}

const getInitialState = () => {
  const sessionStorage = window.sessionStorage || new HeadlessSessionStorage()
  return {
    user: {
      id: sessionStorage.getItem('id') || null,
      username: sessionStorage.getItem('username') || '',
      password: '',
      loggedIn: false,
      access: sessionStorage.getItem('access') || '',
      refresh: sessionStorage.getItem('refresh') || '',
      iat: parseInt(sessionStorage.getItem('iat') || 0, 10), // refresh token created
      rat: parseInt(sessionStorage.getItem('lastRefresh') || 0, 10), // access token created
    }
  }
}

const login = (state = getInitialState(), action) => {
  const sessionStorage = window.sessionStorage || HeadlessSessionStorage
  const timestamp = Date.now()
  switch (action.type) {
    case SUBMIT_LOGIN:
      sessionStorage.setItem('username', action.user.username)
      return {
        user: {
          ...state.user,
          ...action.user,
        }
      }
    case LOGIN_SUCCEEDED:
      // this seems like the appropriate place to break our abstractions
      sessionStorage.setItem('id', action.user.id)
      sessionStorage.setItem('access', action.user.access)
      sessionStorage.setItem('refresh', action.user.refresh)
      sessionStorage.setItem('iat', timestamp)
      sessionStorage.setItem('lastRefresh', timestamp)
      return {
        user: {
          ...state.user,
          ...action.user,
          loggedIn: true,
          password: '',
          iat: timestamp,
          rat: timestamp,
        }
      }
    case LOGIN_REFRESHED:
      sessionStorage.setItem('access', action.user.access)
      sessionStorage.setItem('lastRefresh', timestamp)
      return {
        user: {
          ...state.user,
          ...action.user,
          rat: timestamp,
        }
      }
    case LOGIN_FAILED:
      sessionStorage.clear()
      return {
        user: {
          ...state.user,
          ...action.user,
        }
      }

    case SUBMIT_LOGOUT:
      sessionStorage.clear()
      return getInitialState()
    default:
      return state
  }
}

export default login