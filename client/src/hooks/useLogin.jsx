import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from './useAuthContext';


export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('http://localhost:8080/api/v1/users/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    });

    const json = await response.json();

    if(!response.ok) {
      setIsLoading(false);
      setError(json.error);
      console.log('Something went wrong')
    }

    if(response.ok) {
      // save token to local storage
      localStorage.setItem('user', JSON.stringify(json));

      //update the auth context
      dispatch({ type: 'LOGIN', payload: json });

      setIsLoading(false);
      navigate('/');
    }
  }

  return { login, isLoading, error }
};