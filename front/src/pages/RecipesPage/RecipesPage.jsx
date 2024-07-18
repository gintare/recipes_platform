import RecipeCarusele from '../../Components/RecipeCarousel/RecipeCarousel';
import React, { useContext, useEffect, useState } from 'react';
import { getAllRecipes } from '../../services/get';
import RecipeCard from '../../Components/RecipeCard/RecipeCard';
import RecipesForm from '../../Components/Forms/RecipesForm/RecipesForm';
import { Button } from 'react-bootstrap';
import './RecipesPage.css';
import UserContext from '../../Context/UserContext/UserContext';
import RecipesContext from '../../Context/RecipesContentxt/RecipesContext';
import { Link } from 'react-router-dom';

const shuffleArray = (array) => {
  let shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const RecipesPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const { isLoggedIn } = useContext(UserContext);
  const { update } = useContext(RecipesContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllRecipes();
        setRecipes(shuffleArray(data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [update]);

  return (
    <div className='recipes-page'>
      {isLoggedIn && (
        <div className='button-create-content col-12 col-md-6 col-xl-4 offset-md-3 offset-xl-4 mb-3'>
          <Button onClick={() => setIsVisible(!isVisible)}>
            {isVisible ? 'Hide Create Recipe' : 'Create Recipe'}
          </Button>
        </div>
      )}

      {isVisible && <RecipesForm setCreateRecipeIsVisible={setIsVisible} />}

      <RecipeCarusele />
      <div className='recipe-list'>
        {recipes.map((recipe) => (
          <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecipesPage;
