import React from 'react';
import Message from '../Message';
import { useGetMessages } from '../../hooks/useGetMessages';
import MessageSkeleton from '../skeleton/MessageSkeleton';

const MessagesComponents = () => {
  const { messages, loading } = useGetMessages();
  console.log('MESSAGES:', messages);

  return (
    <div className='px-4 flex-1 overflow-auto h-full max-h-[500px]'>
      {/* Show skeleton loaders while loading */}
      {loading && [...Array(3)].map((_, index) => <MessageSkeleton key={index} />)}

      {/* Show messages if available */}
      {!loading && messages.length > 0 && messages.map((message) => (
        <Message key={message._id} message={message} />
      ))}

      {/* Show empty state if there are no messages */}
      {!loading && messages.length === 0 && (
        <p className='text-center'>Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default MessagesComponents;
