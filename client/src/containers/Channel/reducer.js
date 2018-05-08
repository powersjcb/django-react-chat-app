const initialState = {
  channels: [],
  currentChannel: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_CHANNEL_SUBMIT":
      return state // maybe update that we are creating one
    case "CREATE_CHANNEL_SUCCESS":
      return {
        ...state,
        channels: state.channels + action.channel,
        currentChannel: action.channel.id,
      }
    case "FETCHED_CHANNELS":
      return {
        ...state,
        channels: action.channels,
      }
    default:
      return state
  }
}

export default reducer