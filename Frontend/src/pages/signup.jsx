import React, { useState } from 'react';
import './signup.css'; 
import { Link } from 'react-router';
import { useauthstore } from '../store/auth.store';
import toast from "react-hot-toast"

function Signup() {
  const [formdata,setformdata] = useState ({
    fullName:"",
    email:"",
    password:"",
  });

  const validateForm = () => {
    if (!formdata.fullName.trim()) return toast.error("Full name is required");
    if (!formdata.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formdata.email)) return toast.error("Invalid email format");
    if (!formdata.password) return toast.error("Password is required");
    if (formdata.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

   

   const { signup , isSigningUp } = useauthstore();

 

  

    

  const handlesubmit = (e) => {
   e.preventDefault();
   const success = validateForm();

    if (success === true) signup(formdata);
  }
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      
      <div className="bg-purple-400 flex flex-col items-center justify-center w-full md:w-1/2 p-8">
        <h1 className="font-pacifico text-black text-6xl mb-8 select-none">
          Sign Up
        </h1>
        <form onSubmit= {handlesubmit} className="w-64 flex flex-col items-center space-y-4">
          <label className="font-bold text-black w-full text-center" htmlFor="fullname">
            Fullname
          </label>
          <input
            autoComplete="name"
            className="rounded-lg w-full py-2 px-4 bg-white text-black text-center"
            id="fullname"
            type="text"
            value={formdata.fullName}
            onChange={(e)=>{setformdata({...formdata,fullName:e.target.value})}}
          />

          <label className="font-bold text-black w-full text-center" htmlFor="email">
            Email
          </label>
          <input
            autoComplete="email"
            className="rounded-lg w-full py-2 px-4 bg-white text-black text-center"
            id="email"
            type="email"
            value ={formdata.email}
            onChange={(e)=>setformdata({...formdata,email:e.target.value})}
          />

          <label className="font-bold text-black w-full text-center" htmlFor="password">
            Password
          </label>
          <input
            autoComplete="new-password"
            className="rounded-lg w-full bg-white py-2 px-4 text-black text-center "
            id="password"
            type="password"
            value={formdata.password}
            onChange={(e)=>setformdata({...formdata,password:e.target.value})}
          />

          <button
          
            type="submit"
            className="bg-gray-500 text-white rounded-full py-2 px-8 mt-2 cursor-pointer select-none hover:bg-gray-700 transition-colors duration-300"
          >
             {isSigningUp ? (
                <>
                   <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
          </button>
        </form>
        <Link className="text-black mt-6 select-none" to="/login">
          Already have an account ?
        </Link>
      </div>

      
      <div className="flex flex-col items-center justify-center w-full md:w-1/2  bg-white relative">
        <h2 className="font-black text-4xl mb-6 select-none">
          UNI CHAT
        </h2>
        <div className="relative">
          <img
            alt="Front view of a modern smartphone with a notch at the top, white screen"
            className="mx-auto"
            height="600"
            width="max"
            src="/mobile.png"
            draggable="false"
          />

          
          

         

        </div>
      </div>
    </div>
  );
}

export default Signup;
