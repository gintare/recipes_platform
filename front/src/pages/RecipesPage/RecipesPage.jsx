import RecipeCarusele from "../../Components/RecipeCarousel/RecipeCarousel";
import React, { useEffect, useState } from 'react';
import { getAllRecipes } from "../../services/get"; 
import RecipeCard from "../../Components/RecipeCard/RecipeCard";

const RecipesPage = () => {

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllRecipes();
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="recipes-page">
      <RecipeCarusele />  
      <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
    </div>
  );
};

export default RecipesPage;
