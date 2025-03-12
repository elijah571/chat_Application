import React from 'react'
import MessagesComponents from './MessagesComponents'
import MessageInput from './MessageInput'

const MessageContainer = () => {
    const noChartSelected = true;
  return (
   
    <div className='md:min-w-[450px] flex flex-col'>
       {noChartSelected ? <NoChartSelected/> : (
         <>
         {/* header */}
        <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To:</span>{" "}
            <span className='text-gray-900 font-bold'>John Doe</span>
        </div>
        {/* messages */}
        <MessagesComponents/>
        <MessageInput/>
    </>
       )}
      
    </div>
  )
}
export default MessageContainer
import { TiMessageTyping } from "react-icons/ti";
const NoChartSelected = () => {
    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
                <p>Welcome John Doe</p>
                <p>Select a chat to start messaging</p>
                <TiMessageTyping className='text-3xl md:text-6xl text-center'/>
            </div>
        </div>
    )
}