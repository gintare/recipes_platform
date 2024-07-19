import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate, NavLink } from 'react-router-dom';
import { loginPost } from '../../../services/post';

import './LoginForm.css';

const LoginForm = () => {
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const navigate = useNavigate();

  const formSubmitHandler = async (data) => {
    try {
      const response = await loginPost(data);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response));
      reset();
      navigate('/recipes', { replace: true });
      toast.success('Login successfull!');
    } catch (error) {
      toast.error('Invalid email or password');
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <form
      className='row g-3 needs-validation login-form mt-2 p-3 d-flex flex-column align-items-stretch'
      noValidate
      onSubmit={handleSubmit(formSubmitHandler)}
    >
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
        <div className='input-group'>
          <input
            placeholder='Password'
            type={passwordVisible ? 'text' : 'password'}
            className={`form-control password-input ${errors.password ? 'is-invalid' : ''}`}
            id='password'
            {...register('password', {
              required: 'Password is required',
              validate: (value) => value.length >= 8 || 'Password must have at least 8 characters',
            })}
          />
          <span
            className='input-group-text'
            onClick={togglePasswordVisibility}
            style={{ cursor: 'pointer' }}
          >
            <i className={passwordVisible ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'}></i>
          </span>
          {errors.password && <div className='invalid-feedback'>{errors.password.message}</div>}
        </div>
      </div>
      <div className='col-12 col-md-6 col-xl-4 offset-md-3 offset-xl-4 mb-3'>
        <button type='submit' className='btn w-100 login-btn'>
          Login
        </button>
        {error && <div className='alert alert-danger mt-3'>{error}</div>}
      </div>
      <div className='col-12 col-md-6 col-xl-4 offset-md-3 offset-xl-4 mt-3 text-center'>
        <span>
          New user?
          <NavLink to='/register' className='nav-link d-inline nav-register'>
            {' '}
            Create an account!
          </NavLink>
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
