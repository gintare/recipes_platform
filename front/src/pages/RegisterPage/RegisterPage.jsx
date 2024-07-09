import RegisterForm from '../../Components/Forms/RegisterForm/RegisterForm';
import './RegisterPage.css';

const RegisterPage = () => {
  return (
    <div className='container d-flex justify-content-center align-items-center min-vh-100'>
      <div className='register-page w-100'>
        <h2 className='text-center mb-4'>Register</h2>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
