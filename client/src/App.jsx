import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';

import { Signup, Login, Home, Item } from './pages';
import { Navbar } from './components';
import { useAuthContext } from './hooks/useAuthContext';
import './App.css';

function App() {
  const token = localStorage.getItem('user');

  const { user, loading } = useAuthContext();

  if(loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center w-full">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />
          <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
          <Route path='/create' element={user ? <Item /> : <Navigate to='/login' />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
  console.log(user)
}

export default App
