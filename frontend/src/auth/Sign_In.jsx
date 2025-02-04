import React, { useState, useCallback, useEffect } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import cookies from 'js-cookie'

const api_url = import.meta.env.VITE_REACT_APP_SERVER_URL

const SignIn = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        password: ''
    })
    const [error, setError] = useState({});

    const handleChange = useCallback((e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
        // Remove error for the field when user starts typing
        setError((prev) => ({ ...prev, [id]: '' }));
    }, []);

    useEffect(() => {
        const token = cookies.get('auth-token');
        if (token) {
            navigate('/dashboard');
        }
        else {
            navigate('/sign-in')
        }
    }, [navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError({});
        axios.post(`${api_url}/sign-in`, formData, { withcredential: true })
            .then((res) => {
                if (res.data.success === true) {
                    const token = res.data.token
                    cookies.set('auth-token', token, { expires: 7, path: '' })
                    navigate('/dashboard')
                }
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    const { message } = error.response.data;

                    setError((prev) => ({
                        ...prev,
                        email: message.includes('Email does not exist!') ? 'Email not registered!' : prev.email,
                        password: message.includes('Invalid credentials!') ? 'Invalid password!' : prev.password,
                        general: !message.includes('Email does not exist!') && !message.includes('Invalid credentials!')
                            ? 'Something went wrong. Please try again.'
                            : '',
                    }));
                }
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full min-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        type="email"
                        id="email"
                        value={formData.email}
                        handleChange={handleChange}
                        placeholder="Enter your email"
                        label="Email"
                        error={error.email}
                    />
                    <Input
                        type="password"
                        id="password"
                        value={formData.password}
                        handleChange={handleChange}
                        placeholder="Enter your password"
                        label="Password"
                        error={error.password}
                    />
                    <Button name='Sign In' />
                </form>
            </div>
        </div>
    );
};

export default SignIn;