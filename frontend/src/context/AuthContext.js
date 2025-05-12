import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // grab username from localStorage if it exists
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('username') || null;
  });

  useEffect(() => {
    // keep username in localStorage in sync with state
    if (username) {
      localStorage.setItem('username', username);
    } else {
      localStorage.removeItem('username');
    }
  }, [username]);

  return (
    <AuthContext.Provider value={{ username, setUsername }}>
      {children}
    </AuthContext.Provider>
  );
};

// hook to access auth context
export const useAuthContext = () => useContext(AuthContext);
