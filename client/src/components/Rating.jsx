import React, { useState } from 'react';

const RatingStars = ({ rating }) => {
  const [rate, setRate] = useState(0);

  const handleStarClick = (value) => {
    setRating(value);
  };

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= rating; i++) {
      const starClass = i <= rate ? 'filled' : 'empty';
      stars.push(
        <span
          key={i}
          className={`star ${starClass}`}
          onClick={() => handleStarClick(i)}
        >
          ★
        </span>
      );
    }

    return stars;
  };

  return <div>{renderStars()}</div>;
};

export default RatingStars;
