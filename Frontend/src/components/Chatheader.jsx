import React,{useEffect,useRef} from 'react'
import { usechatstore } from '../store/useChatStore';
import { useauthstore } from '../store/auth.store';
import { X } from 'lucide-react';

function Chatheader() {
  const { selectedUser, setSelectedUser,getMessages ,messages,subscribeToMessages,
    unsubscribeFromMessages,} = usechatstore();
  const { onlineUsers } = useauthstore();
  const messageEndRef = useRef(null);

   useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img className="size-10 rounded-full relative" src={selectedUser.profilePic || "/display-pic (1).png"} alt={selectedUser.fullName} />
            </div>
          </div>

          
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

       
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
}

export default Chatheader
