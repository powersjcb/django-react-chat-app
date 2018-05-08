import React from 'react'
import { Container } from 'rebass'
import MessageList from './messagelist'
import ChannelList from './../Channel/index'
import MessageForm from './messageform'


const Messenger = () => (
  <Container width={9/10} height={1} m="auto">
    <ChannelList width={1/5} />
    <MessageList />
    <MessageForm />
  </Container>
)

export default Messenger
