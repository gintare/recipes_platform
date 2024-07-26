import { useParams } from 'react-router';
import './UserRecipesPage.css';
import { getRecipesByUserId } from '../../services/get';
import { useEffect, useState } from 'react';
import RecipeCard from '../../Components/RecipeCard/RecipeCard';

function UserRecipesPage() {
    const { id: userId } = useParams();
    const[ recipes, setRecipes] = useState([]);

    useEffect(() => {
      const getRecipes = async() => {
         const rec = await getRecipesByUserId(userId);
         console.log(rec);
         setRecipes(rec);
      }
      getRecipes();
    }, []);

    return (<><h1>UserRecipesPage {userId}</h1>
        <div className='recipe-list'>
        {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
      </>);
}

export default UserRecipesPage;