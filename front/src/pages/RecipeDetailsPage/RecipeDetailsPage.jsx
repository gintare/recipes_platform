import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  getIsFavorite,
  getIsFollower,
  getOneCategory,
  getOneRecipe,
} from "../../services/get";
import "./RecipeDetailsPage.css";
import UserContext from "../../Context/UserContext/UserContext";
import { favoritePost, followerPost } from "../../services/post";
import { deleteFavorite, deleteFollower } from "../../services/delete";
import { BarChartLineFill, HeartFill, Heart } from "react-bootstrap-icons";
import { useForm } from 'react-hook-form';

function RecipeDetailsPage() {
  const { id: recipeId } = useParams();
  const [recipe, setRecipe] = useState({});
  const [category, setCategory] = useState({});
  const [error, setError] = useState("");
  const [favorite, setFavorite] = useState(false);
  const { id, userName } = useContext(UserContext);
  const [follow, setFollow] = useState(true);
  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      text: ''
    },
  });

  //console.log("recipe Id = " + recipeId);

  const followUser = async () => {
    //console.log("follow me");
    setFollow((follow) => !follow);
    console.log("follow me follow = " + follow);
    if (!follow == true) {
      const fol = await followerPost(id, recipe.userId);
    } else {
      await deleteFollower(id, recipe.userId);
    }
  };

  const clickFavoriteHandler = () => {
    //console.log("favorite me");
    setFavorite((favorite) => !favorite);

    if (!favorite) {
      const fav = favoritePost(id, recipe.id);
    } else {
      deleteFavorite(id, recipe.id);
    }
  };

  const onCommentsSubmitClickHandler = (data) => {
    console.log(data);
  }

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const rec = await getOneRecipe(recipeId);
        //console.log(rec);
        //console.log(rec.ingredients);
        setRecipe(rec);
        const cat = await getOneCategory(rec.categoryId);
        //console.log(cat);
        setCategory(cat);
        const is = await getIsFollower(id, rec.userId);
        //console.log(is);
        setFollow(is);

        const isFav = await getIsFavorite(id, rec.id);
        //console.log("isFav = "+isFav);
        setFavorite(isFav);
      } catch (error) {
        setError(error.message);
      }
    };
    getRecipe();
  }, []);

  return (
    <>
      {/* <h1>Hello Recipe = {recipeId}</h1> */}
      <div className="container-lg">container</div>
      <div className="container">
        <div className="row">
          <div className="col-sm-2">Like Likes button</div>
          <div className="col-sm-2">
            {favorite ? (
              <HeartFill color="red" size="36" onClick={clickFavoriteHandler} />
            ) : (
              <Heart color="red" size="36" onClick={clickFavoriteHandler} />
            )}
          </div>
          <div className="col">
            Author : {userName}
            <button
              className={follow ? "follow_button_active" : "follow_button"}
              onClick={followUser}
            >
              {follow ? "You are following author" : "Follow author"}
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2 image-content">
            <img src={recipe.image} alt="recipe_photo" />
          </div>
          <div className="col recipe-info-content">
            <h5 className="card-title">{recipe.name}</h5>
            <br />
            <label htmlFor="description" className="col col-form-label">
              Description:
            </label>
            <div className="col ">{recipe.description}</div>
            <label htmlFor="instructions" className="col col-form-label">
              Instructions:
            </label>
            <div className="col ">{recipe.instructions}</div>
            <label htmlFor="categoryName" className="col col-form-label">
              Recipe category:
            </label>
            <div className="col ">{category.name}</div>
            <label htmlFor="ingredients" className="col col-form-label">
              Ingredients:
            </label>
            <ul>
              {recipe.ingredients &&
                recipe.ingredients.map((ingredient) => (
                  <li key={ingredient.id}>{ingredient.title}</li>
                ))}
            </ul>
            Preparation time : {recipe.timeInMinutes}
          </div>
        </div>
        <div className="row">
          <form noValidate onSubmit={handleSubmit(onCommentsSubmitClickHandler)} >
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Comment text
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              {...register("text", {
                required: 'Comment text is required',
              })}
            ></textarea>
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary mb-3">Comment</button>
          </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default RecipeDetailsPage;
