import { useContext, useEffect, useState } from "react";
import UserContext from "../../Context/UserContext/UserContext";
import { getRecipesByUserId } from "../../services/get";
import ProfileRecipeCard from "../../Components/ProfileRecipeCard/ProfileRecipeCard";

function ProfilePage(){
    const [recipies, setRecipies] = useState([]);
    const [error, setError] = useState("");
    const { id } = useContext(UserContext);
    console.log(`User id: ${id}`);

    useEffect(() => {
        const getRecipes = async() => {
          try{
            const rec = await getRecipesByUserId(id);
            setRecipies(rec);
            console.log(rec);
          }catch(error){
            
          }
        }
        getRecipes();
    }, []);


    return(<><h1>Hello profile</h1>
    <button type="button" className="btn btn-primary">Create Recipe</button>
    <button type="button" className="btn btn-primary">Edit Recipe</button>
    <button type="button" className="btn btn-primary">Delete Recipe</button>
    <button type="button" className="btn btn-primary">My recipes</button>

    <div className="container text-center">
      <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
        {recipies.map((recipe) => {
          return <div key={recipe.id} className="col"> <ProfileRecipeCard/> </div>
        })}
      </div>
    </div>
    
    
    </>);
}

export default ProfilePage;