
import Card from 'react-bootstrap/Card';
import LikeButton from '../LikeButton/LikeButton';
import './RecipeCard.css';
<<<<<<< HEAD
import { Link } from 'react-router-dom';
=======
import UserContext from '../../Context/UserContext/UserContext';
import { useContext } from 'react';

>>>>>>> caefe775f67c36890856513bc59d9887e325d363

const RecipeCard = ({ recipe }) => {
  const{id}=useContext(UserContext);

  return (
    <Card className="recipe-card">
      <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
      <Card.Img variant="top" src={recipe.image} alt={recipe.title} />
      </Link>
      <Card.Body>
        <Card.Title className="recipe-card-title">{recipe.name}</Card.Title>
<<<<<<< HEAD
        <Card.Text>
          Preparation time: {recipe.timeInMinutes} min
        </Card.Text>
=======
        <LikeButton recipeId={recipe.id} userId={id}/>
>>>>>>> caefe775f67c36890856513bc59d9887e325d363
      </Card.Body>
    </Card>
  );
};

export default RecipeCard;
