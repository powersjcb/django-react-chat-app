import React from 'react'
import {
  Route,
} from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { Provider as RebassThemeProvider } from 'rebass'
import './App.css'
import Login from './containers/Login/index'
import Logout from './containers/Login/logout'
import Signup from './containers/Signup/index'
import Messenger from './containers/Messenger/index'
import RootNav from './components/Navbar'

const App = ({ history }) => (
  <RebassThemeProvider>
    <div className="App">
      <header className="App-header">
        <ConnectedRouter history={history}>
          <div>
            <RootNav />
            <Route exact path="/" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route path="/logout" component={Logout} />
            <Route path="/messenger/" component={Messenger} />
          </div>
        </ConnectedRouter>

      </header>
    </div>
  </RebassThemeProvider>
)

export default App
