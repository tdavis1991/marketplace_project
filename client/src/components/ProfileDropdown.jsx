import React from 'react';
import { Link } from 'react-router-dom';

import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';


const ProfileDropdown = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClickLogout = () => {
    logout();
  }; 

  return (
    <div className="relative inline-block">
      <ul className='absolute top-full right-0 z-10 list-none m-0 p-0 bg-[#fff] border border-solid border-[#ccc] shadow-dropdown text-black'>
        <li className='block py-[8px] px-[12px] cursor-pointer hover:bg-[#f0f0f0] w-[200px]'><Link to={user?.user?._id ? `profile/${user.user._id}` : ''}>View Profile</Link></li>
        <li className='block py-[8px] px-[12px] cursor-pointer hover:bg-[#f0f0f0] w-[200px]'>Settings</li>
        <li className='block py-[8px] px-[12px] cursor-pointer hover:bg-[#f0f0f0] w-[200px]' onClick={handleClickLogout}>Logout</li>
      </ul>
    </div>

  )
}

export default ProfileDropdown;