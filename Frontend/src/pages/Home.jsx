import React from 'react'
import Nav from '../components/Nav';
import Sidebar from '../components/sidebar';
import { usechatstore } from '../store/useChatStore';
import ChatContainer from '../components/ChatContainer';
import NoChatSelected from '../components/NoChatSelected';

function Home() {

   const {selectedUser} = usechatstore();
   
  return (

   
     
      
        <div className="overflow-hidden h-[91vh] bg-base-100 bg-[url('/illustrationjpg.jpg')] bg-cover bg-center">
      <div className="flex items-center justify-center pt-5 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
        
      
    
  )
}

export default Home
