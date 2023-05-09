import React from 'react'

const ItemCard = ({ title, price, category, photo }) => {
  return (
    <div>
      <img src={photo} alt={`${title}`} />
      <h1>{title}</h1>
      <h3>{price}</h3>
      <p>{category}</p>
    </div>
  )
}

export default ItemCard