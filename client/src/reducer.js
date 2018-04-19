import { combineReducers } from 'redux'
import login from './containers/Login/reducer'

const app = (state = {}, action) => {
  return state
}

const globalReducer = combineReducers({
    app,
    login
  }
)

export default globalReducer