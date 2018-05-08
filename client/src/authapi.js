import { select, call } from 'redux-saga/effects'

const defaultHeaders = {
  'Content-Type': 'application/json',
}

export function* postRequest(path, data={}, callState=select) {
  const state = yield callState()
  const headers = {...defaultHeaders}
  console.log('HEADERS:')
  console.log(state)
  if (state && state.login && state.login.user.access) {
    headers['Authorization'] = 'Bearer ' + state.login.user.access
  }
  return yield call(fetch, path, {
    method: 'POST',
    body: JSON.stringify(data),
    timeout: 10,
    headers,
  })
}

function* signup(username, password) {
  return yield call(postRequest,
    '/user/', {username, password}
  )
}

function* token({username, password}) {
  // returns 'access' and 'refresh' token
  const data = {
    username,
    password,
  }
  return yield call(postRequest, '/api/token/', data)
}

function* refresh(refreshToken) {
  // returns 'access' token
  const data = {
    refresh: refreshToken,
  }
  return yield call(postRequest, '/api/token/refresh/', data)
}

export default {
  token,
  refresh,
  signup,
}
