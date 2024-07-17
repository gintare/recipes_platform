import { useContext } from 'react';
import UserContext from '../../Context/UserContext/UserContext';
import './ProfileCard.css';

const ProfileCard = () => {
  const { userName, email } = useContext(UserContext);

  return (
    <>
      <article className='profile-card'>
        <div>
          <img
            className='profile-img'
            src='https://i.ebayimg.com/images/g/Vs8AAOSwI-BWPj3R/s-l1600.jpg'
            alt='profile-image'
          />
        </div>
        <div className='username-email'>
          <p className='profile-username'>{userName}</p>
          <p className='profile-email'>{email}</p>
        </div>
      </article>
    </>
  );
};

export default ProfileCard;
