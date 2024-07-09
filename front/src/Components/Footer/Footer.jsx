import './Footer.css';

const Footer = () => {
  return (
    <div className='footer-container'>
      <div className='footer'>{new Date().getFullYear()} &copy; All rights reserved</div>
    </div>
  );
};

export default Footer;
