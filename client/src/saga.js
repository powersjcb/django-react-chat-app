import signupSaga from './containers/Signup/saga'
import loginSaga from './containers/Login/saga'
import messengerSaga from './containers/Messenger/saga'
import { fork } from 'redux-saga/effects'

const sagas = function * () {
  yield [
    signupSaga,
    loginSaga,
    messengerSaga,
  ].map(s => fork(s))
}

export default sagas