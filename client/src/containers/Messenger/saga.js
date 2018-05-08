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
  const query = `mutation ($text: String!, $nonce: String!) {
    createMessage (text: $text, nonce: $nonce) {
      id
      nonce
      text
      createdAt
    } 
  }`
  const variables = {
    text: action.message.text,
    nonce: action.message.nonce,
   }
  const res = yield call(APIService.graphqlRequest, query, variables)
  const data = yield call([res, res.json])
  if (res.status !== 200 || data.data.errors) {
    yield put(messageSendFailed(data))
  } else {
    yield put(persistedMessage(data.data.createMessage))
  }
}

function* loadMessages() {
  const query = `query {
    messages {
      id
      nonce
      text
      createdAt
    }
    
  }`
  const variables = {}
  const res = yield call(APIService.graphqlRequest, query, variables)
  const data = yield call([res, res.json])
  if (res.status !== 200) {
    yield put(messageLoadFailed(data))
  } else {
    yield put(addNewMessages(data.data.messages))
  }

}

export default function* saga () {
  yield takeEvery(MESSAGES_SEND_NEW, propagateNewMessage)
  yield takeLatest(MESSAGES_FETCH, loadMessages)
}