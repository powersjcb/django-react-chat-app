import { call, put } from 'redux-saga/effects'
import {
  getRequest,
  postRequest,
} from './authapi'
import {
  requestFailed,
  refreshStarted,
} from './containers/Login/actions'
import {
  refreshToken,
} from './containers/Login/saga'


export function authenticateRequest(fn) {
  return function* wrapper(...args) {
    try {
      let response = yield call(fn, ...args)
      if (response.status === 401 || response.status === 403) {
        yield put(refreshStarted())
        yield call(refreshToken)
        response = yield call(fn, ...args)
      }
      return response
    } catch (error) {
      yield put(requestFailed(error))
    }
  }
}


async function getMessages(state) {
  return await getRequest('/message/', state)
}

async function sendMessage(message, state) {
  return await postRequest(
    '/message/',
    message,
    state,
  )
}

export default {
  getMessages: authenticateRequest(getMessages),
  sendMessage: authenticateRequest(sendMessage),
}
