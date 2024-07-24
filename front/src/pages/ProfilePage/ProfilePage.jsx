<<<<<<< HEAD
import { useContext, useEffect, useState } from "react";
import UserContext from "../../Context/UserContext/UserContext";
import { getFavoritesByUser, getRecipesByUserId } from "../../services/get";
import ProfileRecipeCard from "../../Components/ProfileRecipeCard/ProfileRecipeCard";
import RecipesForm from "../../Components/Forms/RecipesForm/RecipesForm";
import RecipesContext from "../../Context/RecipesContentxt/RecipesContext";
import "./ProfilePage.css";
import ProfileCard from "../../Components/ProfileCard/ProfileCard";
import { Link, useParams } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import ProfileFavoriteRecipeCard from "../../Components/ProfileFavoriteRecipeCard/ProfileFavoriteRecipeCard";

function ProfilePage() {
  const [error, setError] = useState("");
=======
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../Context/UserContext/UserContext';
import { getRecipesByUserId } from '../../services/get';
import ProfileRecipeCard from '../../Components/ProfileRecipeCard/ProfileRecipeCard';
import RecipesForm from '../../Components/Forms/RecipesForm/RecipesForm';
import RecipesContext from '../../Context/RecipesContentxt/RecipesContext';
import './ProfilePage.css';
import ProfileCard from '../../Components/ProfileCard/ProfileCard';
import { Link, useParams } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';

function ProfilePage() {
  const [error, setError] = useState('');
>>>>>>> 88a9aa0e33743b0cea617421457c98939bfd8804
  const [isLoading, setIsLoading] = useState(true);
  const [createRecipeIsVisible, setCreateRecipeIsVisible] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [myRecipesIsVisible, setMyRecipesIsVisible] = useState(true);
  const { id } = useContext(UserContext);
  const { recipeId } = useParams();
  const {
    recipes,
    setRecipes,
    update,
    setUpdate,
    updateRecipeFormIsVisible,
    setUpdateRecipeFormIsVisible,
    updateRecipe,
    filteredRecipes,
  } = useContext(RecipesContext);

<<<<<<< HEAD
  if (recipes.length === 0 && !sessionStorage.getItem("pageRefreshed")) {
    sessionStorage.setItem("pageRefreshed", "true");
=======
  if (recipes.length === 0 && !sessionStorage.getItem('pageRefreshed')) {
    sessionStorage.setItem('pageRefreshed', 'true');
>>>>>>> 88a9aa0e33743b0cea617421457c98939bfd8804
    window.location.reload();
  }

  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true);
      try {
        const rec = await getRecipesByUserId(id);
        setRecipes(rec);
<<<<<<< HEAD
        const fav = await getFavoritesByUser(id);
        setFavoriteRecipes(fav);
      } catch (error) {
        setError("Failed to fetch recipes.");
        console.error("Error fetching recipes:", error);
=======
      } catch (error) {
        setError('Failed to fetch recipes.');
        console.error('Error fetching recipes:', error);
>>>>>>> 88a9aa0e33743b0cea617421457c98939bfd8804
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, [id, recipeId, update, setRecipes]);

  return (
    <>
      <h1 className="profile-title">Profile info</h1>
      <div className="profile-info">
        <ProfileCard />
      </div>
      <div className="buttons-content">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setCreateRecipeIsVisible(!createRecipeIsVisible);
            setUpdateRecipeFormIsVisible(false);
          }}
        >
          Create New Recipe
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setCreateRecipeIsVisible(false);
            setUpdateRecipeFormIsVisible(false);
            setMyRecipesIsVisible(true);
            setUpdate((prev) => prev + 1);
          }}
        >
          My recipes
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setCreateRecipeIsVisible(false);
            setUpdateRecipeFormIsVisible(false);
            setMyRecipesIsVisible(false);
            setUpdate((prev) => prev + 1);
          }}
        >
          My favorite recipes
        </button>
      </div>

      {createRecipeIsVisible && (
        <RecipesForm
          setUpdate={setUpdate}
          setCreateRecipeIsVisible={setCreateRecipeIsVisible}
        />
      )}
      {updateRecipeFormIsVisible && (
        <RecipesForm
          setUpdate={setUpdate}
          recipe={updateRecipe}
          setUpdateRecipeFormIsVisible={setUpdateRecipeFormIsVisible}
        />
      )}

<<<<<<< HEAD
      {myRecipesIsVisible && 
      <div className="container text-center">
        <div className="recipe-list">
          {isLoading ? (
            <div className="profile-loader">
              <p className="profile-loading-text">Loading...</p>
              <PulseLoader color="var(--primary-blue)" size={20} />
            </div>
          ) : filteredRecipes.length === 0 ? (
            <div className="no-recipes">No recipes found</div>
          ) : (
            filteredRecipes.map((recipe) => (
              <div key={recipe.id} className="recipe-card">
                <ProfileRecipeCard
                  recipe={recipe}
                  createRecipeIsVisible={createRecipeIsVisible}
                  setCreateRecipeIsVisible={setCreateRecipeIsVisible}
                />
              </div>
            ))
          )}
        </div>
      </div>}

      

      <hr />
        My favorite recipes
      <div className="container text-center">
        <div className="recipe-list">
        {favoriteRecipes.map((fRecipe) => {
          return <ProfileFavoriteRecipeCard key={fRecipe.id} favoriteRecipe={fRecipe} />
        })}
=======
      <div className='container text-center'>
        <div className='recipe-list'>
          {isLoading ? (
            <div className='profile-loader'>
              <p className='profile-loading-text'>Loading...</p>
              <PulseLoader color='var(--primary-blue)' size={20} />
            </div>
          ) : filteredRecipes.length === 0 ? (
            <div className='no-recipes'>No recipes found</div>
          ) : (
            filteredRecipes.map((recipe) => (
                <div key={recipe.id} className='recipe-card'>
                  <ProfileRecipeCard
                    recipe={recipe}
                    createRecipeIsVisible={createRecipeIsVisible}
                    setCreateRecipeIsVisible={setCreateRecipeIsVisible}
                  />
                </div>
            ))
          )}
>>>>>>> 88a9aa0e33743b0cea617421457c98939bfd8804
        </div>
      </div>
      <div className="footer-padding"></div>
    </>
  );
}

export default ProfilePage;
