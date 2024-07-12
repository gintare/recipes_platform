import { createContext, useState } from 'react';

const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [update, setUpdate] = useState(0);

  return (
    <CategoriesContext.Provider value={{ categories, setCategories, update, setUpdate }}>
      {children}
    </CategoriesContext.Provider>
  );
};

CategoriesContext.displayName = 'CategoriesContext';

export default CategoriesContext;
