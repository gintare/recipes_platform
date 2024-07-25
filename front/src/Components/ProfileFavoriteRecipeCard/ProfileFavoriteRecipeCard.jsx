import "./ProfileFavoriteRecipeCard.css";
import { Link } from "react-router-dom";
import LikeButton from "../LikeButton/LikeButton";
import UserContext from '../../Context/UserContext/UserContext';
import RecipesContext from '../../Context/RecipesContentxt/RecipesContext';
import { useContext } from 'react';

function ProfileFavoriteRecipeCard({ favoriteRecipe }) {
  const { id } = useContext(UserContext);
  const { recipe } = useContext(RecipesContext);
  
  console.log('User ID:', id);
  console.log('Recipe:', recipe);

  return (
    <>
      <Link to={`/recipe/${favoriteRecipe.recipeId}`}>
        <div className="card favorites-card-content">
          <img
            src={favoriteRecipe.recipeImage}
            className="card-img-top"
            alt="recipe image"
          />
          <div className="card-body">
            <h5 className="card-title">{favoriteRecipe.recipeName}</h5>
            <p className="card-text">
              Preparation time, min : {favoriteRecipe.recipeTimeInMinutes}
            </p>
            <p className="card-text">
              {recipe && id && <LikeButton recipeId={recipe.id} userId={id} />}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}

export default ProfileFavoriteRecipeCard;
