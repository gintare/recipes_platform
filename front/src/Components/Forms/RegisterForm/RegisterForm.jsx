import { useForm } from 'react-hook-form';
import './RegisterForm.css';
import { useState, useRef, useContext, useEffect } from 'react';
import { postRegister } from '../../../services/post';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserContext from '../../../Context/UserContext/UserContext';
import { getUserEmail } from '../../../services/get';

const RegisterForm = () => {
  const [error, setError] = useState('');
  const { updateUser } = useContext(UserContext);
  const [existingUserEmail, setExistingUserEmail] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
  });

  const password = useRef({});
  password.current = watch('password', '');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsersEmail = async () => {
      const userEmail = await getUserEmail();
      setExistingUserEmail(userEmail);
    };

    fetchUsersEmail();
  }, []);

  const formSubmitHandler = async (data) => {
    if (existingUserEmail.includes(data.email)) {
      toast.error('A user with this email already exists!');
      return;
    }

    try {
      const dataCopy = { ...data };
      delete dataCopy['repeatPassword'];
      await postRegister(dataCopy);
      updateUser();
      reset();
      toast.success('User created successfully!');
      navigate('/login');
    } catch (error) {
      toast.error('Error creating user');
    }
  };

  return (
    <form
      className='row g-3 needs-validation register-form mt-2 d-flex flex-column align-items-stretch'
      noValidate
      onSubmit={handleSubmit(formSubmitHandler)}
    >
      <div className='col-12 col-md-6 col-xl-4 offset-md-3 offset-xl-4 mb-3'>
        <input
          placeholder='Username'
          type='text'
          className={`form-control ${errors.userName ? 'is-invalid' : ''}`}
          id='userName'
          {...register('userName', {
            required: 'User name is required',
            validate: (value) => value.trim() !== '' || 'User name cannot be empty',
          })}
        />
        {errors.userName && <div className='invalid-feedback'>{errors.userName.message}</div>}
      </div>
      <div className='col-12 col-md-6 col-xl-4 offset-md-3 offset-xl-4 mb-3'>
        <input
          placeholder='Email'
          type='email'
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          id='email'
          {...register('email', {
            required: 'Email is required',
            validate: (value) => value.trim() !== '' || 'Email cannot be empty',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address format',
            },
          })}
        />
        {errors.email && <div className='invalid-feedback'>{errors.email.message}</div>}
      </div>
      <div className='col-12 col-md-6 col-xl-4 offset-md-3 offset-xl-4 mb-3'>
        <input
          placeholder='Password'
          type='password'
          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          id='password'
          {...register('password', {
            required: 'Password is required',
            validate: {
              hasUpperCase: (value) =>
                /[A-Z]/.test(value) || 'Password must include at least one uppercase letter.',
              hasLowerCase: (value) =>
                /[a-z]/.test(value) || 'Password must include at least one lowercase letter.',
              hasNumber: (value) =>
                /\d/.test(value) || 'Password must include at least one number.',
              minLength: (value) =>
                value.length >= 8 || 'Password must have at least 8 characters.',
            },
          })}
        />
        {errors.password && <div className='invalid-feedback'>{errors.password.message}</div>}
      </div>
      <div className='col-12 col-md-6 col-xl-4 offset-md-3 offset-xl-4 mb-3'>
        <input
          placeholder='Repeat password'
          type='password'
          className={`form-control ${errors.repeatPassword ? 'is-invalid' : ''}`}
          id='repeatPassword'
          {...register('repeatPassword', {
            required: 'Repeat your password',
            validate: (value) => value === password.current || 'Passwords do not match',
          })}
        />
        {errors.repeatPassword && (
          <div className='invalid-feedback'>{errors.repeatPassword.message}</div>
        )}
      </div>
      <div className='col-12 col-md-6 col-xl-4 offset-md-3 offset-xl-4 mb-3'>
        <button type='submit' className='btn submit-btn w-100'>
          Register
        </button>
        {error && <div className='alert alert-danger mt-3'>{error}</div>}
      </div>
      <div className='col-12 col-md-6 col-xl-4 offset-md-3 offset-xl-4 mt-3 text-center'>
        <span>
          Already have an account?
          <NavLink to='/login' className='nav-link d-inline nav-login'>
            {' '}
            Login!
          </NavLink>
        </span>
      </div>
    </form>
  );
};

export default RegisterForm;
