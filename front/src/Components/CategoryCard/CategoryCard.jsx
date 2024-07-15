import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { updateCategoryAuth } from '../../services/update';
import { getUserRoleFromToken } from '../../utils/jwt';
import { useForm } from 'react-hook-form';
import { deleteCategory } from '../../services/delete';

import './CategoryCard.css';
import { getAllCategories } from '../../services/get';

const CategoryCard = ({ category, setUpdate }) => {
  const { name, id } = category;
  const [editName, setEditName] = useState(false);
  const [existingCategories, setExistingCategories] = useState([]);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const token = localStorage.getItem('token');
  const role = getUserRoleFromToken(token);

  const validateCategoryInput = (value) => {
    if (value.length < 1) {
      toast.error('Category name must be at least 1 character');
      return false;
    }
    if (value.length > 8) {
      toast.error('Category name cannot exceed 8 characters');
      return false;
    }
    if (!/^[a-zA-Z]*$/.test(value)) {
      toast.error('Category name can only contain letters');
      return false;
    }
    return true;
  };

  const handleCategoryNameChange = async (data) => {
    if (!validateCategoryInput(data.name)) {
      return;
    }

    if (
      existingCategories.some(
        (existingCat) => existingCat.name.toLowerCase() === data.name.toLowerCase()
      )
    ) {
      toast.error('This category already exists!');
      return;
    }

    try {
      if (role === 'ADMIN') {
        await updateCategoryAuth(`${category.id}`, { name: data.name });
        setUpdate((prev) => !prev);
        setEditName(false);
        toast.success('Category name updated successfully');
      }
    } catch (error) {
      console.error('Error updating title:', error.message);
      toast.error('Error updating category name');
    }
  };

  const handleDelete = async () => {
    try {
      const confirmed = window.confirm(`Are you sure you want to delete category ${name}?`);
      if (confirmed && role === 'ADMIN') {
        await deleteCategory(id);
        setUpdate((update) => update + 1);
        toast.success('Category deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting category:', error.message);
      toast.error('Error deleting category');
    }
  };

  useEffect(() => {
    if (category) {
      setValue('name', category.name);
    }
  }, [category, setValue]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getAllCategories();
      setExistingCategories(categories);
    };

    fetchCategories();
  }, []);

  return (
    <article className='category-card p-2'>
      {editName && role === 'ADMIN' ? (
        <form
          onSubmit={handleSubmit(handleCategoryNameChange)}
          className='d-flex align-items-center'
        >
          <input
            type='text'
            defaultValue={name}
            // {...register('name', {
            //   required: 'Category name is required',
            //   minLength: { value: 1, message: 'Category name must be at least 1 character long' },
            //   maxLength: { value: 10, message: 'Category name cannot exceed 10 characters' },
            // })}
            {...register('name')}
            className={`form-edit-input w-75 ${errors.name ? 'is-invalid' : ''}`}
          />
          {errors.name && <div className='invalid-feedback'>{errors.name.message}</div>}
          <button type='submit' className='btn btn-link p-0'>
            <i className='bi bi-check-circle-fill accept-category'></i>
          </button>
          <button type='button' className='btn btn-link p-0' onClick={() => setEditName(false)}>
            <i className='bi bi-x-circle-fill cancel-category'></i>
          </button>
        </form>
      ) : (
        <div className='d-flex justify-content-between align-items-center'>
          <div className='category-name'>{name}</div>
          {role === 'ADMIN' && (
            <div>
              <i className='bi bi-pen-fill edit-category' onClick={() => setEditName(true)}></i>
              <i className='bi bi-trash3-fill delete-category' onClick={handleDelete}></i>
            </div>
          )}
        </div>
      )}
    </article>
  );
};

export default CategoryCard;
