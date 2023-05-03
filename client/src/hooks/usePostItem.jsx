import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const usePostItem = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const postItem = async (title, description, price, category, photo, email) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('http://localhost:8080/api/v1/items', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({title, description, price, category, photo, email})
    });

    console.log(title, description, price, category, photo, email)

    const json = await response.json();

    if(!response.ok) {
      setIsLoading(false);
      setError(json.error);
      console.log('Something went wrong');
    }

    if(response.ok) {
      setIsLoading(false);
      navigate('/');
    }
  }

  return { postItem, isLoading, error }
};
