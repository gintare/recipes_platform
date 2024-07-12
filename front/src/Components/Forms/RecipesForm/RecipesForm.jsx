import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { getAllCategories } from '../../../services/get';
import IngredientsTable from './IngredientsTable ';
import { recipePost } from '../../../services/post';
import { Controller } from 'react-hook-form';
import { toast } from 'react-toastify';

const RecipesForm = () => {
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [update, setUpdate] = useState(0);

  const {
    register,
    control,
    handleSubmit,
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
      ingredients: [{ title: '' }],
    },
  });

  const formSubmitHandler = (data) => {
    console.log(data);
    try {
      const recipe = recipePost(data.categoryId, data);
      console.log(recipe);
      toast.success('Recipe has been created');
      reset();
      setIngredients([]);
      setUpdate((prev) => prev + 1)
    }catch(error){
       setError(error.message)
    }
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
    console.log(event.target.value);
    // setValue("categoryId", event.target.value);
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categor = await getAllCategories();
        console.log(categor);
        if (categor.lenght == 0) {
          throw new Error('no categories found');
        }
        setCategories(categor);
      } catch (error) {
        setError(error.message);
      }
    };
    getCategories();
  }, [update]);

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
            {...register('name', {
              required: 'Recipe name is required',
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
            className='form-control'
            aria-label='image file url'
            {...register('image')}
          />
        </div>

        <div className='col-12 col-md-6 col-xl-4 offset-md-3 offset-xl-4 mb-3'>
          <label htmlFor='description' className='form-label'>
            Description
          </label>
          <textarea
            className='form-control'
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
            className='form-control'
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
                <option value={0}></option>
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
        </div>

        <div className='col-12 col-md-6 col-xl-4 offset-md-3 offset-xl-4 mb-3'>
          <label htmlFor='timeInMinutes' className='form-label'>
            Preparation time, min
          </label>
          <input

            type="number"
            className={`form-control ${errors.timeInMinutes ? "is-invalid" : ""}`}
            id="timeInMinutes"
            {...register("timeInMinutes", {
              required: "Recipe preparation time is required",
              pattern: /^[0-9]+$/i,
              validate: (value) =>
                value.trim() !== "" || "Recipe preparation time cannot be empty",
              validate: (value) =>
                value.trim() !== "0" || "Recipe preparation time cannot be 0",

            })}
          />
          {errors.timeInMinutes && (
            <div className='invalid-feedback'>{errors.timeInMinutes.message}</div>
          )}
        </div>

        <div className='col-12 col-md-6 col-xl-4 offset-md-3 offset-xl-4 mb-3'>
          <button type='submit' className='btn submit-btn w-100'>
            Register
          </button>
          {error && <div className='alert alert-danger mt-3'>{error}</div>}
        </div>
      </form>
      {/* <Toaster position='top-left' richColors /> */}
    </>
  );
};

export default RecipesForm;
