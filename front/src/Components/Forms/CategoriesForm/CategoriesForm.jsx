import { toast } from 'react-toastify';
import { postCategory } from '../../../services/post';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CategoriesContext from '../../../Context/CategoriesContext/CategoriesContext';
import { getAllCategories } from '../../../services/get';
import './CategoriesForm.css';

const CategoriesForm = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { setUpdate } = useContext(CategoriesContext);
  const [error, setError] = useState('');
  const [existingCategory, setExistingCategory] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
    },
  });

  const fetchCategories = async () => {
    try {
      const categories = await getAllCategories();
      setExistingCategory(categories);
    } catch (error) {
      setError(error.message);
      toast.error('Error fetching categories');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const formSubmitHandler = async (data) => {
    const categoryExists = existingCategory.some(
      (category) => category.name.toLowerCase() === data.name.toLowerCase()
    );

    if (categoryExists) {
      toast.error('Category already exists!');
      return;
    }

    try {
      const response = await postCategory(data);
      setUpdate((update) => update + 1);
      setIsFormOpen(false);
      reset();
      toast.success('Category added!');
      return response;
    } catch (error) {
      setError(error.message);
      toast.error('Error creating category');
    }
  };

  return (
    <div className='d-flex flex-column add-category-container'>
      <button
        className='add-category-btn btn btn-primary mb-3'
        onClick={() => setIsFormOpen(!isFormOpen)}
      >
        Add new category
      </button>
      {isFormOpen && (
        <form
          className='needs-validation register-form mt-2 d-flex flex-column align-items-center'
          noValidate
          onSubmit={handleSubmit(formSubmitHandler)}
        >
          <div className='mb-3'>
            <input
              placeholder='Category name'
              type='text'
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              id='name'
              {...register('name', {
                required: 'Category name is required',
                validate: (value) => value.trim() !== '' || 'Category name cannot be empty',
              })}
            />
            {errors.name && <div className='invalid-feedback'>{errors.name.message}</div>}
          </div>

          <button type='submit' className='btn btn-success submit-category-btn w-100'>
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default CategoriesForm;
