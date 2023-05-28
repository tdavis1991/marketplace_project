import React from 'react';
import { Link } from 'react-router-dom';

import { rating } from '../assests';

const ItemCard = ({ title, price, category, photo, id }) => {
  return (
    <Link to={`${id}`} className='w-1/4'>
      <div key={id} className='w-full border rounded-xl flex flex-col items-center shadow-md'>
        <img className='object-cover w-full h-[200px] rounded-t-xl' src={photo} alt={`${title}`} />
        <div className='flex flex-col items-start w-5/6'>
          <h2 className='font-bold'>{title}</h2>
          <div className='flex items-center'>
            <img src={rating} alt='rating' className='h-[50px] w-[125px]' />
            <p>20k reviews</p>
          </div>
          <h3>{`$${price}.00`}</h3>
          <p>{category}</p>
          <button className='bg-quaternary rounded-xl w-1/3 py-2 my-3 text-white'>Add to Cart</button>
        </div>
      </div>
    </Link>
  )
}

export default ItemCard;