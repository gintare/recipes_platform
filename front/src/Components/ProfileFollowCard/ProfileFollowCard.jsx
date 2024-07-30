import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './ProfileFollowCard.css'
import { Link } from 'react-router-dom';


function ProfileFollowCard({followingWhat}) {
    return (<>
    <Link to={`/user/recipes/${followingWhat.followWhatUserId}`} >
    <Card className="profile-follow-content">
      <Card.Img variant="top" src={followingWhat.followWhatProfileImage} />
      <Card.Body>
        <Card.Title>{followingWhat.followWhatUserName}</Card.Title>
      </Card.Body>
    </Card>
    </Link></>);
}

export default ProfileFollowCard;