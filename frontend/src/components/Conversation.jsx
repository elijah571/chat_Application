import React from 'react';
import useConversation from '../zustand/useConversation';

const Conversation = ({ conversation, lastIndex }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;

  const handleClick = () => {
    setSelectedConversation(conversation);
  };

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
          isSelected ? 'bg-sky-500' : ''
        }`}
        onClick={handleClick}
      >
        <div className="avatar avatar-online">
          <div className="w-12 rounded-full">
            <img src={conversation.profle}  />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p>{conversation.fullName}</p>
          </div>
        </div>
      </div>
      {!lastIndex && <div className="divider py-0 my-0 h-1"></div>}
    </>
  );
};

export default Conversation;
