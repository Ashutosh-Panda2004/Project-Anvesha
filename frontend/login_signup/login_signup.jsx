import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import binarybg from '/src/assets/binarybg.mp4';
import { useNavigate } from 'react-router-dom';
import './responsive-styles.css'; // Import your CSS

function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    phone: '',
    email: '',
    username: '',
    country: '',
    state: '',
    city: '',
    profession: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { loginWithRedirect, isAuthenticated } = useAuth0();
  
  const formRef = useRef(null);
  const errorRef = useRef(null);
  const formContainerRef = useRef(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/text_editor');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, dob, phone, email, username, country, state, city, profession, password } = formData;
    if (!email || !password || (isLogin && !email)) {
      return 'Email and password are required';
    }
    if (!isLogin && (!name || !dob || !phone || !username || !country || !state || !city || !profession)) {
      return 'All fields are required for sign up';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');

    try {
      let response;
      if (isLogin) {
        response = await axios.post('http://localhost:3000/api/login', {
          identifier: formData.email || formData.username,
          password: formData.password
        });
      } else {
        response = await axios.post('http://localhost:3000/api/signup', formData);
      }

      console.log('Authentication successful', response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      navigate('/text_editor');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  useEffect(() => {
    gsap.fromTo(
      formContainerRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );
  }, []);

  useEffect(() => {
    if (error) {
      gsap.fromTo(
        errorRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power1.out' }
      );
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative">
      {/* <video
        className="absolute inset-0 w-full h-full object-cover"
        src={binarybg}
        autoPlay
        loop
        muted
      ></video> */}
      <div ref={formContainerRef} className="relative bg-black p-6 rounded-lg shadow-lg w-full max-w-md h-auto flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-4 text-center">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>
        <div className="flex mb-4">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-4 py-2 rounded-l-full ${isLogin ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'} transition-colors`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-4 py-2 rounded-r-full ${!isLogin ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'} transition-colors`}
          >
            Sign Up
          </button>
        </div>
        <form ref={formRef} onSubmit={handleSubmit} className="w-full space-y-4">
          {isLogin ? (
            <>
              <div>
                <label className="block mb-1 text-gray-300">Email or Username</label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-900 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  placeholder="Enter your email or username"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-300">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-gray-900 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block mb-1 text-gray-300">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-900 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-300">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full bg-gray-900 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-300">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-gray-900 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-300">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-900 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-300">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full bg-gray-900 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  placeholder="Choose a username"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-300">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full bg-gray-900 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  placeholder="Enter your country"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-300">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full bg-gray-900 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  placeholder="Enter your state"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-300">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full bg-gray-900 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  placeholder="Enter your city"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-300">Profession</label>
                <input
                  type="text"
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  className="w-full bg-gray-900 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  placeholder="Enter your profession"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-300">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-gray-900 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </>
          )}
          {error && (
            <p ref={errorRef} className="text-red-500 text-sm mb-4">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className='w-full mt-4'>
          <button
            onClick={() => loginWithRedirect()}
            className="w-full bg-red-600 text-white px-4 py-2 rounded-full text-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Login with Google
          </button>
        </div>

        <p className="mt-4 text-center">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button
            className="ml-2 text-blue-400 hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginSignup;
