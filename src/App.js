import React, { lazy, useEffect } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import checkAuth from './app/auth';
import initializeApp from './app/init';
import { useState } from 'react';
import { USER_CONFIG } from './constants/User';

// Importing pages
const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const Register = lazy(() => import('./pages/Register'))


// Initializing different libraries
initializeApp()


// Check for login and initialize axios

function App() {
  
  const [user,setUser]=useState(null)
  useEffect(() => {
    //themeChange(true)
    const token=localStorage.getItem(USER_CONFIG.TOKEN_DETAIL);
    if(token){
      //call get profile
      setUser(token)
    }
  }, [])


  return (
    <>
      <Router>
        <Routes>
          {
            user?
            <>
              <Route path="*" element={<Layout />} />
            </>:
            <>
              <Route path="*" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/register" element={<Register />} />
              {/* <Route path="*" element={<Navigate to={"/login"} replace />} /> */}
            </>
          }

        </Routes>
      </Router>
    </>
  )
}

export default App
