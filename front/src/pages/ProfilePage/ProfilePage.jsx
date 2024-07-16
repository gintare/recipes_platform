import { useContext, useEffect, useState } from "react";
import UserContext from "../../Context/UserContext/UserContext";
import { getRecipesByUserId } from "../../services/get";
import ProfileRecipeCard from "../../Components/ProfileRecipeCard/ProfileRecipeCard";
import RecipesForm from "../../Components/Forms/RecipesForm/RecipesForm";
import RecipesContext from "../../Context/RecipesContentxt/RecipesContext";
import "./ProfilePage.css";

function ProfilePage() {
  //const [recipies, setRecipies] = useState([]);
  const [error, setError] = useState("");
  //const [update, setUpdate] = useState(0);
  const [createRecipeIsVisible, setCreateRecipeIsVisible] = useState(false);
  const { id } = useContext(UserContext);
  const {
    recipes,
    setRecipes,
    update,
    setUpdate,
    updateRecipeFormIsVisible,
    setUpdateRecipeFormIsVisible,
    updateRecipe,
    setUpdateRecipe,
  } = useContext(RecipesContext);
  console.log(`User id: ${id}`);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const rec = await getRecipesByUserId(id);
        setRecipes(rec);
        console.log(rec);
      } catch (error) {}
    };
    getRecipes();
  }, [update]);

  return (
    <>
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
            setUpdate((prev) => prev + 1);
          }}
        >
          My recipes
        </button>
      </div>

      {createRecipeIsVisible && <RecipesForm setUpdate={setUpdate} />}
      {updateRecipeFormIsVisible && (
        <RecipesForm setUpdate={setUpdate} recipe={updateRecipe} />
      )}

      <div className="container text-center">
        <div className="recipe-list">
          {recipes.map((recipe) => {
            return (
              <div key={recipe.id} className="recipe-card">
                <ProfileRecipeCard
                  recipe={recipe}
                  createRecipeIsVisible={createRecipeIsVisible}
                  setCreateRecipeIsVisible={setCreateRecipeIsVisible}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="footer-padding"></div>
    </>
  );
}

export default ProfilePage;
