import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function AuthPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false); // Default to Sign In

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!username || !password) {
      setError("Please fill in both fields.");
      return;
    }

    // Normally, here you would send the data to a server
    if (isSignUp) {
      console.log("User Registered:", { username, password });
      alert("Sign up successful!");
    } else {
      console.log("User Signed In:", { username, password });
      alert("Sign in successful!");
    }

    // Clear form and error after submission
    setUsername("");
    setPassword("");
    setError(null);
  };

  return (
    <div className="auth-page">
      <h2>{isSignUp ? "Create an Account" : "Sign In"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
      </form>
      <p>
        {isSignUp ? "Already have an account? " : "Don't have an account? "}
        <span
          onClick={() => setIsSignUp(!isSignUp)}
          className="toggle-link"
        >
          {isSignUp ? "Sign In" : "Sign Up"}
        </span>
      </p>
      <Link to="/" className="return-button">Return to Weather</Link> {/* Add the button */}
    </div>
  );
}

export default AuthPage;
