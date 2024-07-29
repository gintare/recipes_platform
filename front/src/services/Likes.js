import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
export const addLike = async (recipeId, userId) => {
  if (!userId) throw new Error('User ID is required');
  try {
    const response = await axios.post(`${API_URL}/api/recipes/${recipeId}/users/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to add like', error.response ? error.response.data : error.message);
    throw new Error('Failed to add like');
  }
};

export const removeLike = async (recipeId, userId) => {
  try {
    const response = await axios.delete(`${API_URL}/api/recipes/${recipeId}/users/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to remove like');
  }
};

export const checkUserLiked = async (recipeId, userId) => {
  try {
    const response = await axios.get(`${API_URL}/api/recipes/${recipeId}/users/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to check if user liked');
  }
};

export const getRecipeLikes = async (recipeId) => {
  try {
    const response = await axios.get(`${API_URL}/api/recipes/${recipeId}/likes`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to get recipe likes');
  }
};
