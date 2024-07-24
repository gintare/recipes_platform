import Card from 'react-bootstrap/Card';
import './RecipeCard.css';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {

  
  return (
    <Card className="recipe-card">
      <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
      <Card.Img variant="top" src={recipe.image} alt={recipe.title} />
      </Link>
      <Card.Body>
        <Card.Title className="recipe-card-title">{recipe.name}</Card.Title>
        <Card.Text>
          Preparation time: {recipe.timeInMinutes} min
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default RecipeCard;
