import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  getCommentsByRecipe,
  getIsFavorite,
  getIsFollower,
  getOneCategory,
  getOneRecipe,
  getOneUser,
} from "../../services/get";
import "./RecipeDetailsPage.css";
import UserContext from "../../Context/UserContext/UserContext";
import { commentPost, favoritePost, followerPost } from "../../services/post";
import {
  deleteComment,
  deleteFavorite,
  deleteFollower,
} from "../../services/delete";
import { BarChartLineFill, HeartFill, Heart } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
<<<<<<< HEAD
import NotFoundPage from "../NotFoundPage/NotFoundPage";
=======
>>>>>>> 88a9aa0e33743b0cea617421457c98939bfd8804

function RecipeDetailsPage() {
  const { id: recipeId } = useParams();
  const [recipe, setRecipe] = useState({});
  const [category, setCategory] = useState({});
  const [error, setError] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [comments, setComments] = useState([]);
  const [recipeCreatorUserName, setRecipeCreatorUserName] = useState("");
  const [update, setUpdate] = useState(0);
<<<<<<< HEAD
  const { id, userName, isLoggedIn } = useContext(UserContext);
=======
  const { id, userName } = useContext(UserContext);
>>>>>>> 88a9aa0e33743b0cea617421457c98939bfd8804
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
      text: "",
    },
  });

  // console.log("user id = "+id);
  //console.log("recipe Id = " + recipeId);

  const followUser = async () => {
    //console.log("follow me");
    setFollow((follow) => !follow);
    //console.log("follow me follow = " + follow);
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
    //console.log(recipe.id)
    //console.log(data);
    const postData = commentPost(id, recipe.id, data);
    //console.log(postData);
<<<<<<< HEAD
    reset();
=======
>>>>>>> 88a9aa0e33743b0cea617421457c98939bfd8804
    setUpdate((prev) => prev + 1);
  };

  const deleteCommentClickHandler = (commentId) => {
    //console.log("commentId = "+commentId);
    deleteComment(commentId);
    setUpdate((prev) => prev + 1);
  };

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const rec = await getOneRecipe(recipeId);
<<<<<<< HEAD
        // console.log(rec);
=======
        //console.log(rec);
>>>>>>> 88a9aa0e33743b0cea617421457c98939bfd8804
        //console.log(rec.ingredients);
        setRecipe(rec);
        const cat = await getOneCategory(rec.categoryId);
        //console.log(cat);
        setCategory(cat);
<<<<<<< HEAD
        const userCreator = await getOneUser(rec.userId);
        //console.log(userCreator);
        setRecipeCreatorUserName(userCreator.userName);

        if(id){
          const is = await getIsFollower(id, rec.userId);
          //console.log(is);
          setFollow(is);
          const isFav = await getIsFavorite(id, rec.id);
          //console.log("isFav = "+isFav);
          setFavorite(isFav);
          const comm = await getCommentsByRecipe(rec.id);
          setComments(comm);
        }
=======
        const is = await getIsFollower(id, rec.userId);
        //console.log(is);
        setFollow(is);

        const isFav = await getIsFavorite(id, rec.id);
        //console.log("isFav = "+isFav);
        setFavorite(isFav);

        const comm = await getCommentsByRecipe(rec.id);
        setComments(comm);

        const userCreator = await getOneUser(rec.userId);
        //console.log(userCreator);
        setRecipeCreatorUserName(userCreator.userName);
>>>>>>> 88a9aa0e33743b0cea617421457c98939bfd8804
      } catch (error) {
        setError(error.message);
      }
    };
    getRecipe();
  }, [update]);

  return (
    <>
<<<<<<< HEAD
      <div className="container-lg"></div>
      <div className="container">
        <div className="favorites-row-content row">
          {isLoggedIn && (
            <>
              <div className="col-sm-2">Like Likes button</div>
              <div className="col-sm-2">
                {favorite ? (
                  <HeartFill
                    color="red"
                    size="36"
                    onClick={clickFavoriteHandler}
                  />
                ) : (
                  <Heart color="red" size="36" onClick={clickFavoriteHandler} />
                )}
              </div>
              <div className="col">
                Author : {recipeCreatorUserName}
                <button
                  className={follow ? "follow_button_active" : "follow_button"}
                  onClick={followUser}
                >
                  {follow ? "You are following author" : "Follow author"}
                </button>
              </div>
            </>
          )}
        </div>
        <div className="row">
          <div className="col-md-2 image-content">
            <img src={recipe.image} alt="recipe_photo" />
          </div>
=======
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
            Author : {recipeCreatorUserName}
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
>>>>>>> 88a9aa0e33743b0cea617421457c98939bfd8804
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
<<<<<<< HEAD
            <ul id="ingredients">
=======
            <ul>
>>>>>>> 88a9aa0e33743b0cea617421457c98939bfd8804
              {recipe.ingredients &&
                recipe.ingredients.map((ingredient, index) => (
                  <li key={index} value={ingredient.id}>
                    {ingredient.title}
                  </li>
                ))}
            </ul>
            Preparation time : {recipe.timeInMinutes}
          </div>
        </div>
        {isLoggedIn && 
        <>
        <div className="row">
          <form
            noValidate
            onSubmit={handleSubmit(onCommentsSubmitClickHandler)}
          >
            <div className="mb-3">
              <label htmlFor="commentsTextarea" className="form-label">
                Comment text
              </label>
              <textarea
                className="form-control"
                id="commentsTextarea"
                rows="3"
                {...register("text", {
                  required: "Comment text is required",
                })}
              ></textarea>
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary mb-3">
                Comment
              </button>
            </div>
          </form>
        </div>
        {comments.length > 0 ? "Comments:" : ""}
        {comments.map((comment) => {
          return (
            <div key={comment.id} className="row">
<<<<<<< HEAD
              <div key={comment.id} className="mb-3">
=======
              <div className="mb-3">
>>>>>>> 88a9aa0e33743b0cea617421457c98939bfd8804
                &#62; {comment.text}{" "}
                {id == comment.userId && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteCommentClickHandler(comment.id);
                    }}
                    className="btn btn-primary mb-3"
                  >
                    Delete 🗑️
                  </button>
                )}
              </div>
              <div></div>
            </div>
          );
        })}
<<<<<<< HEAD
        </>
        }
        
=======
>>>>>>> 88a9aa0e33743b0cea617421457c98939bfd8804
        <div className="footer_padding"></div>
      </div>
    </>
  );
}

export default RecipeDetailsPage;