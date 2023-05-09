import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { shoppingCart, defaultProfile } from '../assests';
import ProfileDropdown from './ProfileDropdown';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = () => {
    logout();
  }

  return (
    <div className='absolute flex justify-between items-center top-0 bg-green-500 w-full h-15' >
      <Link to='/' className='ml-10'><h2>Frostplace</h2></Link>
      <div className='flex gap-10'>
        <Link to='/'>Home</Link>
        <Link to='/shop'>Shop</Link>
        <Link to='/about'>About</Link>
      </div>
      <div className='flex mr-10 gap-5'>
        {user ? (
          <button onClick={handleClick}>Logout</button>
        ) : (
          <div className='flex gap-5'>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Sign Up</Link>
          </div>
        )}
        <img className='w-[30px] h-[30px]' src={defaultProfile} alt='profile' onClick={toggleDropdown} />
        {isOpen && <ProfileDropdown />}
        <img className='h-[30px] w-[30px]' src={shoppingCart} alt='shopping cart' />
      </div>
    </div>
  )
}

export default Navbar;