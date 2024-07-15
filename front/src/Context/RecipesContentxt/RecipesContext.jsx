import { createContext, useState } from 'react';

const RecipesContext = createContext();

export const RecipesProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [update, setUpdate] = useState(0);
  const [updateRecipeFormIsVisible, setUpdateRecipeFormIsVisible] = useState(false);
  const [updateRecipe, setUpdateRecipe] = useState({});

  return (
    <RecipesContext.Provider value={{ recipes, setRecipes, update, setUpdate, updateRecipeFormIsVisible,  setUpdateRecipeFormIsVisible, updateRecipe, setUpdateRecipe}}>
      {children}
    </RecipesContext.Provider>
  );
};

RecipesContext.displayName = 'RecipesContext';

export default RecipesContext;