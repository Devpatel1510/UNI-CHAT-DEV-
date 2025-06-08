import React from 'react'
import { Link } from "react-router-dom";
import { useauthstore } from '../store/auth.store';

function Nav() {
  const { logout , authUser} = useauthstore();
  return (
    <div>
      <header className="flex items-center justify-between bg-purple-400 px-4 py-3">
          <div>
            <button >
            <img
              alt="Cartoon avatar of a smiling person with blue hair on a blue circular background"
              className="w-10 h-10 rounded-full"
              height="40"
              width="40"
              src={authUser?.profilePic}
            /></button>
          </div>
          <nav className="flex space-x-8 font-bold text-black text-lg">
            <Link to="/ "className="px-3 py-1 rounded hover:bg-purple-700 hover:text-white transition-colors duration-300 cursor-pointer" >
              HOME
            </Link>
            <Link className="px-3 py-1 rounded hover:bg-purple-700 hover:text-white transition-colors duration-300 cursor-pointer" >
              CHATS
            </Link>
            <Link to="/profile" className="px-3 py-1 rounded hover:bg-purple-700 hover:text-white transition-colors duration-300 cursor-pointer" >
              PROFILE
            </Link>
          </nav>
          <div>
            <img src="/logout.png"
            className="w-8 h-8 cursor-pointer"
            onClick={logout} />
          </div>
        </header>
    </div>
  )
}

export default Nav;
