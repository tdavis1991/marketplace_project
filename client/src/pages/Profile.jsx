import React from 'react';
import { Link } from 'react-router-dom';

import Item from './ItemForm';
import { useAuthContext } from '../hooks/useAuthContext';

const Profile = () => {
  const { user } = useAuthContext();
  console.log('PROFILE', user.user.inventory);

  return (
    <div className='flex w-full h-screen gap-3 mt-10'>
    <div className='flex flex-1 flex-col'>
      <img src={user.user.avatar} alt='avatar' className='w-96 h-96' />
      <h2 className='font-bold'>Contact</h2>
      <h3 className='text-xl'><span className='font-bold'>Name:</span> {user.user.name}</h3>
      <h3 className='text-xl'><span className='font-bold'>Email:</span> {user.user.email}</h3>
      <h1>Inventory</h1>
    </div>
    {/* <Link to='/create'>
      <button className='text-2xl font-bold bg-quaternary px-5 py-2 rounded-xl'>+ Add Item</button>
    </Link> */}
    <Item />
    </div>
  )
}

export default Profile;