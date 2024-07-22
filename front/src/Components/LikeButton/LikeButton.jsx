import React, { useContext, useState } from 'react';
import RecipesContext from '../../Context/RecipesContentxt/RecipesContext';
import UserContext from '../../Context/UserContext/UserContext';
import { Button } from 'react-bootstrap';

const LikeButton = ({ recipeId, userId }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const{isLoggedIn}=useContext(UserContext);
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        // Get the total count of likes for the recipe
        const likes = await getRecipeLikes(recipeId);
        setLikeCount(likes);

        if (isLoggedIn && userId) {
          // Check if the user has liked the recipe
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
  try {
    if (liked) {
      await removeLike(recipeId, userId);
      setLiked(false);
      setLikeCount(prevCount => prevCount - 1);
    } else {
      setLikedRecipes([...likedRecipes, recipeId]);
      setLikedCounts({ ...likedCounts, [recipeId]: (likedCounts[recipeId] || 0) + 1 });
    }
    setIsLiked(!isLiked);
  };

  return (
    <>
      <Button variant={isLiked ? "danger" : "success"} onClick={handleLike} disabled={!isLoggedIn}>
        {isLiked ? "Unlike" : "Like"}
      </Button>
      <span> ({likedCounts[recipeId] || 0})</span>
    </>
  );
};

export default LikeButton;
