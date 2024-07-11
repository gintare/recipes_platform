import RecipeCarusele from "../../Components/RecipeCarousel/RecipeCarousel";
import React, { useEffect, useState } from 'react';
import { getAllRecipes } from "../../services/get"; 
import RecipeCard from "../../Components/RecipeCard/RecipeCard";
import RecipesForm from "../../Components/Forms/RecipesForm/RecipesForm";
import { Button } from "react-bootstrap";

const RecipesPage = () => {
  const [isVisible, setIsVisible] = useState(false);
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
      <div className="col-12 col-md-6 col-xl-4 offset-md-3 offset-xl-4 mb-3">
        <Button onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? 'Hide Create Recipe' : 'Create Recipe'}
        </Button>
      </div>
      
      {isVisible && ( <RecipesForm/> )}
       
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
