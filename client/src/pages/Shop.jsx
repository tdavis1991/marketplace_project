import { useState, useEffect, CSSProperties } from "react";
import { Link } from 'react-router-dom';

import { useShop } from '../hooks/useShop';
import { ItemCard } from '../components';
import { Loader } from '../components';

const Shop = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch('http://localhost:8080/api/v1/items')
      .then(response => response.json())
      .then(data => {
        setData(data);
        console.log('MY DATA', data);
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, []);

  // if(loading) {
  //   return <Loader loading={loading} />
  // }
  
  return (
    <div className='flex flex-col gap-3 items-center w-5/6 mt-5'>
      <div class="bg-gradient-to-br from-teal-400 to-blue-900 h-[350px] w-full"></div>
      <div className="flex justify-between flex-wrap gap-3 w-5/6 m-auto">
        {data?.map((item) => (
          <ItemCard 
            title={item.title}
            price={item.price}
            category={item.category}
            photo={item.photo}
            id={item._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Shop;
