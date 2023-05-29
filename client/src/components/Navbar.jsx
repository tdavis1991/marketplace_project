import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { shoppingCart, defaultProfile, phone } from '../assests';
import ProfileDropdown from './ProfileDropdown';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem('user');

  useEffect(() => {
    console.log('USER DATA', user?.avatar);
  }, [user]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // const handleClickLogout = () => {
  //   logout();
  // }

  return (
    <div className='absolute flex flex-col items-center top-0 w-full' >
      <div className='flex justify-center w-full bg-primary text-white'>
        <div className='flex items-center w-11/12 gap-2'>
          <img src={phone} alt='phone' className='h-[20px] w-[20px]' />
          <p>555-555-5555</p>
        </div>
      </div>
      <div className='flex justify-between items-center h-15 w-11/12'>
        <Link to='/' className='ml-10'><h2><span className='text-quaternary'>F</span>rostplace</h2></Link>
        <div className='flex gap-10'>
          <Link to='/'>Home</Link>
          <Link to='/shop'>Shop</Link>
          <Link to='/about'>About</Link>
        </div>
        <div className='flex mr-10 gap-5'>
          {user?.avatar ? (
            <img className='w-[30px] h-[30px] rounded-full hover:cursor-pointer' src={user.avatar} alt='profile' onClick={toggleDropdown} />
          ) : (
            <img className='w-[30px] h-[30px] rounded-full hover:cursor-pointer' src={defaultProfile} alt='profile' onClick={toggleDropdown} />
          )}
          {isOpen && <ProfileDropdown />}
          {user && <img className='h-[30px] w-[30px]' src={shoppingCart} alt='shopping cart' />}
          {!user &&
            <div className='flex gap-5'>
              <Link to='/login'>Login</Link>
              <Link to='/signup'>Sign Up</Link>
            </div>
          }
        </div>
      </div>

    </div>
  )
}

export default Navbar;