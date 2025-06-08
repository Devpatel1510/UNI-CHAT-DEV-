import React, { useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import Signup from './pages/signup';
import Login from './pages/login';
import Message from './pages/message';
import Profile from './pages/profile';
import { useauthstore } from './store/auth.store';
import { Toaster } from 'react-hot-toast';



function App() {
const {authUser ,checkAuth,onlineUsers} = useauthstore();
useEffect (() => { checkAuth()},[checkAuth] );


console.log({onlineUsers});
console.log({authUser});

const Location = useLocation();
const hideNavbarRoutes = ["/login", "/signup"];
const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div>
      
       {!shouldHideNavbar && <Nav />}
      <Routes>
        
        <Route path='/' element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path='/signup' element={!authUser ? <Signup /> : <Navigate to="/" />} />
        <Route path='/login' element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path='/profile' element={authUser ? <Profile /> : <Navigate to="/login" />} />
        <Route path='/message' element={<Message />} />

      </Routes>
      <Toaster />
    </div>
  )
}

export default App
