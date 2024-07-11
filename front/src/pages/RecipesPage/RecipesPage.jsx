import RecipesForm from "../../Components/Forms/RecipesForm/RecipesForm";

const RecipesPage = () => {
  return (
    <div className='recipes-page'>
      <div>
         <div className="col-12 col-md-6 col-xl-4 offset-md-3 offset-xl-4 mb-3">
          <h1>Recipe register</h1>
        </div>
        <RecipesForm/>
        {/* <form >
          <div class="mb-3">
            <label for="recipeName" class="form-label">Email address</label>
            <input type="name" class="form-control" id="recipeName" aria-describedby="recipeName"/>
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
          </div>
        </form> */}
      </div>
    </div>
  );
};

export default RecipesPage;
