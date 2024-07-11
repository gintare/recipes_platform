import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { updateCategoryAuth } from '../../services/update';
import { getUserRoleFromToken } from '../../utils/jwt';
import { useForm } from 'react-hook-form';
import { deleteCategory } from '../../services/delete';

import './CategoryCard.css';

const CategoryCard = ({ category, setUpdate }) => {
  const { name, id } = category;
  const [editName, setEditName] = useState(false);
  const { register, setValue, handleSubmit } = useForm();
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');
  const role = getUserRoleFromToken(token);

  const handleCategoryNameChange = async (data) => {
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
      setError(error.message);
    }
  };

  useEffect(() => {
    if (category) {
      setValue('name', category.name);
    }
  }, [category, setValue]);

  return (
    <article className='category-card p-2'>
      {editName && role === 'ADMIN' ? (
        <form
          onSubmit={handleSubmit(handleCategoryNameChange)}
          className='d-flex align-items-center'
        >
          <input {...register('name')} defaultValue={name} className='form-edit-input w-75' />
          <i
            className='bi bi-check-circle-fill accept-category'
            onClick={handleSubmit(handleCategoryNameChange)}
          ></i>
          <i className='bi bi-x-circle-fill cancel-category' onClick={() => setEditName(false)}></i>
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
