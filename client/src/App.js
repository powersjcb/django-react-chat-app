import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import logo from './logo.svg'
import './App.css'
import Login from './containers/Login/index'
import Signup from './containers/Signup/index'
import Messenger from './containers/Messenger/index'

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <Router>
        <div>
          <Link to="/messenger/">Messenger</Link>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/messenger/" component={Messenger} />
        </div>
      </Router>
    </header>
  </div>
)

export default App;
