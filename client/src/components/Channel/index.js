import React from "react"
import PropTypes from "prop-types"
import { Box } from "rebass"
import ChannelItem from "./item"


const ChannelIndex = ({channels, width}) => (
  <Box width={width}>
    CHANNELS
    {channels.map((c) => (
      <ChannelItem
        name={c.name}
        id={c.id}
      />
    ))}
  </Box>
)

ChannelIndex.propTypes = {
  channels: PropTypes.arrayOf(
    PropTypes.object
  ),
  width: PropTypes.number,
}

export default ChannelIndex

