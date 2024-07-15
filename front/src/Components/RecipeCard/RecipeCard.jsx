import Card from 'react-bootstrap/Card';
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => {

  
  return (
    <Card className="recipe-card">
      <Card.Img variant="top" src={recipe.image} alt={recipe.title} />
      <Card.Body>
        <Card.Title className="recipe-card-title">{recipe.name}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default RecipeCard;
