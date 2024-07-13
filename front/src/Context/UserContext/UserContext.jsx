import { createContext, useState } from 'react';
import { getUserIdFromToken, getUserNameFromToken, getUserRoleFromToken } from '../../utils/jwt';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [update, setUpdate] = useState(0);

  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;
  const userName = isLoggedIn ? getUserNameFromToken(token) : null;
  const role = isLoggedIn ? getUserRoleFromToken(token) : null;
  const id = isLoggedIn ? getUserIdFromToken(token) : null;

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    sessionStorage.clear();
    toast.success('You have been logged out successfully.');
    updateUser();
    navigate('/login', { replace: true });
  };

  const updateUser = () => {
    setUpdate((prev) => prev + 1);
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, isLoggedIn, updateUser, logoutHandler, userName, role, id }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserContext.displayName = 'UserContext';

export default UserContext;
