import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Item from './ItemForm';
import { useAuthContext } from '../hooks/useAuthContext';

const Profile = () => {
  const { user } = useAuthContext();
  const [inventory, setInventory] = useState([]);
  console.log('PROFILE', user.user._id);

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/users/${user.user._id}/inventory`)
      .then(res => res.json())
      .then(data => {
        setInventory(data)
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div className='flex w-full gap-3 mt-10'>
    <div className='flex flex-1 flex-col'>
      <img src={user.user.avatar} alt='avatar' className='w-96 h-96' />
      <h2 className='font-bold'>Contact</h2>
      <h3 className='text-xl'><span className='font-bold'>Name:</span> {user.user.name}</h3>
      <h3 className='text-xl'><span className='font-bold'>Email:</span> {user.user.email}</h3>
      <div className='my-10'>
        <h1>Inventory</h1>
        <div className='flex'>
          {inventory?.inventoryItems?.map((item) => (
            <div key={item._id}>
              <img className='w-[100px] h-[100px] transition-transform duration-300 transform-gpu hover:scale-110 hover:cursor-pointer' src={item.photo} />
            </div>
          ))}
        </div>
      </div>
    </div>
    <Item />
    </div>
  )
}

export default Profile;