import { call, put, takeEvery, select } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import AuthAPIService from '../../authapi'
import {
  SUBMIT_LOGIN,
  LOGIN_REFRESH_ACCESS,
  LOGIN_FAILED,
} from './constants'
import {
  loginFailed,
  loginSuccess,
  refreshSuccess,
  refreshFail,
} from './actions'

function* createToken(action) {
  try {
    const user = yield call([yield call(
      AuthAPIService.token,
      action.user,
    ), 'json'])
    yield put(loginSuccess(user))
  } catch (error) {
    yield put(loginFailed(action.user, error))
  }
}

export function* refreshToken() {
 try {
   const state = yield select()
   const res = yield call(
     AuthAPIService.refresh,
     state.login.user.refresh,
   )
   const user = yield call([res, 'json'])
   yield put(refreshSuccess(user))
 } catch (error) {
   yield put(refreshFail(error)) // should redirect to root
 }
}

function* redirectToLogin() {
  yield put(push, '/')
}

function* saga () {
  return yield [
    takeEvery(SUBMIT_LOGIN, createToken),
    takeEvery(LOGIN_REFRESH_ACCESS, refreshToken),
    takeEvery(LOGIN_FAILED, redirectToLogin),
  ]
}

export default saga
