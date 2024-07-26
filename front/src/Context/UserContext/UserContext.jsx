import { createContext, useState } from 'react';
import {
  getUserEmailFromToken,
  getUserIdFromToken,
  getUserImageFromToken,
  getUserNameFromToken,
  getUserRoleFromToken,
} from '../../utils/jwt';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const [update, setUpdate] = useState(0);

  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  const userName = isLoggedIn ? getUserNameFromToken(token) : null;
  const email = isLoggedIn ? getUserEmailFromToken(token) : null;
  const role = isLoggedIn ? getUserRoleFromToken(token) : null;
  const image = isLoggedIn ? getUserImageFromToken(token) : null;
  const id = isLoggedIn ? getUserIdFromToken(token) : null;

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    sessionStorage.clear();
    updateUser();
    navigate('/', { replace: true });
  };

  const updateUser = () => {
    setUpdate((prev) => prev[update] + 1);
  };

  const updateUserAuthContext = (newToken) => {
    localStorage.setItem('token', newToken);
    updateUser();
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        updateUser,
        logoutHandler,
        userName,
        role,
        id,
        email,
        image,
        token,
        updateUserAuthContext,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserContext.displayName = 'UserContext';

export default UserContext;
