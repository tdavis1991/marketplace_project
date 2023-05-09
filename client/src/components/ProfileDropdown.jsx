import React from 'react';

const ProfileDropdown = () => {
  return (
    <div className="relative inline-block">
      <ul className='absolute top-full right-0 z-10 list-none m-0 p-0 bg-[#fff] border border-solid border-[#ccc] shadow-dropdown'>
        <li className='block py-[8px] px-[12px] cursor-pointer hover:bg-[#f0f0f0] w-[200px]'>View Profile</li>
        <li className='block py-[8px] px-[12px] cursor-pointer hover:bg-[#f0f0f0] w-[200px]'>Settings</li>
        <li className='block py-[8px] px-[12px] cursor-pointer hover:bg-[#f0f0f0] w-[200px]'>Logout</li>
      </ul>
    </div>

  )
}

export default ProfileDropdown;