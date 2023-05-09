import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Signup, Login, Home, ItemForm, Shop, About } from './pages';
import { Navbar } from './components';
import { useAuthContext } from './hooks/useAuthContext';
import './App.css';

function App() {
  // const { user } = useAuthContext();

  const token = localStorage.getItem('user');

  return (
    <div className="h-screen flex flex-col items-center justify-center w-full">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/signup' element={!token ? <Signup /> : <Navigate to='/' />} />
          <Route path='/login' element={!token ? <Login /> : <Navigate to='/' />} />
          <Route path='/create' element={token ? <ItemForm /> : <Navigate to='/login' />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/about' element={<About />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
  console.log(user)
}

export default App
