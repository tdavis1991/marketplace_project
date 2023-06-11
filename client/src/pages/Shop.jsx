import { useState, useEffect, CSSProperties } from "react";
import { Link } from 'react-router-dom';

import { useShop } from '../hooks/useShop';
import { ItemCard } from '../components';
import { Loader } from '../components';
import { heroImage } from "../assests";

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

  if(loading) {
    return <Loader loading={loading} />
  }
  
  return (
    <div className='flex flex-col gap-3 items-center w-5/6 my-5'>
      <div class=" flex bg-gradient-to-br from-teal-400 to-blue-900 h-[350px] w-full relative">
        <div className="w-1/2 my-auto ml-20">
          <h1 className="font-bold text-white">Grab Upto 50% off On Selected Items</h1>
          <button className="bg-quaternary rounded-full px-8 py-3 text-white">Buy Now</button>
        </div>
        <img className="h-5/6 absolute bottom-0 right-60" src={heroImage} alt='hero' />
      </div>
      <div className=" flex w-full my-5 gap-5">
        <select className="select select-bordered select-xs w-[100px] rounded-full">
          <option disabled selected>Price</option>
          <option>Up to $25</option>
          <option>$25 to $50</option>
          <option>$50 to $100</option>
          <option>$100 to $200</option>
          <option>$200 & above</option>
        </select>
        <select className="select select-bordered select-xs w-[100px] rounded-full">
          <option disabled selected>Category</option>
          <option>Electronics</option>
          <option>Clothing</option>
          <option>Outdoor</option>
        </select>
        <select className="select select-bordered select-xs w-[100px] rounded-full">
          <option disabled selected>Color</option>
          <option>Red</option>
          <option>Blue</option>
          <option>Orange</option>
          <option>Green</option>
          <option>Purple</option>
          <option>Black</option>
          <option>White</option>
        </select>
      </div>
      <div className="flex justify-between flex-wrap gap-3 w-5/6 m-auto">
        {data?.map((item) => (
          <ItemCard 
            title={item.title}
            price={item.price}
            category={item.category}
            photo={item.photo}
            rating={item.rating}
            id={item._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Shop;
