import { call, put, take } from 'redux-saga/effects'
import {
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
        response = yield call(fn, ...args)
      }
      return response
    } catch (error) {
      yield put(requestFailed(error))
    }
  }
}

function* graphqlRequest(query, variables) {
  return yield call(postRequest, '/graphql/', {query, variables})
}

function* sendMessage(message) {
  return yield call(postRequest,
    '/message/',
    message,
  )
}

export default {
  graphqlRequest: authenticateRequest(graphqlRequest),
  sendMessage: authenticateRequest(sendMessage),
}
