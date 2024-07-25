import { createContext, useState } from 'react';

const RecipesContext = createContext();

export const RecipesProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [update, setUpdate] = useState(0);
  const [updateRecipeFormIsVisible, setUpdateRecipeFormIsVisible] = useState(false);
  const [updateRecipe, setUpdateRecipe] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(0);

  return (
    <RecipesContext.Provider
      value={{
        recipes,
        setRecipes,
        filteredRecipes,
        setFilteredRecipes,
        update,
        setUpdate,
        updateRecipeFormIsVisible,
        setUpdateRecipeFormIsVisible,
        updateRecipe,
        setUpdateRecipe,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
};

RecipesContext.displayName = 'RecipesContext';

export default RecipesContext;
