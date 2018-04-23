import { call, put, takeEvery } from 'redux-saga/effects'
import { SIGNUP_FAILED, SIGNUP_SUBMIT } from './constants'
import APIService from '../../api'
import { SUBMIT_LOGIN } from '../Login/constants'

const postCreationLogin = (username, password) => {
  return {
    type: SUBMIT_LOGIN,
    username,
    password,
  }
}

const signupFailed = (username, msg) => {
  return {
    type: SIGNUP_FAILED,
    username: username,
    msg,
  }
}

function* signupSubmit (action) {
  try {
    const res = yield call(
      APIService.signup,
      action.username,
      action.password,
    )
    const data = yield call([res, res.json])
    if (data.status === 400) {
      throw Error('Invalid credentials')
    }
    yield put(postCreationLogin(
      data.username,
      action.password,
      ))
  } catch (e) {
    yield put(signupFailed(action.username, e.message))
  }
}

function* saga () {
  yield takeEvery(SIGNUP_SUBMIT, signupSubmit)
}

export default saga