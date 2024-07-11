import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

const token = localStorage.getItem('token');

export const deleteData = async (id) => {
  try {
    const resp = await axios.delete(`${API_URL}/${id}`);
    return resp.data;
  } catch (error) {
    throw new Error(`Error deleting data ${error.message}`);
  }
};

export const deleteCategory = async (id) => {
  try {
    const resp = await axios.delete(`${API_URL}/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resp.data;
  } catch (error) {
    throw new Error(`Error deleting category ${error.message}`);
  }
};
