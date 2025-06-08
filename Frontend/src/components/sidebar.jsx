import { useEffect, useState } from 'react';
import { Users } from "lucide-react";
import { usechatstore } from '../store/useChatStore';
import { useauthstore } from '../store/auth.store';

function Sidebar() {
  const {
    users,
    selectedUser,
    getUser,
    setSelectedUser,

  } = usechatstore();
  const { onlineUsers = [] } = useauthstore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  const filteredUsers = showOnlineOnly
    ? users.filter(user => onlineUsers.includes(user._id))
    : users;


  const currentUser = useauthstore(state => state.user);
  const onlineCount = onlineUsers.filter(id => id !== currentUser?._id).length;

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <aside className="bg-gray-600 min-w-[250px] w-[20vw] max-w-[300px] flex flex-col items-center justify-start">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            <span className="ml-2 text-sm font-medium">Online only</span>
          </label>
          <span className="text-xs text-zinc-500">
            ({onlineCount} online{currentUser ? ' (excluding you)' : ''})
          </span>
        </div>
      </div>

      {filteredUsers.map((user) => (
        <button
          key={user._id}
          type="button"
          onClick={() => setSelectedUser(user)}
          className={`w-full p-3 flex items-center gap-3 transition-colors rounded-md
            hover:bg-gray-500 
            ${selectedUser?._id === user._id ? "bg-gray-700 ring-2 ring-gray-400" : ""}
          `}
          aria-label={`Chat with ${user.fullName}`}
        >
          <div className="relative mx-auto lg:mx-0">
            <img
              src={user.profilePic || "/display-pic (1).png"}
              alt={user.fullName}
              className="size-12 object-cover rounded-full"
              onError={(e) => {
                e.target.src = "/display-pic (1).png";
              }}
            />
            {onlineUsers.includes(user._id) && (
              <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
            )}
          </div>

          <div className="hidden lg:block text-left min-w-0">
            <div className="font-medium truncate">{user.fullName}</div>
            <div className="text-sm text-zinc-400">
              {onlineUsers.includes(user._id) ? "Online" : "Offline"}
            </div>
          </div>
        </button>
      ))}
    </aside>
  );
}

export default Sidebar;