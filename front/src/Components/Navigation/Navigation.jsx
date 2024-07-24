import { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../../Context/UserContext/UserContext';
import { toast } from 'react-toastify';
import RecipesContext from '../../Context/RecipesContentxt/RecipesContext';
import './Navigation.css';
import { getAllCategories } from '../../services/get';

const Navigation = () => {
  const { isLoggedIn, logoutHandler, userName, role } = useContext(UserContext);
  const { setFilteredRecipes, recipes } = useContext(RecipesContext);
  const [searchText, setSearchText] = useState('');
  const [sortOption, setSortOption] = useState('name');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let filtered = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchText.toLowerCase())
    );

    if (sortOption) {
      filtered.sort((a, b) => {
        if (a[sortOption] < b[sortOption]) return -1;
        if (a[sortOption] > b[sortOption]) return 1;
        return 0;
      });
    }

    setFilteredRecipes(filtered);
    
    const getCategories = async () => {
       const cat = await getAllCategories();
       setCategories(cat);
    }
    getCategories();

  }, [searchText, sortOption, setFilteredRecipes, recipes]);

  const accountPath = role === 'ADMIN' ? '/admin' : '/profile';

  return (
    <nav className='navbar navbar-expand-lg'>
      <div className='container-fluid'>
        <NavLink className='navbar-brand text-light' to='/'>
          <img src='/code_bakers.png' alt='logo' className='logo' />
        </NavLink>

        <button
          className='navbar-toggler mb-2'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNavAltMarkup'
          aria-controls='navbarNavAltMarkup'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
          <form className='d-flex mt-2 mb-2 align-items-center' role='search'>
            <input
              className='form-control'
              type='search'
              placeholder='Search title...'
              aria-label='Search'
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </form>

          <select class="categories-select form-select mb-3" aria-label="Large select example">
            <option selected>Select recipe category</option>
            {categories.map((category) => {
              return <option value={category.id}>{category.name}</option>
            })}
          </select>

          <div className='navbar-nav ms-auto text-end gap-2'>
            {isLoggedIn ? (
              <>
                <NavLink className='username w-100' to={accountPath}>
                  Account: {userName}
                </NavLink>
                <NavLink
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  to='/recipes'
                >
                  Recipes
                </NavLink>
                <button
                  className='logout'
                  onClick={() => {
                    logoutHandler();
                    toast.success('You have been logged out successfully.');
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  to='/recipes'
                >
                  Recipes
                </NavLink>
                <NavLink
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  to='/login'
                >
                  Login
                </NavLink>

                <NavLink
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  to='/register'
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
