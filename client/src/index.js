import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import globalReducer from './reducer.js';
import registerServiceWorker from './registerServiceWorker';


const loggingMiddleware = store => next => action => {
  console.log(action)
  next(action)
  console.log(store.getState())
}

const store = createStore(
  globalReducer,
  applyMiddleware(
    loggingMiddleware
  )
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
