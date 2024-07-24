// LikeButton.jsx
import { useState, useEffect, useContext } from 'react';
import { addLike, removeLike, checkUserLiked, getRecipeLikes } from '../../services/Likes';
import { Button } from 'react-bootstrap';
import UserContext from '../../Context/UserContext/UserContext';

const LikeButton = ({ recipeId, userId }) => {
  const { isLoggedIn } = useContext(UserContext);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  
  useEffect(() => {
    const fetchLikes = async () => {
      

      try {
        if (!recipeId) {
          console.error('No recipe ID provided');
          return;
        }

        const likes = await getRecipeLikes(recipeId);
        setLikeCount(likes);

        if (isLoggedIn && userId) {
          const userLiked = await checkUserLiked(recipeId, userId);
          setLiked(userLiked);
        }
      } catch (error) {
        console.error('Failed to fetch like status or count', error);
      }
    };

    fetchLikes();
  }, [recipeId, userId, isLoggedIn]);

  const handleLikeClick = async () => {
    if (!userId) {
      console.error('User ID is not provided');
      return;
    }

    try {
      if (liked) {
        await removeLike(recipeId, userId);
        setLiked(false);
        setLikeCount(prevCount => prevCount - 1);
      } else {
        await addLike(recipeId, userId);
        setLiked(true);
        setLikeCount(prevCount => prevCount + 1);
      }
    } catch (error) {
      console.error('Failed to update like status', error);
    }
  };

  return (
    <div>
      {isLoggedIn && (
        <Button onClick={handleLikeClick} variant={liked ? 'primary' : 'outline-primary'}>
          {liked ? 'Unlike' : 'Like'}
        </Button>
      )}
      <span>{likeCount} Likes</span>
    </div>
  );
};

export default LikeButton;
