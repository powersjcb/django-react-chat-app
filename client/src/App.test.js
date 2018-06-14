import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import createMemoryHistory from 'history/createMemoryHistory'
import App from './App';
import createApplicationStore from './store';
import sagas from './saga'


import createSagaMiddleware from 'redux-saga'

it('renders without crashing', () => {
  const div = document.createElement('div');
  const history = createMemoryHistory()
  const sagaMiddleware = createSagaMiddleware()
  const store = createApplicationStore(history, sagaMiddleware)
  sagaMiddleware.run(sagas)
  ReactDOM.render(
    <Provider store={store}>
      <App history={history}/>
    </Provider>,
    div);
  ReactDOM.unmountComponentAtNode(div);
});
