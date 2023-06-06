import React from 'react';
import { Link } from 'react-router-dom';

import { rating } from '../assests';

const ItemCard = ({ title, price, category, photo, id }) => {
  return (
    <Link to={`${id}`} className='w-80'>
      <div key={id} className='w-full border rounded-xl flex flex-col items-center shadow-md min-h-[400px]'>
        <div className='relative overflow-hidden h-[200px] w-[250px] mx-auto'>
          <img className='max-w-full max-h-full mx-auto object-center rounded-t-xl' src={photo} alt={`${title}`} />
        </div>
        <div className='flex flex-col items-start w-5/6'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-bold'>{title}</h2>
            <h3>{`$${price}.00`}</h3>
          </div>
          <div className='flex items-center'>
            <img src={rating} alt='rating' className='h-[50px] w-[125px]' />
            <p>(532)</p>
          </div>
          <p>{category}</p>
          <button className='bg-quaternary rounded-full px-3 py-2 my-3 text-white'>Add to Cart</button>
        </div>
      </div>
    </Link>
  )
}

// 

export default ItemCard;