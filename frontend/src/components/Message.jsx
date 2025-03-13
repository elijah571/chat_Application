import React from "react";
import { useAuthContext } from "../context/AuthContext";
import useConversation from "../zustand/useConversation";
import { extractTime } from "../pages/utils/formatedTime";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();


  // Check if message is a string or an object and structure it accordingly
  const structuredMessage = typeof message === "string" ? { text: message } : message;
  console.log("Structured Message:", structuredMessage);

  // Now we can safely access authUser._id
  const fromMe = structuredMessage?.senderId === authUser.user._id;
 
  // Get profile picture (either from the authenticated user or the selected conversation)
  const profilePic = fromMe ? authUser.user.profile : selectedConversation?.profle || "default-avatar-url";  // 

  const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-gray-500";

  // Set alignment of the chat bubble (right if it's from the current user, left if from the other user)
  const chatClassName = fromMe ? "justify-end" : "justify-start";
const timeFormat =  extractTime(structuredMessage.createdAt)
  return (
    <div className={`flex ${chatClassName} mb-4`}>
      <div className="chat-image avatar mr-2">
        <div className="w-10 h-10 rounded-full">
          <img alt="Profile" src={profilePic} />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="chat-header text-sm">
          {fromMe ? authUser.user.fullName : selectedConversation?.userName}
          <time className="text-xs opacity-50 ml-2">{timeFormat}</time> {/* You can format the timestamp as needed */}
        </div>
        <div className={`chat-bubble ${bubbleBgColor} text-white p-2 rounded-lg`}>
          {structuredMessage?.message}
        </div>
        <div className="chat-footer opacity-50 text-xs">
          {structuredMessage?.status}
        </div>
      </div>
    </div>
  );
};

export default Message;
