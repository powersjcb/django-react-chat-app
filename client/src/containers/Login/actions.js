import {
  LOGIN_FAILED,
  LOGIN_REFRESH_ACCESS,
  LOGIN_REFRESHED,
  LOGIN_SUCCEEDED,
  REQUEST_FAILED,
} from './constants'


export const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCEEDED,
    user,
  }
}

export const loginFailed = (username, error) => {
  return {
    type: LOGIN_FAILED,
    username: username,
    error,
  }
}

export const refreshStarted = () => {
  return {
    type: LOGIN_REFRESH_ACCESS,
  }
}

export const refreshSuccess = (user) => {
  return {
    type: LOGIN_REFRESHED,
    user,
  }
}

export const refreshFail = (error) => {
  return {
    type: LOGIN_FAILED,
    error,
  }
}

export const requestFailed = (error) => {
  return {
    type: REQUEST_FAILED,
    error,
  }
}