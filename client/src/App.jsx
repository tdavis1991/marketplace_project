import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Signup, Login, Home, Item } from './pages';
import { Navbar } from './components';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<Item />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
