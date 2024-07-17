import Carousel from 'react-bootstrap/Carousel';
import './RecipeCarousel.css';
import { useEffect, useState } from 'react';
import { getAllRecipes } from '../../services/get';

const RecipeCarousel = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllRecipes();
        console.log('Data from API:', data);
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const limitedRecipes = recipes.slice(0, 6);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <>
      {recipes.length === 0 ? (
        <div className="no-recipes-message">There are no recipes</div>
      ) : (
        <Carousel>
          {limitedRecipes.map((recipe, index) => (
            <Carousel.Item key={index}>
              <img
                src={recipe.image}
                alt={recipe.name}
                className="recipe-carousel-image"
              />
              <Carousel.Caption>
                <h3>{truncateText(recipe.name, 40)}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default RecipeCarousel;
