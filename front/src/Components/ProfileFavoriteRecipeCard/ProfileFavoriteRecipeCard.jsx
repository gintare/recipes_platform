import "./ProfileFavoriteRecipeCard.css";
import { Link } from "react-router-dom";

function ProfileFavoriteRecipeCard({ favoriteRecipe }) {
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
              {favoriteRecipe.recipeAmountOfLikes} likes
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}

export default ProfileFavoriteRecipeCard;
