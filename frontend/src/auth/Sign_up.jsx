import React, { useState, useCallback, useEffect } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import cookies from 'js-cookie';

const api_url = import.meta.env.VITE_REACT_APP_SERVER_URL;

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({}); // Store errors separately for each field

  const handleChange = useCallback((e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Remove error for the field when user starts typing
    setErrors((prev) => ({ ...prev, [id]: '' }));
  }, []);

  useEffect(() => {
    const token = cookies.get('auth-token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({}); // Reset errors before submitting
    axios
      .post(`${api_url}/sign-up`, formData, { withcredential: true })
      .then((res) => {
        if (res.data.success) navigate('/sign-in');
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          const { message } = error.response.data;
          // Mapping specific backend errors to the correct input fields
          if (message.includes('name must be unique')) {
            setErrors((prev) => ({ ...prev, name: 'Name is already taken' }));
          } else if (message.includes('Email already exists')) {
            setErrors((prev) => ({ ...prev, email: 'Email is already registered' }));
          } else if (message.includes('Password must be at least')) {
            setErrors((prev) => ({ ...prev, password: message }));
          } else {
            setErrors((prev) => ({ ...prev, general: 'Something went wrong. Please try again.' }));
          }
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full min-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            id="name"
            value={formData.name}
            handleChange={handleChange}
            placeholder="Enter your name"
            label="Name"
            error={errors.name} // Only show error if it exists for name
          />
          <Input
            type="email"
            id="email"
            value={formData.email}
            handleChange={handleChange}
            placeholder="Enter your email"
            label="Email"
            error={errors.email} // Only show error if it exists for email
          />
          <Input
            type="password"
            id="password"
            value={formData.password}
            handleChange={handleChange}
            placeholder="Enter your password"
            label="Password"
            error={errors.password} // Only show error if it exists for password
          />
          {/* {errors.general && <p className="text-red-500 text-sm text-center">{errors.general}</p>} General error */}
          <Button name="Sign Up" />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
