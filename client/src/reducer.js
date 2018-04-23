import { combineReducers } from 'redux'
import login from './containers/Login/reducer'
import signup from './containers/Signup/reducer'

const app = (state = {}, action) => {
  return state
}

const globalReducer = combineReducers({
    app,
    login,
    signup,
  }
)

export default globalReducer