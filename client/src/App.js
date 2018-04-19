import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './containers/Login/index';

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
      <Login />
    </header>
  </div>
)

export default App;
