import Card from 'react-bootstrap/Card';
import './RecipeCard.css'

const RecipeCard = ({ recipe }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={recipe.image} alt={recipe.title} />
      <Card.Body>
        <Card.Title>{recipe.title}</Card.Title>
        <Card.Text>{recipe.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default RecipeCard;
