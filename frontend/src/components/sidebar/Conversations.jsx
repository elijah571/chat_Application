import React from "react";
import Conversation from "../Conversation";
import { useGetConversation } from "../../hooks/useGetConversation";

const Conversations = () => {
  const { loading, conversations } = useGetConversation();

  console.log("CONVERSATION:", conversations);

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {loading && <span className="loading loading-spinner"></span>}

      {conversations.map((conversation, i) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIdex={i === conversations.length - 1}
        />
      ))}

      {conversations.length === 0 && !loading && (
        <p className="text-center text-gray-500">No conversations found.</p>
      )}
    </div>
  );
};

export default Conversations;
