import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import createSagaMiddleware from 'redux-saga'

import registerServiceWorker from './registerServiceWorker'
import './index.css'
import App from './App'
import createApplicationStore from './store'
import sagas from './saga'

const history = createHistory()

const sagaMiddleware = createSagaMiddleware()

const store = createApplicationStore(history, sagaMiddleware)

sagaMiddleware.run(sagas)

ReactDOM.render(
  (
    <Provider store={store}>
      <App history={history}/>
    </Provider>
  ),
  document.getElementById('root'));
registerServiceWorker();