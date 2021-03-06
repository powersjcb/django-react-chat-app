import { call, put, takeEvery, select } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import AuthAPIService from '../../authapi'
import {
  SUBMIT_LOGIN,
  LOGIN_REFRESH_ACCESS,
  LOGIN_REFRESH_STARTED,
} from './constants'
import {
  loginFailed,
  loginSuccess,
  refreshSuccess,
  refreshFail,
  attemptLogout,
} from './actions'

function* createToken(action) {
  try {
    const response = yield call(
      AuthAPIService.token,
      action.user,
    )
    const user = yield call([response, 'json'])
    if (response.status !== 200) {
      throw Error(JSON.stringify(user))
    }
    yield put(loginSuccess(user))
  } catch (error) {
    yield put(loginFailed(action.user, error.message))
  }
}

export function* refreshToken() {
 try {
   const state = yield select()
   const response = yield call(
     AuthAPIService.refresh,
     state.login.user.refresh,
   )
   const user = yield call([response, 'json'])
   if ([400, 401, 403].some(code => response.status === code)) {
     yield put(refreshFail(user.message))
     yield put(attemptLogout())
     yield put(push('/'))
   }
   yield put(refreshSuccess(user))
 } catch (error) {
   yield put(refreshFail(error)) // should redirect to root
 }
}

function* saga () {
  return yield [
    takeEvery(SUBMIT_LOGIN, createToken),
    takeEvery(LOGIN_REFRESH_ACCESS, refreshToken),
  ]
}

export default saga
