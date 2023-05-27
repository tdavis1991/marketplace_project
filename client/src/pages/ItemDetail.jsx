import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Loader } from '../components';

const ItemDetail = () => {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  
  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`http://localhost:8080/api/v1/items/${id}`)
      .then(response => response.json())
      .then(data => {
        setItem(data);
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, []);

  console.log('ITEM', item)

  return (
    <div className='w-full'>
      {!loading ? (
      <div className='flex mx-10 gap-5'>
        <img src={item?.photo} className='w-[500px] h-[500px] object-contain' />
        <div className='w-1/4'>
          <h1>{item?.title}</h1>
          <h3 className='text-xl'>Price: ${item?.price}.00</h3>
          <p className='my-5'>{item?.description}</p>
          <button className='bg-quaternary rounded-xl w-1/2 py-2 text-white'>Add to Cart</button>
        </div>
      </div>
      ) : (
        <Loader loading={loading} />
      )}
    </div>
  )
}

export default ItemDetail;