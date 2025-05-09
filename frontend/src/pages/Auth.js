import React, { useState } from 'react';
import { signIn, signUp } from '../api/auth';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState('');
  const { setUsername } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const userData = {
      username: form.username,
      password: form.password, // must match backend User.java field name
    };
    console.log(`Submitting to /${isSignUp ? 'signup' : 'signin'} with:`, userData);
    try {
      if (isSignUp) {
        const res = await signUp(userData);
        console.log('Sign-up response:', res);
        setMessage('Sign-up successful!');
      } else {
        const res = await signIn(userData);
        console.log('Sign-in response:', res);
        setUsername(res.data.username);
        navigate('/');
      }
    } catch (err) {
      console.error('Error during auth request:', err);
      setMessage('Authentication failed.');
    }
  };

  return (
    <div className="auth-page">
      <h2>{isSignUp ? 'Create Account' : 'Sign In'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
      </form>
      {message && <p>{message}</p>}
      <p>
        {isSignUp ? 'Already have an account?' : 'No account?'}{' '}
        <span className="toggle-link" onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? 'Sign In' : 'Sign Up'}
        </span>
      </p>
    </div>
  );
}

export default Auth;
