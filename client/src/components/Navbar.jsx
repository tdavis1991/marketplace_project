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
    console.log('USER DATA', user?.user?.avatar);
  }, [user]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // useEffect(() => {
  //   const handleDocumentClick = () => {
  //     setIsOpen((prevIsOpen) => !prevIsOpen);
  //   };

  //   document.addEventListener('click', handleDocumentClick);

  //   return () => {
  //     document.removeEventListener('click', handleDocumentClick);
  //   };
  // }, []);

  // const handleClickLogout = () => {
  //   logout();
  // }

  return (
    <div className='flex flex-col items-center top-0 w-full absolute' >
      <div className='flex justify-between w-full bg-primary text-white'>
        <div className='flex items-center gap-2 ml-5'>
          <img src={phone} alt='phone' className='h-[20px] w-[20px]' />
          <p>555-555-5555</p>
        </div>
        <div className='flex justify-between'>
          <p>Get 50% off on Selected Items</p>
          <p>&nbsp;&nbsp;|&nbsp;&nbsp;</p>
          <p>Shop now</p>
        </div>
        <p className='mr-5'>Eng &#x2193;</p>
      </div>
      <div className='flex justify-between items-center h-15 w-11/12'>
        <Link to='/' className='ml-10' style={{ fontFamily: 'Lobster, cursive' }}><h2><span className='text-quaternary'>F</span>rostplace</h2></Link>
        <div className='flex gap-10'>
          <Link to='/'>Home</Link>
          <Link to='/shop'>Shop</Link>
          <Link to='/about'>About</Link>
        </div>
        <div className='flex mr-10 gap-5'>
          {user?.user?.avatar ? (
            <img className='w-[30px] h-[30px] rounded-full hover:cursor-pointer' src={user.user.avatar} alt='profile' onClick={toggleDropdown} />
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