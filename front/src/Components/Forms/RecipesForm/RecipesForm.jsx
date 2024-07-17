import { useForm } from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';
import { getAllCategories } from '../../../services/get';
import IngredientsTable from './IngredientsTable ';
import { recipePost } from '../../../services/post';
import { Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import UserContext from '../../../Context/UserContext/UserContext';
import RecipesContext from '../../../Context/RecipesContentxt/RecipesContext';
import { updateRecipe } from '../../../services/update';

const RecipesForm = ({ recipe }) => {
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const { update, setUpdate } = useContext(RecipesContext);
  const { id } = useContext(UserContext);

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
      name: '',
      image: '',
      description: '',
      instructions: '',
      timeInMinutes: 0,
      categoryId: 0,
      category: {},
      ingredients: [{ title: '', orderNumber: 0 }],
    },
  });

  const deleteEmptyIngredient = (ingredients) => {
    if (ingredients.length == 1) {
      if (ingredients[0].title === '') {
        ingredients.splice(0, 1);
      }
    }
    return ingredients;
  };

  const formSubmitHandler = async (data) => {    
    try {
      data.ingredients = deleteEmptyIngredient(data.ingredients);

      const hasEmptyTitle = data.ingredients.some((ingredient) => ingredient.title.trim() === '');
      if (hasEmptyTitle) {
        throw new Error('Ingredient titles cannot be empty');
      }

      if (data.ingredients.length == 0) {
        throw new Error('No ingredients found, please add atleast one ingredient');
      } else {
        setError('');
      }

      if (data.categoryId == 0) {
        data.categoryId = categories[0].id;
      }

      if (recipe) {
        const reci = await updateRecipe(data.categoryId, recipe.id, data);
        setUpdate((prev) => prev + 1);
        console.log(reci);
        toast.success('Recipe has been updated');
      } else {
        console.log(data);
        const recipe = await recipePost(data.categoryId, id, data);
        setUpdate((prev) => prev + 1);
        toast.success('Recipe has been created');
        reset();
        setIngredients([]);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
    // console.log(event.target.value);
    // setValue("categoryId", event.target.value);
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categor = await getAllCategories();
        if (categor.lenght == 0) {
          throw new Error('no categories found');
        }
        setCategories(categor);
        if (recipe) {
          setValue('name', recipe.name, { shouldValidate: true });
          setValue('image', recipe.image, { shouldValidate: true });
          setValue('description', recipe.description, { shouldValidate: true });
          setValue('instructions', recipe.instructions, {
            shouldValidate: true,
          });
          setValue('timeInMinutes', recipe.timeInMinutes, {
            shouldValidate: true,
          });
          setValue('categoryId', recipe.categoryId, { shouldValidate: true });
          setValue('ingredients', recipe.ingredients, { shouldValidate: true });
          setIngredients(recipe.ingredients);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    getCategories();
  }, [recipe, setValue]);

  return (
    <>
      <form
        className='row g-3 needs-validation register-form mt-2 d-flex flex-column align-items-stretch'
        noValidate
        onSubmit={handleSubmit(formSubmitHandler)}
      >
        <div className='col-12 col-md-6 col-xl-4 offset-md-3 offset-xl-4 mb-3'>
          <label htmlFor='name' className='form-label'>
            Recipe Name
          </label>
          <input
            type='text'
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            id='name'
            maxLength={40}
            {...register('name', {
              required: 'Recipe name is required',
              maxLength: {
                value: 40,
                message: 'Recipe name cannot exceed 40 characters'
              },
              validate: (value) => value.trim() !== '' || 'Recipe name cannot be empty',
            })}
          />
          {errors.name && <div className='invalid-feedback'>{errors.name.message}</div>}
        </div>

        <div className='col-12 col-md-6 col-xl-4 offset-md-3 offset-xl-4 mb-3'>
          <label htmlFor='image' className='form-label'>
            Recipe image file
          </label>
          <input
            type='text'
            id='image'
            className={`form-control ${errors.image ? 'is-invalid' : ''}`}
            aria-label='image file url'
            placeholder='Recipe image url...'
            {...register('image', {
              required: 'Recipe image is required',
              validate: (value) => value.trim() !== '' || 'Recipe image cannot be empty',
            })}
          />
          {errors.image && <div className='invalid-feedback'>{errors.image.message}</div>}
        </div>
        <div className='col-12 col-md-6 col-xl-4 offset-md-3 offset-xl-4 mb-3'>
          <label htmlFor='description' className='form-label'>
            Description
          </label>
          <textarea
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
            id='description'
            placeholder='Recipe description here'
            {...register('description', {
              required: 'Recipe description is required',
              validate: (value) => value.trim() !== '' || 'Recipe description cannot be empty',
            })}
          ></textarea>
          {errors.description && (
            <div className='invalid-feedback'>{errors.description.message}</div>
          )}
        </div>

        <div className='col-12 col-md-6 col-xl-4 offset-md-3 offset-xl-4 mb-3'>
          <label htmlFor='instructions' className='form-label'>
            Instructions
          </label>
          <textarea
            className={`form-control ${errors.instructions ? 'is-invalid' : ''}`}
            id='instructions'
            placeholder='Recipe instructions here'
            {...register('instructions', {
              required: 'Recipe instructions is required',
              validate: (value) => value.trim() !== '' || 'Recipe instructions cannot be empty',
            })}
          ></textarea>
          {errors.instructions && (
            <div className='invalid-feedback'>{errors.instructions.message}</div>
          )}
        </div>

        <div className='col-12 col-md-6 col-xl-4 offset-md-3 offset-xl-4 mb-3'>
          <label htmlFor='category' className='form-label'>
            Category
          </label>
          <Controller
            name='categoryId'
            control={control}
            render={({ field: { onChange, value } }) => (
              <select
                // labelId="category"
                className='form-select form-select-md mb-3'
                id='category'
                value={value}
                label='Category'
                onChange={onChange}
                // {...register("categoryId")}
              >
                {categories.map((category) => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            )}
          />
        </div>

        <div className='col-12 col-md-6 col-xl-4 offset-md-3 offset-xl-4 mb-3'>
          <IngredientsTable
            ingredients={ingredients}
            setIngredients={setIngredients}
            register={register}
          />
          {errors.ingredients && (
            <div className='invalid-feedback'>{errors.ingredients.message}</div>
          )}
        </div>

        <div className='col-12 col-md-6 col-xl-4 offset-md-3 offset-xl-4 mb-3'>
          <label htmlFor='timeInMinutes' className='form-label'>
            Preparation time, min
          </label>
          <input
            type='number'
            className={`form-control ${errors.timeInMinutes ? 'is-invalid' : ''}`}
            id='timeInMinutes'
            {...register('timeInMinutes', {
              required: 'Recipe preparation time is required',
              pattern: {
                value: /^[0-9]+$/i,
                message: 'Preparation time must be a number',
              },
              validate: {
                notEmpty: (value) =>
                  value.toString().trim() !== '' || 'Recipe preparation time cannot be empty',
                notZero: (value) =>
                  value.toString().trim() !== '0' || 'Recipe preparation time cannot be 0',
              },
            })}
          />
          {errors.timeInMinutes && (
            <div className='invalid-feedback'>{errors.timeInMinutes.message}</div>
          )}
        </div>

        <div className='col-12 col-md-6 col-xl-4 offset-md-3 offset-xl-4 mb-3'>
          <button type='submit' className='btn submit-btn w-100'>
            {recipe ? 'Update recipe' : 'Add recipe'}
          </button>
          {error && <div className='alert alert-danger mt-3'>{error}</div>}
        </div>
      </form>
    </>
  );
};

export default RecipesForm;
