import RecipeCarusele from '../../Components/RecipeCarousel/RecipeCarousel';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getAllRecipes, getAllRecipesByPage, getRecipesByCategoryByPage } from '../../services/get';
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
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [pages, setPages] = useState(0);
  const RECORDS_PER_PAGE = 12;
  const { isLoggedIn } = useContext(UserContext);
  const { update, filteredRecipes, setFilteredRecipes, setRecipes, selectedCategory } = useContext(RecipesContext);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await getAllRecipesByPage(0); //await getAllRecipes();
      setRecipes(shuffleArray(data));
    } catch (error) {
      toast.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const showMore = async () => {
    //console.log("selectedCategory = "+selectedCategory);
    setPages((prev) => prev + 1);
    let rec = null;
    if(selectedCategory == 0){
      rec = await getAllRecipesByPage(pages+1);
      
    }else{
      rec = await getRecipesByCategoryByPage(selectedCategory, pages+1);
    }

    for(let i = 0; i < rec.length; i++ ){
      //console.log(i);
      //console.log(rec[i]);
      setRecipes(oldRec => [...oldRec, rec[i]]);
    }
  }

  useEffect(() => {
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
        {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} /> 
        ))}
      </div>
      <hr/>
      <div className='show-more-button-content'>
        <Button onClick={showMore}>Show more</Button>
      </div>
    </div>
  );
};

export default RecipesPage;
