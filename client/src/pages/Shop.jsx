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

  console.log(data, error);
  
  return (
    <div className='flex flex-wrap gap-5 w-5/6'>
      {data?.map((item) => (
        <ItemCard 
          title={item.title}
          price={item.price}
          category={item.category}
          photo={item.photo}
          id={item._id}
        />
      ))}
      <Loader loading={loading} />
    </div>
  );
};

export default Shop;
