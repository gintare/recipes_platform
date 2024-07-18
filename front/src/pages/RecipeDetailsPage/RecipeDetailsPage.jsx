import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOneCategory, getOneRecipe } from "../../services/get";
import "./RecipeDetailsPage.css";

function RecipeDetailsPage() {
  const { id: recipeId } = useParams();
  const [recipe, setRecipe] = useState({});
  const [category, setCategory] = useState({});
  const [error, setError] = useState("");
  //console.log("recipe Id = " + recipeId);

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
          <div className="col">Author :  follow authors</div>
        </div>
      </div>
    </>
  );
}

export default RecipeDetailsPage;
