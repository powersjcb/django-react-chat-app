import { applyMiddleware, combineReducers, createStore } from 'redux'
import { routerMiddleware, routerReducer } from 'react-router-redux'
import applicationReducers from './reducer'


const loggingMiddleware = store => next => action => {
  console.log(action)
  next(action)
  console.log(store.getState())
}

const createApplicationStore = (history, sagaMiddleware) => {
  return createStore(
    combineReducers({
      ...applicationReducers,
      router: routerReducer,
    }),
    applyMiddleware(
      loggingMiddleware,
      sagaMiddleware,
      routerMiddleware(history),
    ),
  )
}

export default createApplicationStore