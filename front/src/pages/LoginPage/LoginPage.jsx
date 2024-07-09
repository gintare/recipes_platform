import LoginForm from '../../Components/Forms/LoginForm/LoginForm';
import './LoginPage.css';

const LoginPage = () => {
  return (
    <div className='container d-flex justify-content-center align-items-center min-vh-100'>
      <div className='login-page w-100'>
        <h2 className='text-center mb-4'>Login</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
