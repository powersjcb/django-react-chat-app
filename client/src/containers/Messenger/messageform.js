import React from 'react'
import { connect } from 'react-redux'
import MessageInput from '../../components/MessageInput/index'
import { MESSAGES_SEND_NEW } from './constants'
import uuidv4 from 'uuid/v4'
import { utcTimestamp } from '../../lib/utils'

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
        id: Date.now().toString(), // placeholder until real id comes back
        nonce: uuidv4(),
        user_id: this.props.currentUser.id,
        createdAt: utcTimestamp(),
        isPersisted: false,
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

const mapStateToProps = (state) => {
  return {
    currentUser: state.login.user,
  }
}

export default connect(
  mapStateToProps,
  null,
)(MessageForm)
