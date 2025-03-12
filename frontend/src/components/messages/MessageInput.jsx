import React from 'react'
import { IoIosSend } from "react-icons/io";
const MessageInput = () => {
  return (
    <div>
      <form action="" className='border text-sm rounded-lg block w-full p-2.5 bg-gray-600 text-white'>
        <div className='w-full relative'>
            <input 
                type="text"
                placeholder='sende message'
                className='border-text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white'
             />
             <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
             <IoIosSend className='text-white'/>

             </button>
        </div>
      </form>
    </div>
  )
}

export default MessageInput
