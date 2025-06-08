import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useauthstore } from '../store/auth.store';
import { Loader2 } from 'lucide-react';

function Login() {

  const [formdata,setformdata] = useState({
    email : "",
    password : "",
  });

  const {login,isLoginin} = useauthstore();

  const handlesubmit = (e) => {
    e.preventDefault();

    login(formdata);
  }
  return (
    
  
  
    <div className="min-h-screen flex flex-col md:flex-row">
      
      <div className="bg-purple-400 flex flex-col items-center justify-center w-full md:w-1/2 min-h-screen p-8">
        <h1 className="font-pacifico text-black text-6xl mb-12 select-none">
          Login
        </h1>
        <form onSubmit={handlesubmit} className="w-64 flex flex-col gap-6">
          <label htmlFor="email" className="font-bold text-black w-full text-center">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={formdata.email}
            onChange={(e)=>setformdata({...formdata,email : e.target.value})}
            className="rounded-lg py-2 px-4 bg-white text-black text-lg focus:outline-none"
          />
          <label
            htmlFor="password"
            className="font-bold text-black w-full text-center"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            className="rounded-lg py-2 px-4 bg-white text-black text-lg focus:outline-none"
            value={formdata.password}
            onChange={(e)=>setformdata({...formdata,password : e.target.value})}
          />
          
          <button
            type="submit"
            className="bg-gray-500 text-white rounded-full py-2 px-8 mt-2 cursor-pointer select-none hover:bg-gray-700 transition-colors duration-300"
          >
             {isLoginin ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "login"
              )}
          </button>
          <Link className="text-black mt-6 select-none text-center" to="/signup">Create an Account</Link>

          
        </form>
      </div>

      
      <div className="flex flex-col items-center justify-center w-full md:w-1/2  bg-white relative">
        <h2 className="font-black text-4xl mb-6 select-none">
          UNI CHAT
        </h2>
        <div className="relative">
          <img
            alt="Front view of a modern smartphone with a notch at the top, white screen"
            className="mx-auto "
            height="600"
            width="max"
            src="/mobile.png"
            draggable="false"
          />
        </div>
      </div>
    </div>
  )
}

export default Login
