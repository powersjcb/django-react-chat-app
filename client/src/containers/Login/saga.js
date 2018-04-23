import { call, put, takeEvery } from 'redux-saga/effects'
import APIService from '../../api'
import {
  SUBMIT_LOGIN,
  LOGIN_FAILED,
  LOGIN_SUCCEEDED
} from './constants'

const loginUserAction = (username, token) => {
  return {
    type: LOGIN_SUCCEEDED,
    username: username,
    token: token,
  }
}

const loginFailed = (username, msg) => {
  return {
    type: LOGIN_FAILED,
    username: username,
    msg,
  }
}

export function* loginSubmit (action) {
  try {
    const res = yield call(
      APIService.login,
      action.username,
      action.password,
    )
    const data = yield call([res, 'json'])
    if (res.status === 400) {
      // invalid login
      // TODO: update error fields
      throw new Error('Invalid login')
    } else {
      // valid login
      yield put(loginUserAction(action.username, data.token))
    }

  } catch (e) {
    yield put(loginFailed(action.username, e.message))
  }
}

function* saga () {
  yield takeEvery(SUBMIT_LOGIN, loginSubmit)
}

export default saga
