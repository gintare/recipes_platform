import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOneRecipe } from "../../services/get";
import "./RecipeDetailsPage.css";

function RecipeDetailsPage() {
  const { id: recipeId } = useParams();
  const [recipe, setRecipe] = useState({});
  const [error, setError] = useState("");
  console.log("recipe Id = " + recipeId);

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const rec = await getOneRecipe(recipeId);
        // console.log(rec);
        console.log(rec.ingredients);
        // for(ingred in rec.ingredients){
        //   console.log(ingred);
        // }
        setRecipe(rec);
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
            {recipe.description}
            <br />
            {recipe.instructions}
            <br />
            <ul>
              {recipe.ingredients &&
                recipe.ingredients.map((ingredient) => (
                  <li key={ingredient.id}>{ingredient.title}</li>
                ))}
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-2">1 of 3</div>
          <div className="col-sm-2">2 of 3</div>
          <div className="col">3 of 3</div>
        </div>
      </div>
    </>
  );
}

export default RecipeDetailsPage;
