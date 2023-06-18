import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { Loader, RatingStars } from '../components';
// import { rating } from '../assests';

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const ItemDetail = () => {
  const [item, setItem] = useState({});
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(1);
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

  
  // useEffect(() => {
  //   setLoading(true);
  //   setError(null);

  //   fetch(`http://localhost:8080/api/v1/items/${id}`)
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch item details');
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       setItem(data);
  //     })
  //     .catch(error => setError(error.message))
  //     .finally(() => setLoading(false));
  // }, [id]);

  useEffect(() => {
    if (item.category) {
      setLoading(true);
      setError(null);
  
      fetch(`http://localhost:8080/api/v1/items/category/${item.category}`)
        .then(response => response.json())
        .then(data => {
          setCategory(data);
        })
        .catch(error => setError(error))
        .finally(() => setLoading(false));
    }
  }, [item.category]);

  console.log('ITEM', item);

  return (
    <div className='w-full my-10'>
      {!loading ? (
      <div className='flex w-full justify-center'>
        <div className='w-3/5 flex gap-5'>
          <img src={item?.photo} className='w-[500px] h-[500px] object-contain' />
          <div className='w-1/3'>
            <h2 className='font-bold'>{item?.title}</h2>
            <h3 className='text-xl'>Price: ${item?.price}.00</h3>
            <div className='flex items-center mt-3'>
              {/* <img src={rating} alt='rating' className='h-[50px] w-[125px]' /> */}
              <RatingStars rating={item.rating ? item.rating : 3} /> 
              <p>(532 reviews)</p>
            </div>
            <p className='my-5'>{item?.description}</p>
            <div className='w-full flex'>
              <button className='bg-quaternary rounded-xl w-1/2 py-2 text-white'>Add to Cart</button>
              <select className='w-[50px] border-2 rounded-xl ml-5' name='count' value={count} onChange={() => setCount(count)}>
                {nums.map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className='w-1/4 flex flex-col'>
          <h2>Related Items</h2>
          <div className='w-full flex flex-wrap mt-5'>
            {category?.map((item) => (
              <Link to={`/shop/${item?._id}`} className='hover:border-2'>
                <img src={item.photo} className='w-[100px] height-[100px] m-2' />
              </Link>
            ))}
          </div>
        </div>
      </div>
      ) : (
        <Loader loading={loading} />
      )}
    </div>
  )
}

export default ItemDetail;