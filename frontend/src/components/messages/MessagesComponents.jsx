import React, { useEffect, useRef } from 'react';
import Message from '../Message';
import { useGetMessages } from '../../hooks/useGetMessages';
import MessageSkeleton from '../skeleton/MessageSkeleton';

const MessagesComponents = () => {
  const { messages, loading } = useGetMessages();
  let lastMessageRef =useRef()
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({behavior: "smooth"}

      )
    }, 1000)
  })
  return (
    <div className='px-4 flex-1 overflow-auto h-full max-h-[500px]'>
      {/* Show skeleton loaders while loading */}
      {loading && [...Array(3)].map((_, index) => <MessageSkeleton key={index} />)}

      {/* Show messages if available */}
      {!loading && messages.length > 0 && messages.map((message) => (
        <Message key={message._id} message={message} ref={lastMessageRef} />
      ))}

      {/* Show empty state if there are no messages */}
      {!loading && messages.length === 0 && (
        <p className='text-center'>Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default MessagesComponents;
