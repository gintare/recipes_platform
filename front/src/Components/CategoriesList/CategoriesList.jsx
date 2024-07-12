import { useContext } from 'react';
import CategoryCard from '../CategoryCard/CategoryCard';
import CategoriesContext from '../../Context/CategoriesContext/CategoriesContext';

import './CategoriesList.css';

const CategoriesList = () => {
  const { setUpdate, categories } = useContext(CategoriesContext);
  return (
    <>
      <div className='categories-list'>
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} setUpdate={setUpdate} />
        ))}
      </div>
    </>
  );
};

export default CategoriesList;
