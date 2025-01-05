import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
import axios from 'axios';  // Import axios

function AuthPage({ updateUsername }) {  // Receive updateUsername as a prop
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false); // Default to Sign In
  const [message, setMessage] = useState(""); // To display success/failure message

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      setError("Please fill in both fields.");
      return;
    }

    const userData = {
      username,
      pword: password, // Match the backend field for password
    };

    try {
      let response;
      if (isSignUp) {
        response = await axios.post('http://localhost:8080/api/users/signup', userData);
        setMessage("Sign-up successful!");  // Display sign-up success message
      } else {
        // Check if username exists
        const userResponse = await axios.get(`http://localhost:8080/api/users/${username}`);
        
        if (!userResponse.data) {
          setMessage("Username not found!");
        } else {
          // If username exists, check if password matches
          const storedPassword = userResponse.data.pword;
          if (storedPassword === password) {
            setMessage("Sign-in successful!");  // Password matches
            updateUsername(username);  // Update the username in App.js
          } else {
            setMessage("Incorrect password!");  // Password mismatch
          }
        }
      }
    } catch (error) {
      setMessage('There was an error during the process!');
      console.error('Error:', error);
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
      {message && <p>{message}</p>}  {/* Display the message from backend */}
      <p>
        {isSignUp ? "Already have an account? " : "Don't have an account? "}
        <span
          onClick={() => setIsSignUp(!isSignUp)}
          className="toggle-link"
        >
          {isSignUp ? "Sign In" : "Sign Up"}
        </span>
      </p>
      <Link to="/" className="return-button">Return to Weather</Link>
    </div>
  );
}

export default AuthPage;
