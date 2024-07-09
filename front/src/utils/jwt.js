import { jwtDecode } from 'jwt-decode';

export const getUserRoleFromToken = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.role;
  } catch (error) {
    console.error('Invalid token', error);
    return null;
  }
};

export const getUserNameFromToken = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.name;
  } catch (error) {
    console.error('Invalid token', error);
    return null;
  }
};
