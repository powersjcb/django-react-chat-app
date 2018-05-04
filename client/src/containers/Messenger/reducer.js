import {
  MESSAGES_RECIEVED,
  MESSAGES_PERSISTED,
  MESSAGES_SEND_NEW,
} from './constants'

const initialState = {
  messages: []
}

const uniqueByField = (list, field) => {
  const seen = {}
  return list.filter((a) => {
    const seen_yet = a.hasOwnProperty(field) && seen[a[field]]
    if (a.hasOwnProperty(field)) {
      seen[a[field]] = true
    }
    return !seen_yet
  })
}

const combineMessageLists = (a, b) => {
  const combinedSorted = a.map((o) => {
    return {...o}
  }).concat(
    b.map((o) => {
      return {...o}
    })
  ).sort((a, b) => {
    return a.createdAt > b.createdAt
  })
  return uniqueByField(combinedSorted, 'nonce')
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
          [action.message]
        )
      }
    default:
      return state
  }
}

export default reducer