import { useContext, useEffect, useState } from 'react';
import UserContext from '../../Context/UserContext/UserContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ProfileCard.css';
import { deleteAccount } from '../../services/delete';
import { toast } from 'react-toastify';
import { updateUserAuth } from '../../services/update';
import { useForm } from 'react-hook-form';
import { getOneUser, getUserEmails, getUserNames } from '../../services/get';

const ProfileCard = () => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState('');

  const {
    userName,
    email,
    image,
    role,
    id,
    logoutHandler,
    updateUser,
    updateUserAuthContext,
    user,
    setUser,
  } = useContext(UserContext);

  const [editUsername, setEditUsername] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editImage, setEditImage] = useState(false);

  const [existingUsernames, setExistingUsernames] = useState([]);
  const [existingEmails, setExistingEmails] = useState([]);

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleShowDeleteConfirmation = (user_id) => {
    setUserId(user_id);
    setShow(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOneUser(id);
        setUser(data);
      } catch (error) {
        console.error('Error fetching user details:', error);
        toast.error('Error fetching user details');
      } finally {
        setIsLoading(false);
      }
    };

    const fetchUsernames = async () => {
      try {
        const usernames = await getUserNames();
        setExistingUsernames(usernames);
      } catch (error) {
        console.error('Error fetching usernames:', error);
      }
    };

    const fetchEmails = async () => {
      try {
        const emails = await getUserEmails();
        setExistingEmails(emails);
      } catch (error) {
        console.error('Error fetching emails:', error);
      }
    };

    fetchUsernames();
    fetchEmails();
    fetchData();
  }, [id, setUser]);

  useEffect(() => {
    if (user) {
      setValue('userName', user.userName);
      setValue('image', user.image);
      setValue('email', user.email);
    }
  }, [user, setValue]);

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

  // const handleUsernameChange = async (data) => {
  //   try {
  //     const response = await updateUserAuth(id, { userName: data.userName });
  //     if (response.success) {
  //       updateUser();
  //       setUser((prevUser) => ({ ...prevUser, userName: data.userName }));
  //       toast.success('Username updated successfully!');
  //     } else {
  //       throw new Error('Failed to update username');
  //     }
  //   } catch (error) {
  //     toast.error(`Error updating username: ${error.message}`);
  //   } finally {
  //     setEditUsername(false);
  //   }
  // };

  const handleUsernameChange = async (data) => {
    if (existingUsernames.includes(data.userName)) {
      toast.error('A user with this username already exists!');
      return;
    }
    try {
      if (role === 'ADMIN' || userId === id) {
        const response = await updateUserAuth(id, { userName: data.userName });
        if (response.token) {
          updateUser();
          setUser((prevUser) => ({ ...prevUser, userName: data.userName }));
          updateUserAuthContext(response.token);
        }
        const usernames = await getUserNames();
        setExistingUsernames(usernames);
        // setTimeout(() => {
        //   window.location.reload();
        // }, 800);
        toast.success('Username updated successfully!');
      } else {
        toast.error('Unauthorized action');
      }
    } catch (error) {
      toast.error(`Error updating username: ${error.message}`);
    } finally {
      setEditUsername(false);
    }
  };

  // const handleEmailChange = async (data) => {
  //   try {
  //     const response = await updateUserAuth(id, { email: data.email });
  //     if (response.success) {
  //       updateUser();
  //       setUser((prevUser) => ({ ...prevUser, email: data.email }));
  //       toast.success('Email updated successfully!');
  //     } else {
  //       throw new Error('Failed to update email');
  //     }
  //   } catch (error) {
  //     toast.error(`Error updating email: ${error.message}`);
  //   } finally {
  //     setEditEmail(false);
  //   }
  // };

  const handleEmailChange = async (data) => {
    if (existingEmails.includes(data.email)) {
      toast.error('A user with this email already exists!');
      return;
    }
    try {
      if (role === 'ADMIN' || userId === id) {
        const response = await updateUserAuth(id, { email: data.email });
        if (response.token) {
          updateUser();
          setUser((prevUser) => ({ ...prevUser, email: data.email }));
          updateUserAuthContext(response.token);
        }
        toast.success('Email updated successfully!');
      } else {
        toast.error('Unauthorized action');
      }
    } catch (error) {
      toast.error(`Error updating email: ${error.message}`);
    } finally {
      setEditEmail(false);
    }
  };

  // const handleImageChange = async (data) => {
  //   try {
  //     const response = await updateUserAuth(id, { image: data.image });
  //     if (response.success) {
  //       updateUser();
  //       setUser((prevUser) => ({ ...prevUser, image: data.image }));
  //       toast.success('Image updated successfully!');
  //     } else {
  //       throw new Error('Failed to update image');
  //     }
  //   } catch (error) {
  //     toast.error(`Error updating image: ${error.message}`);
  //   } finally {
  //     setEditImage(false);
  //   }
  // };

  const handleImageChange = async (data) => {
    try {
      if (role === 'ADMIN' || userId === id) {
        const response = await updateUserAuth(id, { image: data.image });
        if (response.token) {
          updateUser();
          setUser((prevUser) => ({ ...prevUser, image: data.image }));
          updateUserAuthContext(response.token);
        }
        toast.success('Image updated successfully!');
      } else {
        toast.error('Unauthorized action');
      }
    } catch (error) {
      toast.error(`Error updating image: ${error.message}`);
    } finally {
      setEditImage(false);
    }
  };

  return (
    <div className='profile-card-container'>
      <article className='profile-card'>
        <div className='profile-img-container'>
          <img
            className={`profile-img ${editImage ? 'faded-image' : ''}`}
            src={image}
            alt='profile'
          />
          {editImage ? (
            <div className='image-edit-container'>
              <input
                className='input-image'
                placeholder='Enter image URL'
                {...register('image', { required: 'Image URL is required' })}
                onChange={(e) => setValue('image', e.target.value)}
              />
              <button
                type='submit'
                className='btn btn-link p-0'
                onClick={handleSubmit(handleImageChange)}
              >
                <i className='bi bi-check-circle-fill accept-image'></i>
              </button>
              <button
                type='button'
                className='btn btn-link p-0'
                onClick={() => setEditImage(false)}
              >
                <i className='bi bi-x-circle-fill cancel-image'></i>
              </button>
              <button
                type='button'
                className='btn btn-link p-0'
                onClick={() => reset({ image: '' })}
              >
                <i className='bi bi-stars clear-image'></i>
              </button>
              {errors.image && <div className='error'>{errors.image.message}</div>}
            </div>
          ) : (
            <button
              className='edit-image-btn'
              onClick={() => {
                setUserId(id);
                setEditImage(true);
                setEditUsername(false);
                setEditEmail(false);
              }}
            >
              Edit Image
            </button>
          )}
          {!editImage && (
            <button
              type='button'
              className='btn btn-danger delete-button'
              onClick={() => handleShowDeleteConfirmation(id)}
            >
              Delete account
            </button>
          )}
        </div>
        <div className='username-email'>
          {editUsername ? (
            <form onSubmit={handleSubmit(handleUsernameChange)}>
              <input
                {...register('userName', { required: 'Username is required' })}
                defaultValue={userName}
                className={`form-edit-input w-75 active-edit-username ${
                  errors.userName ? 'is-invalid' : ''
                }`}
              />
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
              {errors.userName && (
                <div className='invalid-feedback error-username'>{errors.userName.message}</div>
              )}
            </form>
          ) : (
            <p className='profile-username'>
              Username: {userName}{' '}
              <i
                className='bi bi-pencil-fill edit-username'
                onClick={() => {
                  setUserId(id);
                  setEditUsername(true);
                  setEditEmail(false);
                  setEditImage(false);
                }}
              ></i>
            </p>
          )}
          {editEmail ? (
            <form onSubmit={handleSubmit(handleEmailChange)}>
              <input
                {...register('email', { required: 'Email is required' })}
                defaultValue={email}
                className={`form-edit-input w-75 active-edit-email ${
                  errors.email ? 'is-invalid' : ''
                }`}
              />
              <button type='submit' className='btn btn-link p-0'>
                <i className='bi bi-check-circle-fill accept-email'></i>
              </button>
              <button
                type='button'
                className='btn btn-link p-0'
                onClick={() => setEditEmail(false)}
              >
                <i className='bi bi-x-circle-fill cancel-email'></i>
              </button>
              {errors.email && (
                <div className='invalid-feedback error-email'>{errors.email.message}</div>
              )}
            </form>
          ) : (
            <p className='profile-email'>
              Email: {email}{' '}
              <i
                className='bi bi-pencil-fill edit-email'
                onClick={() => {
                  setUserId(id);
                  setEditEmail(true);
                  setEditUsername(false);
                  setEditImage(false);
                }}
              ></i>
            </p>
          )}
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
