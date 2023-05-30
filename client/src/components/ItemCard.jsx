import React from 'react';
import { Link } from 'react-router-dom';

import { rating } from '../assests';

const ItemCard = ({ title, price, category, photo, id }) => {
  return (
    <Link to={`${id}`} className='w-80'>
      <div key={id} className='w-full border rounded-xl flex flex-col items-center shadow-md'>
        <div className='relative overflow-hidden h-[200px] w-[250px] mx-auto'>
          <img className='max-w-full max-h-full mx-auto object-center rounded-t-xl' src={photo} alt={`${title}`} />
        </div>
        <div className='flex flex-col items-start w-5/6'>
          <div className='flex items-center'>
            <h2 className='text-xl font-bold'>{title}</h2>
            <h3>{`$${price}.00`}</h3>
          </div>
          <div className='flex items-center'>
            <img src={rating} alt='rating' className='h-[50px] w-[125px]' />
            <p>(532)</p>
          </div>
          <p>{category}</p>
          <button className='bg-quaternary rounded-xl w-1/3 py-2 my-3 text-white'>Add to Cart</button>
        </div>
      </div>
      {/* <div className="card h-[450px] w-96 bg-base-100 shadow-md">
        <figure className="px-10 pt-10 relative overflow-hidden h-[300px] w-[350px] mx-auto">
          <img src={photo} alt={title} className="max-w-full max-h-full mx-auto object-center" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{title}</h2>
          <h3>{`$${price}.00`}</h3>
          <div className='flex items-center'>
            <img src={rating} alt='rating' className='h-[50px] w-[125px]' />
            <p>(20k reviews)</p>
          </div>
          <div className="card-actions">
            <button className="btn bg-quaternary">Add to cart</button>
          </div>
        </div>
      </div> */}
    </Link>
  )
}

export default ItemCard;