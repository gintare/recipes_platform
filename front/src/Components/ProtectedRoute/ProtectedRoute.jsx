import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { getUserRoleFromToken } from '../../utils/jwt';

import './ProtectedRoute.css';

const ProtectedRoute = ({ children, adminOnly, ...rest }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const role = getUserRoleFromToken(token);
      if (role) setIsAuthorized(true);
      if (role === 'ADMIN') setIsAdmin(true);
    }
  }, []);

  if (!isAuthorized) {
    return (
      <div className='protected-container'>
        <h2>This content is accessible to authorized users.</h2>
        <NavLink className='protected-nav-link' to='/login' state={{ from: location }}>
          Login here
        </NavLink>
      </div>
    );
  }

  if (adminOnly && !isAdmin) {
    return (
      <div className='protected-container'>
        <h2>This content is accessible to admins only.</h2>
        <NavLink className='protected-nav-link' to='/login'>
          Go back to Login
        </NavLink>
      </div>
    );
  }

  return <div {...rest}>{children}</div>;
};

export default ProtectedRoute;
