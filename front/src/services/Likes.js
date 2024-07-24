import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
export const addLike = async (recipeId, userId) => {
    if (!userId) throw new Error('User ID is required');
    try {
      console.log(`Sending POST request to ${API_URL}/api/recipes/${recipeId}/users/${userId}`);
      const response = await axios.post(
        `${API_URL}/api/recipes/${recipeId}/users/${userId}`,
         // Tuščias objektas, jei reikia pridėti duomenis, įsitikinkite, kad jie yra teisingi
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Add like response:', response);
      return response.data;
    } catch (error) {
      console.error('Failed to add like', error.response ? error.response.data : error.message);
      throw new Error('Failed to add like');
    }
  };
  
export const removeLike = async (recipeId, userId) => {
    try {
        const response = await axios.delete(
            `${API_URL}/api/recipes/${recipeId}/users/${userId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        throw new Error('Failed to remove like');
    }
};

export const checkUserLiked = async (recipeId, userId) => {
    try {
        const response = await axios.get(
            `${API_URL}/api/recipes/${recipeId}/users/${userId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        throw new Error('Failed to check if user liked');
    }
};

export const getRecipeLikes = async (recipeId) => {
    try {
        const response = await axios.get(
            `${API_URL}/api/recipes/${recipeId}/likes`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data; // Assuming the response is a number or an object with a count property
    } catch (error) {
        throw new Error('Failed to get recipe likes');
    }
};
