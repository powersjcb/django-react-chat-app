import React from 'react'
import { connect } from 'react-redux'
import MessageInput from '../../components/MessageInput/index'
import { MESSAGES_SEND_NEW } from './constants'
import uuidv4 from 'uuid/v4'

class MessageForm extends React.Component {
  constructor(props) {
    super(props)
    this.defaultState = {
      messageInput: '',
    }
    this.state = this.defaultState
  }

  handleChange(event) {
    this.setState({
      messageInput: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.dispatch({
      type: MESSAGES_SEND_NEW,
      message: {
        text: this.state.messageInput,
        id: Date.now(), // placeholder until real id comes back
        nonce: uuidv4(),
      }
    })
    this.setState(this.defaultState)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <MessageInput
            controlFunc={this.handleChange.bind(this)}
            content={this.state.messageInput}
          />
        </form>
      </div>
    )
  }
}

export default connect(
  null,
  null
)(MessageForm)
