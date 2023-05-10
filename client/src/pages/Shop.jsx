// import React, { useEffect, useState } from 'react';

// import { useShop } from '../hooks/useShop';

// const Shop = () => {
//   const [error, seteError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     setLoading(true);
//     seteError(null);

//     fetch('http://localhost:8080/api/v1/items')
//       .then(response => {
//         setData(response.json())
//       })
//       .then(data => console.log('DATA', data))
//       .catch(error => console.error(error));
//   }, []);

//   console.log(data, error)
//   return (
//     <div>Shop</div>
//   )
// }

// export default Shop;

import React, { useEffect, useState } from 'react';

import { useShop } from '../hooks/useShop';

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
    <div>
      {data?.map((item, index) => (
        <div key={item._id}>
          <h1>{item.title}</h1>
          <p>{item.price}</p>
          <p>{item.description}</p>
          <img src={item.photo} alt={`${item.title}`}/>
        </div>
      ))}
    </div>
  );
};

export default Shop;
