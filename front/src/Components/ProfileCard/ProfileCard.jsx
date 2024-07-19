import { useContext, useState } from 'react';
import UserContext from '../../Context/UserContext/UserContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ProfileCard.css';
import { deleteAccount } from '../../services/delete';
import { toast } from 'react-toastify';

const ProfileCard = () => {
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState('');
  const { userName, email, image, role, id, logoutHandler } = useContext(UserContext);

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
          <p className='profile-username'>Username: {userName}</p>
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
