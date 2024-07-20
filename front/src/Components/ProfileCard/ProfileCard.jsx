import { useContext, useEffect, useState } from 'react';
import UserContext from '../../Context/UserContext/UserContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ProfileCard.css';
import { deleteAccount } from '../../services/delete';
import { toast } from 'react-toastify';
import { updateUserAuth } from '../../services/update';
import { useForm } from 'react-hook-form';
import { getUserNames } from '../../services/get';

const ProfileCard = () => {
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState('');
  const { userName, email, image, role, id, logoutHandler, updateUser } = useContext(UserContext);
  const [editUsername, setEditUsername] = useState(false);
  const [existingUsernames, setExistingUsernames] = useState([]);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (userName) {
      setValue('userName', userName);
    }
  }, [userName, setValue]);

  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const usernames = await getUserNames();
        setExistingUsernames(usernames);
      } catch (error) {
        console.error('Error fetching usernames:', error);
      }
    };
    fetchUsernames();
  }, []);

  const handleShow = (user_id) => {
    setUserId(user_id);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleDelete = async () => {
    try {
      setShow(false);
      if (role === 'ADMIN' || userId === id) {
        await deleteAccount(userId);
        logoutHandler();
        toast.success('User deleted successfully');
      } else {
        toast.error('Unauthorized action');
      }
    } catch (error) {
      console.error('Error deleting user:', error.message);
      toast.error('Error deleting user');
    }
  };

  const handleUsernameChange = async (data) => {
    if (existingUsernames.includes(data.username)) {
      toast.error('A user with this username already exists!');
      return;
    }
    try {
      if (role === 'ADMIN' || userId === id) {
        await updateUserAuth(userId, { userName: data.username });
        updateUser();
        setEditUsername(false);
        logoutHandler();
        toast.success('Username updated successfully! Please re-login');
      } else {
        toast.error('Unauthorized action');
      }
    } catch (error) {
      toast.error(`Error updating username: ${error.message}`);
    }
  };

  return (
    <div className='profile-card-container'>
      <article className='profile-card'>
        <div className='profile-img-container'>
          <img className='profile-img' src={image} alt='profile' />
          <button
            type='button'
            className='btn btn-danger delete-button'
            onClick={() => handleShow(id)}
          >
            Delete account
          </button>
        </div>
        <div className='username-email'>
          {editUsername ? (
            <form onSubmit={handleSubmit(handleUsernameChange)}>
              <input
                {...register('username', { required: 'Username is required' })}
                defaultValue={userName}
                className={`form-edit-input w-75 ${errors.username ? 'is-invalid' : ''}`}
              />
              {errors.username && <div className='invalid-feedback'>{errors.username.message}</div>}
              <button type='submit' className='btn btn-link p-0'>
                <i className='bi bi-check-circle-fill accept-username'></i>
              </button>
              <button
                type='button'
                className='btn btn-link p-0'
                onClick={() => setEditUsername(false)}
              >
                <i className='bi bi-x-circle-fill cancel-username'></i>
              </button>
            </form>
          ) : (
            <p className='profile-username'>
              Username: {userName}{' '}
              <i
                className='bi bi-pencil-fill edit-username'
                onClick={() => {
                  setUserId(id);
                  setEditUsername(true);
                }}
              ></i>
            </p>
          )}
          <p className='profile-email'>Email: {email}</p>
        </div>
      </article>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This action will permanently delete all your information from the platform and cannot be
          undone. Are you sure you want to proceed?
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='danger' onClick={handleDelete}>
            Delete Account
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProfileCard;
