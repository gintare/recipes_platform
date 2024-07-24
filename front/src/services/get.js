import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const token = localStorage.getItem('token');

export const getAllData = async () => {
  try {
    const resp = await axios.get(`${API_URL}`);
    return resp.data;
  } catch (error) {
    throw new Error(`Error fetching all data: ${error.message}`);
  }
};

export const getOne = async (id) => {
  try {
    const resp = await axios.get(`${API_URL}/${id}`);
    return resp.data;
  } catch (error) {
    console.error(`Error fetching data for ID ${id}: ${error.message}`);
  }
};

export const getOneUser = async (id) => {
  try {
    const resp = await axios.get(`${API_URL}/users/${id}`);
    return resp.data;
  } catch (error) {
    console.error(`Error fetching data for ID ${id}: ${error.message}`);
  }
};

export const getUserEmails = async () => {
  try {
    const resp = await axios.get(`${API_URL}/users/emails`);
    return resp.data;
  } catch (error) {
    throw new Error(`Error fetching emails: ${error.message}`);
  }
};

export const getUserNames = async () => {
  try {
    const resp = await axios.get(`${API_URL}/users/usernames`);
    return resp.data;
  } catch (error) {
    throw new Error(`Error fetching emails: ${error.message}`);
  }
};

export const getCategories = async () => {
  try {
    const resp = await axios.get(`${API_URL}/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resp.data;
  } catch (error) {
    throw new Error(`Error fetching categories: ${error.message}`);
  }
};

export const getAllCategories = async () => {
  try {
    const resp = await axios.get(`${API_URL}/api/categories`);
    return resp.data;
  } catch (error) {
    throw new Error(`Error fetching all data: ${error.message}`);
  }
};

export const getAllRecipes = async () => {
  try {
    const resp = await axios.get(`${API_URL}/api/recipes`);
    return resp.data;
  } catch (error) {
    throw new Error(`Error fetching all recipes: ${error.message}`);
  }
};

export const getRecipesByUserId = async (userId) => {
  try {
    const resp = await axios.get(`${API_URL}/api/users/${userId}/recipes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resp.data;
  } catch (error) {
    throw new Error(`Error fetching all recipes: ${error.message}`);
  }
};

export const getOneRecipe = async (recipeId) => {
  try {
    const resp = await axios.get(`${API_URL}/api/recipes/${recipeId}`);
    return resp.data;
  } catch (error) {
    throw new Error(`Error fetching all recipes: ${error.message}`);
  }
};

export const getOneCategory = async (categoryId) => {
  try {
    const resp = await axios.get(`${API_URL}/api/categories/${categoryId}`);
    return resp.data;
  } catch (error) {
    throw new Error(`Error fetching all recipes: ${error.message}`);
  }
};

export const getIsFavorite = async (userId, recipeId) => {
  try {
    const resp = await axios.get(`${API_URL}/api/users/${userId}/recipes/${recipeId}/favorites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resp.data;
  } catch (error) {
    throw new Error(`Error fetching all recipes: ${error.message}`);
  }
};

export const getCommentsByRecipe = async (recipeId) => {
  try {
    const resp = await axios.get(`${API_URL}/api/recipes/${recipeId}/comments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resp.data;
  } catch (error) {
    throw new Error(`Error fetching all recipes: ${error.message}`);
  }
};


export const getIsFollower = async (whoUserId, whatUserId) => {
  try {
    const resp = await axios.get(`${API_URL}/api/follower/${whoUserId}/${whatUserId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resp.data;
  } catch (error) {
    throw new Error(`Error fetching all recipes: ${error.message}`);
  }
};

export const getAllRecipesByPage = async (pageNo) => {
  try {
    const resp = await axios.get(`${API_URL}/api/recipes/pages/${pageNo}`);
    return resp.data;
  } catch (error) {
    throw new Error(`Error fetching all recipes: ${error.message}`);
  }
};

export const getFavoritesByUser = async (userId) => {
  try {
    const resp = await axios.get(`${API_URL}/api/users/${userId}/favorites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resp.data;
  } catch (error) {
    throw new Error(`Error fetching all recipes: ${error.message}`);
  }
};