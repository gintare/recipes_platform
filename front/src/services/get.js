import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const token = localStorage.getItem("token");

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

export const getUserEmail = async () => {
  try {
    const resp = await axios.get(`${API_URL}/emails`);
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
    throw new Error(`Error fetching all data: ${error.message}`);
  }
};
