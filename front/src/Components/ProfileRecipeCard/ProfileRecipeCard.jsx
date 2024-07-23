import { useContext, useState } from 'react';
import { deleteRecipe } from '../../services/delete';
import RecipesContext from '../../Context/RecipesContentxt/RecipesContext';
import './ProfileRecipeCard.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function ProfileRecipeCard({ recipe, createRecipeIsVisible, setCreateRecipeIsVisible }) {
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [recipeId, setRecipeId] = useState('');
  const {
    setUpdate,
    updateRecipeFormIsVisible,
    setUpdateRecipeFormIsVisible,
    updateRecipe,
    setUpdateRecipe,
  } = useContext(RecipesContext);

  const handleShow = (recipe_id) => {
    try {
      setRecipeId(recipe_id);
      setShow(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteItem = async () => {
    try {
      setShow(false);
      setCreateRecipeIsVisible(false);
      setUpdateRecipeFormIsVisible(false);
      const rec = await deleteRecipe(recipeId);
      if (rec == null) {
        setError('No records deleted');
      }
      toast.success('Recipe has been deleted');
      setUpdate((prev) => prev + 1);
    } catch (error) {
      setError(error.message);
    }
  };
  const handleClose = () => setShow(false);

  return (
    <>
      <div className='card'>
        <Link to={`/recipe/${recipe.id}`}>
        <img src={recipe.image} className='card-img-top' alt='recipe image' />
        </Link>
        <div className='card-body'>
          <h5 className='card-title'>{recipe.name}</h5>
          {/* <p className="card-text">{recipe.description}</p> */}
          <a
            href='#'
            className='edit-button btn btn-primary'
            onClick={() => {
              setCreateRecipeIsVisible(false);
              setUpdateRecipeFormIsVisible(true);
              setUpdateRecipe(recipe);
            }}
          >
            Edit
          </a>

          <Button variant='primary' onClick={() => handleShow(recipe.id)}>
            Delete
          </Button>
        </div>
      </div>
      {error && <div className='alert alert-danger mt-3'>{error}</div>}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Recipe Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to delete this recipe?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={deleteItem}>
            Delete Recipe
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProfileRecipeCard;
