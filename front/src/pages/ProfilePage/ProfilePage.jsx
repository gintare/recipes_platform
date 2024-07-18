import { useContext, useEffect, useState } from 'react';
import UserContext from '../../Context/UserContext/UserContext';
import { getRecipesByUserId } from '../../services/get';
import ProfileRecipeCard from '../../Components/ProfileRecipeCard/ProfileRecipeCard';
import RecipesForm from '../../Components/Forms/RecipesForm/RecipesForm';
import RecipesContext from '../../Context/RecipesContentxt/RecipesContext';
import './ProfilePage.css';
import ProfileCard from '../../Components/ProfileCard/ProfileCard';
import { Link } from 'react-router-dom';

function ProfilePage() {
  //const [recipies, setRecipies] = useState([]);
  const [error, setError] = useState('');
  //const [update, setUpdate] = useState(0);
  const [createRecipeIsVisible, setCreateRecipeIsVisible] = useState(false);
  const { id } = useContext(UserContext);
  const {
    recipes,
    setRecipes,
    update,
    setUpdate,
    updateRecipeFormIsVisible,
    setUpdateRecipeFormIsVisible,
    updateRecipe,
    setUpdateRecipe,
  } = useContext(RecipesContext);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const rec = await getRecipesByUserId(id);
        setRecipes(rec);
      } catch (error) {}
    };
    getRecipes();
  }, [update]);

  return (
    <>
      <h1 className='profile-title'>Profile info</h1>
      <div className='profile-info'>
        <ProfileCard />
      </div>
      <div className='buttons-content'>
        <button
          type='button'
          className='btn btn-primary'
          onClick={() => {
            setCreateRecipeIsVisible(!createRecipeIsVisible);
            setUpdateRecipeFormIsVisible(false);
          }}
        >
          Create New Recipe
        </button>
        <button
          type='button'
          className='btn btn-primary'
          onClick={() => {
            setCreateRecipeIsVisible(false);
            setUpdateRecipeFormIsVisible(false);
            setUpdate((prev) => prev + 1);
          }}
        >
          My recipes
        </button>
      </div>

      {createRecipeIsVisible && (
        <RecipesForm setUpdate={setUpdate} setCreateRecipeIsVisible={setCreateRecipeIsVisible} />
      )}
      {updateRecipeFormIsVisible && (
        <RecipesForm
          setUpdate={setUpdate}
          recipe={updateRecipe}
          setUpdateRecipeFormIsVisible={setUpdateRecipeFormIsVisible}
        />
      )}

      <div className='container text-center'>
        <div className='recipe-list'>
          {recipes.map((recipe) => {
            return (
              <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
                <div className='recipe-card'>
                  <ProfileRecipeCard
                    recipe={recipe}
                    createRecipeIsVisible={createRecipeIsVisible}
                    setCreateRecipeIsVisible={setCreateRecipeIsVisible}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className='footer-padding'></div>
    </>
  );
}

export default ProfilePage;
