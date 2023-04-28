import React from 'react';
import { Link } from 'react-router-dom';

import { useLogout } from '../hooks/useLogout';

const Navbar = () => {
  const { logout } = useLogout();

  const token = localStorage.getItem('user');

  const handleClick = () => {
    logout();
  }

  return (
    <div>
      {token ? (
        <button onClick={handleClick}>Logout</button>
      ) : (
        <div>
          <Link to='/signin'>Sign In</Link>
          <Link to='/signup'>Sign Up</Link>
        </div>
      )}
    </div>
  )
}

export default Navbar;