import { connect } from 'react-redux'
import React from 'react'
import Message from '../../components/Message/index'
import { MESSAGES_FETCH } from './constants'

// action function
const fetchMessages = () => {
  return {
    type: MESSAGES_FETCH
  }
}

class MessageList extends React.Component {
  componentDidMount () {
    this.props.actions.load()
  }
  render() {
    const messages = this.props.messages
    return (
      <div>
        {messages.map(m => {
          return (
            <Message
              key={m.id}
              text={m.text}
            />
          );
        })}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messenger.messages,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      load: () => dispatch(fetchMessages())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessageList)