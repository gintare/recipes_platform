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
  const [passwordVisible, setPasswordVisible] = useState(false);

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

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
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
            maxLength: {
              value: 255,
              message: 'Username cannot exceed 255 characters',
            },
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
            validate: {
              notEmpty: (value) => value.trim() !== '' || 'Email cannot be empty',
              emailRegex: (value) =>
                /^(?=.{1,64}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/.test(
                  value
                ) || 'Invalid email address format',
              maxLength: (value) => value.length <= 255 || 'Email cannot exceed 255 characters',
            },
          })}
        />
        {errors.email && <div className='invalid-feedback'>{errors.email.message}</div>}
      </div>
      <div className='col-12 col-md-6 col-xl-4 offset-md-3 offset-xl-4 mb-3'>
        <div className='input-group'>
          <input
            placeholder='Password'
            type={passwordVisible ? 'text' : 'password'}
            className={`form-control password-input ${errors.password ? 'is-invalid' : ''}`}
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
                maxLength: (value) =>
                  value.length <= 255 || 'Password cannot exceed 255 characters',
              },
            })}
          />
          <span className='input-group-text' onClick={togglePasswordVisibility}>
            <i className={passwordVisible ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'}></i>
          </span>
          {errors.password && <div className='invalid-feedback'>{errors.password.message}</div>}
        </div>
      </div>
      <div className='col-12 col-md-6 col-xl-4 offset-md-3 offset-xl-4 mb-3'>
        <div className='input-group'>
          <input
            placeholder='Repeat password'
            type={passwordVisible ? 'text' : 'password'}
            className={`form-control password-input ${errors.password ? 'is-invalid' : ''}`}
            id='repeatPassword'
            {...register('repeatPassword', {
              required: 'Repeat your password',
              validate: {
                matchesOriginal: (value) => value === password.current || 'Passwords do not match',
              },
              maxLength: {
                value: 255,
                message: 'Repeat password cannot exceed 255 characters',
              },
            })}
          />
          <span className='input-group-text' onClick={togglePasswordVisibility}>
            <i className={passwordVisible ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'}></i>
          </span>
          {errors.repeatPassword && (
            <div className='invalid-feedback'>{errors.repeatPassword.message}</div>
          )}
        </div>
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
