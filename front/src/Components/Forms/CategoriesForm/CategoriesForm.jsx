import { toast } from 'react-toastify';
import { postCategory } from '../../../services/post';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CategoriesContext from '../../../Context/CategoriesContext/CategoriesContext';
import { getCategories } from '../../../services/get';
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
      title: '',
    },
  });

  const fetchCategories = async () => {
    try {
      const categories = await getCategories();
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
      (category) => category.title.toLowerCase() === data.title.toLowerCase()
    );

    if (categoryExists) {
      toast.error('Category already exists');
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
      toast.error('Error adding category');
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
              placeholder='Category title'
              type='text'
              className={`form-control ${errors.title ? 'is-invalid' : ''}`}
              id='title'
              {...register('title', {
                required: 'Category title is required',
                validate: (value) => value.trim() !== '' || 'Category title cannot be empty',
              })}
            />
            {errors.title && <div className='invalid-feedback'>{errors.title.message}</div>}
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
