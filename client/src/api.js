const defaultHeaders = {
  'Content-Type': 'application/json',
}

async function getRequest(path) {
  return await fetch(path, {
    method: 'GET',
    headers: defaultHeaders,
    timeout: 10,
  })
}

async function postRequest(path, data={}) {
  return await fetch(path, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: defaultHeaders,
    timeout: 10,
  })
}

async function signup(username, password) {
  return await postRequest(
    '/user/', {username, password}
  )
}

async function login(username, password) {
  return await postRequest(
    '/api-token-auth/', {username, password}
  )
}

export default {
  getRequest,
  login,
  signup,
  postRequest,
}
