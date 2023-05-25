import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Signup, Login, Home, ItemForm, Shop, About, Profile } from './pages';
import { Navbar, Footer } from './components';
import { useAuthContext } from './hooks/useAuthContext';
import './App.css';

function App() {
  const { user } = useAuthContext();

  useEffect(() => {
    console.log('CURRENT USER', user);
  }, [user]);

  const token = localStorage.getItem('user');

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <BrowserRouter>
        <Navbar />
        <div className='h-screen flex flex-col items-center justify-center w-full'>
          <Routes>
            <Route path='/signup' element={!token ? <Signup /> : <Navigate to='/' />} />
            <Route path='/login' element={!token ? <Login /> : <Navigate to='/' />} />
            {token ? (
              <Route path='/create' element={<ItemForm />} />
            ) : (
              <Route path='/create' element={<Navigate to='/login' />} />
            )}
            <Route path='/profile/:id' element={!token ? <Profile /> : <Navigate to='/login' />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/about' element={<About />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>  
  );
}

export default App;

