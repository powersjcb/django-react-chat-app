import { call, put, takeEvery, select } from 'redux-saga/effects'
import AuthAPIService from '../../authapi'
import {
  SUBMIT_LOGIN,
  LOGIN_REFRESH_ACCESS,
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
     state.login.refresh,
   )
   const user = yield call([res, 'json'])
   yield put(refreshSuccess(user))
 } catch (error) {
   yield put(refreshFail(error)) // should redirect to root
 }
}

function* saga () {
  return yield [
    takeEvery(SUBMIT_LOGIN, createToken),
    takeEvery(LOGIN_REFRESH_ACCESS, refreshToken)
  ]
}

export default saga
