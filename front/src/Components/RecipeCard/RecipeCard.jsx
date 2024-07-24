
import Card from 'react-bootstrap/Card';
import LikeButton from '../LikeButton/LikeButton';
import './RecipeCard.css';
import UserContext from '../../Context/UserContext/UserContext';
import { useContext } from 'react';


const RecipeCard = ({ recipe }) => {
  const{id}=useContext(UserContext);

  return (
    <Card className="recipe-card">
      <Card.Img variant="top" src={recipe.image} alt={recipe.title} />
      <Card.Body>
        <Card.Title className="recipe-card-title">{recipe.name}</Card.Title>
        <LikeButton recipeId={recipe.id} userId={id}/>
      </Card.Body>
    </Card>
  );
};

export default RecipeCard;
