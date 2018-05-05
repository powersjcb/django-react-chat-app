const defaultHeaders = {
  'Content-Type': 'application/json',
}

export async function getRequest(path, state={}) {
  const headers = {...defaultHeaders}
  if (state && state.login && state.login.access) {
    headers['Authorization'] = 'Bearer ' + state.login.access
  }
  return await fetch(path, {
    method: 'GET',
    headers: headers,
    timeout: 10,
  })
}

export async function postRequest(path, data={}, state={}) {
  const headers = {...defaultHeaders}
  if (state && state.login && state.login.user.access) {
    headers['Authorization'] = 'Bearer ' + state.login.user.access
  }
  return await fetch(path, {
    method: 'POST',
    body: JSON.stringify(data),
    timeout: 10,
    headers,
  })
}

async function signup(username, password) {
  return await postRequest(
    '/user/', {username, password}
  )
}

async function token({username, password}) {
  // returns 'access' and 'refresh' token
  const data = {
    username,
    password,
  }
  return await postRequest('/api/token/', data)
}

async function refresh(refreshToken) {
  // returns 'access' token
  const data = {
    refresh: refreshToken,
  }
  return await postRequest('/api/token/refresh/', data)
}

export default {
  token,
  refresh,
  signup,
}
