import moment from 'moment'
import {
  MESSAGES_RECIEVED,
  MESSAGES_PERSISTED,
  MESSAGES_SEND_NEW,
} from './constants'

const initialState = {
  messages: []
}

const combineMessageLists = (old, fresh) => {
  const freshMessageKeys = fresh.reduce((a, f) => {
    return a.add(f.nonce)
  }, new Set())
  return old.filter(o => {
    return !freshMessageKeys.has(o.nonce)
  }).concat(fresh).sort()
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGES_RECIEVED:
      return {
        messages: combineMessageLists(
          state.messages,
          action.messages
        ),
      }
    case MESSAGES_SEND_NEW:
      return {
        messages: combineMessageLists(
          state.messages,
          [action.message]
        ),
      }
    case MESSAGES_PERSISTED:
      return {
        messages: combineMessageLists(
          state.messages,
          [{
            ...action.message,
            isPersisted: true
          }]
        )
      }
    default:
      return state
  }
}

export default reducer