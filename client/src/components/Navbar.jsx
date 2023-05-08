import React from 'react';
import { Link } from 'react-router-dom';

import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  }

  return (
    <div >
      {user ? (
        <button onClick={handleClick}>Logout</button>
      ) : (
        <div>
          <Link to='/login'>Login</Link>
          <Link to='/signup'>Sign Up</Link>
        </div>
      )}
    </div>
  )
}

export default Navbar;