import { useContext, useEffect, useState } from "react";
import UserContext from "../../Context/UserContext/UserContext";
import { getRecipesByUserId } from "../../services/get";
import ProfileRecipeCard from "../../Components/ProfileRecipeCard/ProfileRecipeCard";
import RecipesForm from "../../Components/Forms/RecipesForm/RecipesForm";
import RecipesContext from "../../Context/RecipesContentxt/RecipesContext";

function ProfilePage(){
    //const [recipies, setRecipies] = useState([]);
    const [error, setError] = useState("");
    //const [update, setUpdate] = useState(0);
    const [createRecipeIsVisible, setCreateRecipeIsVisible] = useState(false);
    const { id } = useContext(UserContext);
    const {recipes, setRecipes, update, setUpdate, updateRecipeFormIsVisible, setUpdateRecipeFormIsVisible, updateRecipe, setUpdateRecipe} = useContext(RecipesContext);
    console.log(`User id: ${id}`);

    useEffect(() => {
        const getRecipes = async() => {
          try{
            const rec = await getRecipesByUserId(id);
            setRecipes(rec);
            console.log(rec);
          }catch(error){
            
          }
        }
        getRecipes();
    }, [update]);


    return(<><h1>Hello profile</h1>
    <button type="button" className="btn btn-primary" onClick={() => {
      setCreateRecipeIsVisible(!createRecipeIsVisible);
      setUpdateRecipeFormIsVisible(false);
      }}>Create New Recipe</button>
      {/* <button type="button" className="btn btn-primary">Edit Recipe</button>
      <button type="button" className="btn btn-primary">Delete Recipe</button>
       */}
       <button type="button" className="btn btn-primary" onClick={() => {
      setCreateRecipeIsVisible(false);
      setUpdateRecipeFormIsVisible(false);
      setUpdate((prev) => prev+1);
      }}>My recipes</button>

    {createRecipeIsVisible && <RecipesForm setUpdate={setUpdate}/>}
    {updateRecipeFormIsVisible && <RecipesForm setUpdate={setUpdate} recipe={updateRecipe}/>}

    <div className="container text-center">
      <div className="row row-cols-2 row-cols-lg-3 g-2 g-lg-3">
        {recipes.map((recipe) => {
          return <div key={recipe.id} className="col"> <ProfileRecipeCard recipe={recipe} createRecipeIsVisible={createRecipeIsVisible} setCreateRecipeIsVisible={setCreateRecipeIsVisible} /> </div>
        })}
      </div>
    </div>
    
    
    </>);
}

export default ProfilePage;