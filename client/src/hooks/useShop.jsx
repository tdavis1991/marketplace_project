import React, { useState } from 'react';


export const useShop = () => {
  const [error, seteError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([])

  const shop = async () => {
    setLoading(true);
    seteError(null);

    fetch('http://localhost:8080/api/v1/items')
      .then(response => {
        setData(response.json())
      })
      .then(data => console.log(data))
      .catch(error => console.error(error));


    // await setData(response.json());

    // if(!response.ok) {
    //   setLoading(false);
    //   // setError(data.error);
    //   console.log('Something went wrong')
    // }

    // if(response.ok) {
    //   setLoading(false);
    // }
  }
  

  return { shop, loading, error, data }
};