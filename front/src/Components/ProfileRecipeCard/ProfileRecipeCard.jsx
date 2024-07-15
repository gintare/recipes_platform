import { useContext, useState } from "react";
import { deleteRecipe } from "../../services/delete";
import RecipesContext from "../../Context/RecipesContentxt/RecipesContext";
import { Upload } from "@mui/icons-material";

function ProfileRecipeCard({recipe, createRecipeIsVisible, setCreateRecipeIsVisible}){
    const[ error, setError] = useState("");
    const {setUpdate, updateRecipeFormIsVisible, setUpdateRecipeFormIsVisible, updateRecipe, setUpdateRecipe} = useContext(RecipesContext);

    const deleteItem = async (recipe_id) => {
      try{
         const rec = await deleteRecipe(recipe_id);
         if(rec == null){
           setError("No records deleted");
         }
         setUpdate((prev) => prev + 1);
      }catch(error){
         setError(error.message)
      }
    }

    return (<>
    <div className="card">
    <img src={recipe.image} className="card-img-top" alt="..."/>
    <div className="card-body">
      <h5 className="card-title">{recipe.name}</h5>
      <p className="card-text">{recipe.description}</p>
      <a href="#" className="btn btn-primary" onClick={() => {
            setCreateRecipeIsVisible(false);
            setUpdateRecipeFormIsVisible(true);
            setUpdateRecipe(recipe)}}>Edit</a>

      <a href="#" className="btn btn-primary" onClick={() => deleteItem(recipe.id)}>Delete</a>
    </div>
    </div>
    {error && <div className='alert alert-danger mt-3'>{error}</div>}
    </>);
}

export default ProfileRecipeCard;