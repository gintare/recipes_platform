import { useParams } from "react-router";
import "./UserRecipesPage.css";
import {
  getIsFollower,
  getOneUser,
  getRecipesByUserId,
} from "../../services/get";
import { useContext, useEffect, useState } from "react";
import RecipeCard from "../../Components/RecipeCard/RecipeCard";
import { deleteFollower } from "../../services/delete";
import UserContext from "../../Context/UserContext/UserContext";
import { followerPost } from "../../services/post";

function UserRecipesPage() {
  const { id: userId } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [userWhat, setUserWhat] = useState({});
  const [follow, setFollow] = useState(true);
  const { id, setUser } = useContext(UserContext);

  const followUser = async () => {
    setFollow((follow) => !follow);
    if (!follow == true) {
      const fol = await followerPost(id, userId);
    } else {
      await deleteFollower(id, userId);
    }
  };

  useEffect(() => {
    const getRecipes = async () => {
      const use = await getOneUser(userId);
      console.log(use);
      setUserWhat(use);
      const rec = await getRecipesByUserId(userId);
      console.log(rec);
      setRecipes(rec);
      if (id) {
        const is = await getIsFollower(id, userId);
        setFollow(is);
      }
    };
    getRecipes();
  }, []);

  return (
    <>
      <h1>UserRecipesPage {userId}</h1>
      <div className="user-card">
        <div className="user-card-image">
          <img
            src={
              userWhat.image
                ? userWhat.image
                : "https://avatar.iran.liara.run/public/job/chef/male"
            }
          />
        </div>
        <div className="user-card-content-info">
          <div className="user-card-name">{userWhat.userName}</div>
          <div className="user-card-button">
            <button
              className={follow ? "follow_button_active" : "follow_button"}
              onClick={followUser}
            >
              {follow ? "Unfollow author" : "Follow author"}
            </button>
          </div>
        </div>
      </div>
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </>
  );
}

export default UserRecipesPage;
