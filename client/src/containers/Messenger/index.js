import React from 'react'
import { Flex, Box } from 'rebass'
import MessageList from './messagelist'
import ChannelList from './../Channel/index'
import MessageForm from './messageform'

const Messenger = () => (
  <Flex>
    <ChannelList width={1/5} />
    <Box>
      <MessageList />
      <MessageForm />
    </Box>
  </Flex>
)

export default Messenger
