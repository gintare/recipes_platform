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
  try {
    //console.log(data.ingredients);
    const resp = await axios.put(`${API_URL}/api/categories/${categoryId}/recipes/${recipeId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resp.data;
  } catch (error) {
    throw new Error(`Error updating data ${error.message}`);
  }
};
