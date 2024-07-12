import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../../Context/UserContext/UserContext';

import './Navigation.css';

const Navigation = () => {
  const { isLoggedIn, logoutHandler, userName, role } = useContext(UserContext);

  const accountPath = role === 'ADMIN' ? '/admin' : '/user';

  return (
    <nav className='navbar navbar-expand-lg'>
      <div className='container-fluid'>
        <NavLink className='navbar-brand text-light' to='/'>
          Logo
        </NavLink>
        <button
          className='navbar-toggler mb-2'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNavAltMarkup'
          aria-controls='navbarNavAltMarkup'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
          <div className='navbar-nav ms-auto text-end'>
            {isLoggedIn ? (
              <>
                <NavLink className='username' to={accountPath}>
                  Account: {userName}
                </NavLink>
                <NavLink
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  to='/recipes'
                >
                  Recipes
                </NavLink>
                <button className='logout' onClick={logoutHandler}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  to='/login'
                >
                  Login
                </NavLink>
                <NavLink
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  to='/register'
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
