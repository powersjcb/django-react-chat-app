import { SIGNUP_SUBMIT } from './constants'

const initialState = {
  username: '',
  password: '',
}

const createAccount = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUBMIT:
      return {
        ...state,
        username: action.username,
        password: action.password,
      }
    default:
      return state
  }
}

export default createAccount