import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getIsFollower, getOneCategory, getOneRecipe } from "../../services/get";
import "./RecipeDetailsPage.css";
import UserContext from "../../Context/UserContext/UserContext";
import { followerPost } from "../../services/post";

function RecipeDetailsPage() {
  const { id: recipeId } = useParams();
  const [recipe, setRecipe] = useState({});
  const [category, setCategory] = useState({});
  const [error, setError] = useState("");
  const { id } = useContext(UserContext);
  const [follow, setFollow] = useState(true);

  //console.log("recipe Id = " + recipeId);

  const followUser = async () => {
    //console.log("follow me");
    setFollow((follow) => !follow);
    console.log("follow me follow = "+follow);
    if(!follow == true){
       const fol = await followerPost(id, recipe.userId);
    }
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
        console.log(is);
        setFollow(is);
      } catch (error) {
        setError(error.message);
      }
    };
    getRecipe();
  }, []);

  return (
    <>
      <h1>Hello Recipe = {recipeId}</h1>
      <div className="container-lg">container</div>
      <div className="container text-center">
        <div className="row">
          <div className="col-sm-2 image-content">
            <img src={recipe.image} alt="recipe_photo" />
          </div>
          <div className="col">
            {recipe.name}
            <br />
            Descrption: {recipe.description}
            <br />
            Instructions: {recipe.instructions}
            <br />
            Recipe category: {category.name}
            <br />
            Ingredients:
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
          <div className="col-sm-2">Like Likes button</div>
          <div className="col-sm-2">Add to favorites</div>
          <div className="col">Author :  follow authors + {recipe.userId} + {id} <button className={follow? "follow_button_active" : "follow_button"} onClick={followUser}>Follow user</button></div>
        </div>
      </div>
    </>
  );
}

export default RecipeDetailsPage;
