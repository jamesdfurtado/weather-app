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
      password: form.password,
    };
    console.log(`Submitting to /${isSignUp ? 'signup' : 'signin'} with:`, userData);

    try {
      if (isSignUp) {
        // --- SIGN‑UP (create account only) ---
        const res = await signUp(userData);
        console.log('Sign‑up response:', res);
        setMessage(res.data.message || 'Sign‑up successful!');
        // stay on auth page so user can now sign in
      } else {
        // --- SIGN‑IN (log user in) ---
        const res = await signIn(userData);
        console.log('Sign‑in response:', res);

        // Some back‑ends return just a success message.
        // Fall back to the username the user typed if the API
        // doesn’t include res.data.username.
        const name = res.data?.username || userData.username;
        setUsername(name);

        navigate('/');   // go to Home
      }
    } catch (err) {
      console.error('Error during auth request:', err);
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data ||
        err.message ||
        'Authentication failed.';
      setMessage(errorMsg);
    }
  };

  return (
    <>
      <button className="back-arrow" onClick={() => navigate('/')} aria-label="Go back">←</button>

      <div className="auth-page">
        <h2 className="auth-heading">{isSignUp ? 'Create Account' : 'Sign In'}</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            className="auth-input"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            className="auth-input"
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button className="auth-button" type="submit">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        {message && <p className="auth-message">{message}</p>}

        <p className="auth-toggle-text">
          {isSignUp ? 'Already have an account?' : 'No account?'}{' '}
          <span className="toggle-link" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </span>
        </p>
      </div>
    </>
  );
}

export default Auth;
