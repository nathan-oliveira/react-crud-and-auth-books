import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from 'Components/Helper/ProtectedRoute'

import Home from 'Components/Home/Index';
import Auth from 'Components/Auth'
import Profile from 'Components/Profile'

import Books from 'Components/Books'

const Router = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute/>}>
        <Route path='/' element={<Home/>}/>
      </Route>

      <Route path="/login" element={<Auth />} />

      <Route element={<ProtectedRoute/>}>
        <Route path='/profile' element={<Profile/>}/>
      </Route>

      <Route element={<ProtectedRoute/>}>
        <Route path='/books/*' element={<Books/>}/>
      </Route>
    </Routes>
  )
}

export default Router;
