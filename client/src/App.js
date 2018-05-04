import React from 'react'
import {
  Route,
  Link
} from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import logo from './logo.svg'
import './App.css'
import Login from './containers/Login/index'
import Signup from './containers/Signup/index'
import Messenger from './containers/Messenger/index'

const App = ({ history }) => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <ConnectedRouter history={history}>
        <div>
          <Link to="/messenger/">Messenger</Link>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/messenger/" component={Messenger} />
        </div>
      </ConnectedRouter>
    </header>
  </div>
)

export default App;
