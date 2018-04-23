import React from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import logo from './logo.svg'
import './App.css'
import Login from './containers/Login/index'
import Signup from './containers/Signup/index'

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </div>
      </Router>
    </header>
  </div>
)

export default App;
