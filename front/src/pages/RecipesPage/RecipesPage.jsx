import RecipesForm from "../../Components/Forms/RecipesForm/RecipesForm";

const RecipesPage = () => {
  return (
    <div className='recipes-page'>
      <h2>Hello1</h2>
      <div>
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
