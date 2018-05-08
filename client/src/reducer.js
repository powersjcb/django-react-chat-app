import login from './containers/Login/reducer'
import signup from './containers/Signup/reducer'
import messenger from './containers/Messenger/reducer'
import channel from './containers/Channel/reducer'
const app = (state = {}) => {
  return state
}

const applicationReducers = {
  app,
  login,
  signup,
  channel,
  messenger,
}

export default applicationReducers