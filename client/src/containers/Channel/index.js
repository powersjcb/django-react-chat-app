import React from "react"
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import ChannelIndex from "../../components/Channel/index"

class ChannelIndexContainer extends React.Component {

  componentDidMount() {
    this.props.dispatch({type: 'FETCH_CHANNELS'})
  }

  render() {
    return (
      <ChannelIndex
        channels={this.props.channels}
        width={this.props.width}
      />
    )
  }
}

ChannelIndexContainer.propTypes = {
  channels: PropTypes.arrayOf(PropTypes.object),
  width: PropTypes.number,
}


const mapStateToProps = (state) => {
  return {
    channels: state.channel.channels,
  }
}

export default connect(mapStateToProps, null)(ChannelIndexContainer)
