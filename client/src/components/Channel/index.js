import React from "react"
import ChannelItem from "./item"


export default ({channels}) => (
  <div>
    {channels.map((c) => (
      <ChannelItem
        name={c.name}
        id={c.id}
      />
    ))}
  </div>
)

