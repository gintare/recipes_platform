import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getCommentsByRecipe,
  getIsFavorite,
  getIsFollower,
  getOneCategory,
  getOneRecipe,
  getOneUser,
} from '../../services/get';
import './RecipeDetailsPage.css';
import UserContext from '../../Context/UserContext/UserContext';
import { commentPost, favoritePost, followerPost } from '../../services/post';
import { deleteComment, deleteFavorite, deleteFollower } from '../../services/delete';
import { HeartFill, Heart } from 'react-bootstrap-icons';
import { useForm } from 'react-hook-form';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import LikeButton from '../../Components/LikeButton/LikeButton';

function RecipeDetailsPage() {
  const { id: recipeId } = useParams();
  const [recipe, setRecipe] = useState({});
  const [category, setCategory] = useState({});
  const [error, setError] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [comments, setComments] = useState([]);
  const [recipeCreatorUserName, setRecipeCreatorUserName] = useState('');
  const [update, setUpdate] = useState(0);
  const { id, userName, isLoggedIn } = useContext(UserContext);
  const [follow, setFollow] = useState(true);
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      text: '',
    },
  });

  const followUser = async () => {
    setFollow((follow) => !follow);
    if (!follow == true) {
      const fol = await followerPost(id, recipe.userId);
    } else {
      await deleteFollower(id, recipe.userId);
    }
  };

  const clickFavoriteHandler = () => {
    setFavorite((favorite) => !favorite);

    if (!favorite) {
      const fav = favoritePost(id, recipe.id);
    } else {
      deleteFavorite(id, recipe.id);
    }
  };

  const onCommentsSubmitClickHandler = (data) => {
    const postData = commentPost(id, recipe.id, data);
    reset();
    setUpdate((prev) => prev + 1);
  };

  const deleteCommentClickHandler = (commentId) => {
    deleteComment(commentId);
    setUpdate((prev) => prev + 1);
  };

  const popoverHoverFocus = (
    <Popover id='popover-trigger-hover-focus' title='Popover bottom'>
      Add to <strong>favorites</strong>
    </Popover>
  );

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const rec = await getOneRecipe(recipeId);
        setRecipe(rec);
        const cat = await getOneCategory(rec.categoryId);
        setCategory(cat);
        const userCreator = await getOneUser(rec.userId);
        setRecipeCreatorUserName(userCreator.userName);

        if (id) {
          const is = await getIsFollower(id, rec.userId);
          setFollow(is);
          const isFav = await getIsFavorite(id, rec.id);
          setFavorite(isFav);
          const comm = await getCommentsByRecipe(rec.id);
          setComments(comm);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    getRecipe();
  }, [update]);

  return (
    <>
      <button className='recipes-link' onClick={() => navigate(-1)}>
        <i className='bi bi-arrow-left-circle back-button'>
          <span className='back-text'>Go back</span>
        </i>
      </button>
      <div className='container'>
      <div className='like-button-details-page'>
            <LikeButton recipeId={recipe.id} userId={id} />
            </div>
        {isLoggedIn && (
          <div className='row'>
            <div className='col-sm-2'>
              {favorite ? (
                <HeartFill color='red' size='36' onClick={clickFavoriteHandler} />
              ) : (
                <OverlayTrigger
                  trigger={['hover', 'focus']}
                  placement='top'
                  overlay={popoverHoverFocus}
                >
                  <Heart color='red' size='36' onClick={clickFavoriteHandler} />
                </OverlayTrigger>
              )}
            </div>
            
            <div className='col'>
              <div className='author-content'>Author : {recipeCreatorUserName}
              </div>
              <div className='author-button-content'>
                <button
                  className={follow ? 'follow_button_active' : 'follow_button'}
                  onClick={followUser}
                >
               {follow ? 'You are following author' : 'Follow author'}
                </button>
              </div>
            </div>
          </div>
        )}
        
        <div className='row'>
          <div className='col-md-2 image-content'>
            <img src={recipe.image} alt='recipe_photo' />
          </div>
          <div className='col recipe-info-content'>
            <h5 className='card-title'>{recipe.name}</h5>
            <br />
            <label htmlFor='description' className='col col-form-label'>
              Description:
            </label>
            <div className='col '>{recipe.description}</div>
            <label htmlFor='instructions' className='col col-form-label'>
              Instructions:
            </label>
            <div className='col '>{recipe.instructions}</div>
            <label htmlFor='categoryName' className='col col-form-label'>
              Recipe category:
            </label>
            <div className='col '>{category.name}</div>
            <label htmlFor='ingredients' className='col col-form-label'>
              Ingredients:
            </label>
            <ul id='ingredients'>
              {recipe.ingredients &&
                recipe.ingredients.map((ingredient, index) => (
                  <li key={index} value={ingredient.id}>
                    {ingredient.title}
                  </li>
                ))}
            </ul>
            Preparation time : {recipe.timeInMinutes}
          </div>
        </div>
        {isLoggedIn && (
          <>
            <div className='row'>
              <form noValidate onSubmit={handleSubmit(onCommentsSubmitClickHandler)}>
                <div className='mb-3'>
                  <label htmlFor='commentsTextarea' className='form-label'>
                    Comment text
                  </label>
                  <textarea
                    className='form-control'
                    id='commentsTextarea'
                    rows='3'
                    {...register('text', {
                      required: 'Comment text is required',
                    })}
                  ></textarea>
                </div>
                <div className='col-auto'>
                  <button type='submit' className='btn btn-primary mb-3'>
                    Comment
                  </button>
                </div>
              </form>
            </div>
            {comments.length > 0 ? 'Comments:' : ''}
            {comments.map((comment) => {
              return (
                <div key={comment.id} className='row'>
                  <div key={comment.id} className='mb-3'>
                    &#62; {comment.text}{' '}
                    {id == comment.userId && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteCommentClickHandler(comment.id);
                        }}
                        className='btn btn-primary mb-3'
                      >
                        Delete 🗑️
                      </button>
                    )}
                  </div>
                  <div></div>
                </div>
              );
            })}
          </>
        )}

        <div className='footer_padding'></div>
      </div>
    </>
  );
}

export default RecipeDetailsPage;
