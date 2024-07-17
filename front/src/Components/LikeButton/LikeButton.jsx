import React, { useContext, useState } from 'react';
import RecipesContext from '../../Context/RecipesContentxt/RecipesContext';
import UserContext from '../../Context/UserContext/UserContext';
import { Button } from 'react-bootstrap';

const LikeButton = ({ recipeId }) => {
  const { likedCounts, setLikedCounts, likedRecipes, setLikedRecipes } = useContext(RecipesContext);
  const { isLoggedIn } = useContext(UserContext);
  const [isLiked, setIsLiked] = useState(likedRecipes.includes(recipeId));

  const handleLike = () => {
    if (!isLoggedIn) return;

    if (isLiked) {
      setLikedRecipes(likedRecipes.filter(id => id !== recipeId));
      setLikedCounts({ ...likedCounts, [recipeId]: likedCounts[recipeId] - 1 });
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
