import {
  MESSAGES_FETCH,
  MESSAGES_RECIEVED,
  MESSAGES_PERSISTED,
  MESSAGES_SEND_NEW,
  MESSAGES_SEND_FAILED,
  MESSAGES_FETCH_FAILED,
} from './constants'
import {
  call,
  put,
  takeLatest,
  takeEvery,
  select,
} from 'redux-saga/effects'
import APIService from '../../api'

const addNewMessages = (messages) => {
  return {
    type: MESSAGES_RECIEVED,
    messages: messages,
  }
}

const persistedMessage = (message) => {
  return {
    type: MESSAGES_PERSISTED,
    message,
  }
}

const messageSendFailed = (details) => {
  return {
    type: MESSAGES_SEND_FAILED,
    details,
  }
}

const messageLoadFailed = (details) => {
  return {
    type: MESSAGES_FETCH_FAILED,
    details,
  }
}

function* propagateNewMessage(action) {
  const state = yield select()
  const res = yield call(
    APIService.sendMessage,
    action.message, state
  )
  const data = yield call([res, res.json])
  if (res.status !== 201) {
    yield put(messageSendFailed(data))
  } else {
    yield put(persistedMessage(data))
  }
}

function* loadMessages() {
  const state = yield select()
  const res = yield call(APIService.getMessages, state)
  const data = yield call([res, res.json])
  if (res.status !== 200) {
    yield put(messageLoadFailed(data))
  } else {
    yield put(addNewMessages(data))
  }

}

export default function* saga () {
  yield takeEvery(MESSAGES_SEND_NEW, propagateNewMessage)
  yield takeLatest(MESSAGES_FETCH, loadMessages)
}