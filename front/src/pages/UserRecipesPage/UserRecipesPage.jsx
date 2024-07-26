import { useParams } from 'react-router';
import './UserRecipesPage.css';
import { getOneUser, getRecipesByUserId } from '../../services/get';
import { useEffect, useState } from 'react';
import RecipeCard from '../../Components/RecipeCard/RecipeCard';

function UserRecipesPage() {
    const { id: userId } = useParams();
    const[ recipes, setRecipes] = useState([]);
    const[ user, setUser] = useState({});

    useEffect(() => {
      const getRecipes = async() => {
        const use = await getOneUser(userId);
        console.log(use);
        setUser(use);
        const rec = await getRecipesByUserId(userId);
        console.log(rec);
        setRecipes(rec);
      }
      getRecipes();
    }, []);

    return (<><h1>UserRecipesPage {userId}</h1>
        <div className="user-card"> 
        <div className='user-card-image'><img src={user.image? user.image : "https://avatar.iran.liara.run/public/job/chef/male"}/></div>
        <div className='user-card-name'>{user.userName}</div>
        </div>
        <div className='recipe-list'>
        {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
      </>);
}

export default UserRecipesPage;