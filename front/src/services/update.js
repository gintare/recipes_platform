import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

const token = localStorage.getItem('token');

export const updateData = async (id, data) => {
  try {
    const resp = await axios.patch(`${API_URL}/${id}`, data);
    return resp.data;
  } catch (error) {
    throw new Error(`Error updating data ${error.message}`);
  }
};

export const updateDataAuth = async (id, data) => {
  try {
    const resp = await axios.patch(`${API_URL}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
<<<<<<< HEAD
        'Cache-Control': 'no-cache',
=======
        'Cache-control': 'no-cache',
>>>>>>> 88a9aa0e33743b0cea617421457c98939bfd8804
      },
    });
    return resp.data;
  } catch (error) {
    throw new Error(`Error updating data ${error.message}`);
  }
};

export const updateUserAuth = async (id, data) => {
  try {
    const resp = await axios.patch(`${API_URL}/users/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Cache-Control': 'no-cache',
      },
    });
    return resp.data;
  } catch (error) {
    throw new Error(`Error updating data: ${error.message}`);
  }
};

export const updateCategoryAuth = async (id, data) => {
  try {
    const resp = await axios.patch(`${API_URL}/api/categories/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resp.data;
  } catch (error) {
    throw new Error(`Error updating data ${error.message}`);
  }
};

export const updateRecipe = async (categoryId, recipeId, data) => {
<<<<<<< HEAD
  try {
=======
  try {    
>>>>>>> 88a9aa0e33743b0cea617421457c98939bfd8804
    const resp = await axios.put(
      `${API_URL}/api/categories/${categoryId}/recipes/${recipeId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return resp.data;
  } catch (error) {
    throw new Error(`Error updating data ${error.message}`);
  }
};
