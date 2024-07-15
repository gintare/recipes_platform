import { useContext } from 'react';
import CategoryCard from '../CategoryCard/CategoryCard';
import CategoriesContext from '../../Context/CategoriesContext/CategoriesContext';
import './CategoriesList.css';

const CategoriesList = () => {
  const { setUpdate, categories } = useContext(CategoriesContext);

  return (
    <div className='container mt-5'>
      <div className='row justify-content-center container-row'>
        {categories.map((category) => (
          <div key={category.id} className='col-8 col-sm-6 col-md-4 col-lg-2 col-xxl-1 mb-4'>
            <CategoryCard category={category} setUpdate={setUpdate} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesList;
