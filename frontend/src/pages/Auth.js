import React, { useState, useEffect } from 'react';
import { signIn, signUp, verifyLogin } from '../api/auth';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from '../firebase';

function Auth() {
  const [form, setForm] = useState({ username: '', password: '', phone: '' });
  const [isSignUp, setIsSignUp] = useState(false);
  const [msg, setMsg] = useState('');
  const { setUsername } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    let container = document.getElementById('global-recaptcha');
    if (!container) {
      container = document.createElement('div');
      container.id = 'global-recaptcha';
      document.body.appendChild(container);
    }
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'global-recaptcha', { size: 'invisible' });
      window.recaptchaVerifier.render().then(id => (window.recaptchaWidgetId = id));
    }
  }, []);

  const smsFlow = async phone => {
    if (window.grecaptcha && window.recaptchaWidgetId !== undefined) {
      window.grecaptcha.reset(window.recaptchaWidgetId);
    }
    const confirmation = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
    const code = prompt('Enter the SMS code you received:');
    const cred = await confirmation.confirm(code);
    return cred.user.getIdToken();
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg('');
    try {
      if (isSignUp) {
        const idToken = await smsFlow(form.phone);
        await signUp({ username: form.username, password: form.password, idToken });
        setMsg('Signup successful! Please sign in.');
        setIsSignUp(false);
        setForm({ username: '', password: '', phone: '' });
      } else {
        const { data } = await signIn({ username: form.username, password: form.password });
        const idToken = await smsFlow(data.phone);
        await verifyLogin({ username: form.username, idToken });
        setUsername(form.username);
        nav('/');
      }
    } catch (err) {
      const backend = err.response?.data;
      setMsg(typeof backend === 'string' ? backend : err.message || 'Something went wrong.');
    }
  };

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <>
      <button className="back-arrow" onClick={() => nav('/')} aria-label="Go back">←</button>

      <div className="auth-page">
        <h2 className="auth-heading">{isSignUp ? 'Create Account' : 'Sign In'}</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input className="auth-input" name="username" placeholder="Username" value={form.username} onChange={onChange} required />
          <input className="auth-input" name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} required />
          {isSignUp && (
            <input className="auth-input" name="phone" placeholder="Phone (+15555550100)" value={form.phone} onChange={onChange} required />
          )}
          <button className="auth-button" type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
        </form>

        {msg && <p className="auth-message">{msg}</p>}

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
