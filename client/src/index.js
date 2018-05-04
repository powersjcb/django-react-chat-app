import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { fork } from 'redux-saga/effects'
import createHistory from 'history/createBrowserHistory'
import { routerReducer, routerMiddleware } from 'react-router-redux'

import registerServiceWorker from './registerServiceWorker';
import './index.css';
import applicationReducers from './reducer.js';
import loginSaga from './containers/Login/saga.js'
import signupSaga from './containers/Signup/saga.js'
import messengerSaga from './containers/Messenger/saga.js'
import App from './App';

const history = createHistory()
const sagaMiddleware = createSagaMiddleware()

const loggingMiddleware = store => next => action => {
  console.log(action)
  next(action)
  console.log(store.getState())
}

const store = createStore(
  combineReducers({
    ...applicationReducers,
    router: routerReducer,
  }),
  applyMiddleware(
    loggingMiddleware,
    sagaMiddleware,
    routerMiddleware(history),
  )
)

const sagas = function* () {
  yield [
    signupSaga,
    loginSaga,
    messengerSaga,
  ].map(s => fork(s))
}

sagaMiddleware.run(sagas)

ReactDOM.render(
  (
    <Provider store={store}>
      <App history={history}/>
    </Provider>
  ),
  document.getElementById('root'));
registerServiceWorker();
