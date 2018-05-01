import React from 'react'
import PropTypes from 'prop-types'

// controlled form field
const MessageInput = ({ controlFunc, content }) => {
  return (
    <input
      type="text"
      onChange={controlFunc}
      value={content}
    />
  )
}

MessageInput.propTypes = {
  controlFunc: PropTypes.func,
  content: PropTypes.string,
}

export default MessageInput