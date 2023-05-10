import { useNavigate } from 'react-router-dom';

import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  
  const logout = () => {
    localStorage.removeItem('user');

    navigate('/login');

    dispatch({ type: 'LOGOUT' });
  }

  return { logout }
}