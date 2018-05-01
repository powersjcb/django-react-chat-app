import { call, put, take, select } from 'redux-saga/effects'
import {
  getRequest,
  postRequest,
} from './authapi'
import {
  requestFailed,
  refreshStarted,
} from './containers/Login/actions'

import {
  LOGIN_REFRESHED
} from './containers/Login/constants'


export function authenticateRequest(fn) {
  return function* wrapper(...args) {
    try {
      let response = yield call(fn, ...args)
      if (response.status === 401 || response.status === 403) {
        yield put(refreshStarted())
        yield take(LOGIN_REFRESHED)
        // this section feels like it should be refactored
        // passing state into these functions but still calling select() is icky
        // should the effective getState function be passed in instead?
        args[args.length - 1] = yield select()  // last arg is state
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
