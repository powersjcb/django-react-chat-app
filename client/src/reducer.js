import { combineReducers } from 'redux'
import login from './containers/Login/reducer'
import signup from './containers/Signup/reducer'
import messenger from './containers/Messenger/reducer'

const app = (state = {}, action) => {
  return state
}

const applicationReducers = {
  app,
  login,
  signup,
  messenger,
}

export default applicationReducers