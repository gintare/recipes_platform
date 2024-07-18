import { useContext } from 'react';
import UserContext from '../../Context/UserContext/UserContext';
import './ProfileCard.css';

const ProfileCard = () => {
  const { userName, email, image } = useContext(UserContext);  

  return (
    <>
      <article className='profile-card'>
        <div>
          <img className='profile-img' src={image} alt='profile-image' />
        </div>
        <div className='username-email'>
          <p className='profile-username'>Username: {userName}</p>
          <p className='profile-email'>Email:{email}</p>
        </div>
      </article>
    </>
  );
};

export default ProfileCard;
