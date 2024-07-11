import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { updateCategoryAuth } from '../../services/update';
import { getUserRoleFromToken } from '../../utils/jwt';
import './CategoryCards.css';
import { useForm } from 'react-hook-form';
import { deleteCategory } from '../../services/delete';

const CategoryCard = ({ category, setUpdate }) => {
  const { title, id } = category;
  const [editTitle, setEditTitle] = useState(false);
  const { register, setValue, handleSubmit } = useForm();
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');
  const role = getUserRoleFromToken(token);

  const handleCategoryTitleChange = async (data) => {
    try {
      if (role === 'ADMIN') {
        await updateCategoryAuth(`categories/${category.id}`, { title: data.title });
        setUpdate((prev) => !prev);
        setEditTitle(false);
      }
    } catch (error) {
      console.error('Error updating title:', error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const confirmed = window.confirm(`Are you sure you want to delete category ${title}?`);
      if (confirmed && role === 'ADMIN') {
        await deleteCategory(id);
        setUpdate((update) => update + 1);
      }
    } catch (error) {
      toast.error('Error deleting category:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (category) {
      setValue('title', category.title);
    }
  }, [category, setValue]);

  return (
    <div className='card'>
      <div className='card-body'>This is some text within a card body.</div>
    </div>
  );
};

export default CategoryCard;
