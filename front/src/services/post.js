import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
import { getDefaultToken } from './service';

const token = localStorage.getItem('token');

export const postData = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to save data: ${error.message}`);
  }
};

export const postRegister = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/register`, data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to save data: ${error.message}`);
  }
};

export const loginPost = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to save data: ${error.message}`);
  }
};

export const postCategory = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/api/categories`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Cache-Control': 'no-cache',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to save category: ${error.message}`);
  }
};

export const recipePost = async (categoryId, userId, data) => {
  try {
    const userToken = getDefaultToken();
    const response = await axios.post(`${API_URL}/api/categories/${categoryId}/users/${userId}/recipes`, data, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to save data: ${error.message}`);
  }
};

export const followerPost = async (followerWhoId, followerWhatId) => {
  try {
    const userToken = getDefaultToken();
    const response = await axios.post(`${API_URL}/api/followers/${followerWhoId}/${followerWhatId}`, null, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to save data: ${error.message}`);
  }
};

export const favoritePost = async (userId, recipeId) => {
  try {
    const userToken = getDefaultToken();
    const response = await axios.post(`${API_URL}/api/users/${userId}/recipes/${recipeId}/favorites`, null, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to save data: ${error.message}`);
  }
};

export const commentPost = async (userId, recipeId, data) => {
  try {
    const userToken = getDefaultToken();
    const response = await axios.post(`${API_URL}/api/users/${userId}/recipes/${recipeId}/comments`, data, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to save data: ${error.message}`);
  }
};