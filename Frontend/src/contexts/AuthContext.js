// contexts/AuthContext.js
import axios from 'axios';
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:4000/auth/login', { email, password });
        setCurrentUser(response.data.user);
        setToken(response.data.token);
      } catch (error) {
        console.error(error);
      }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await axios.post('http://localhost:4000/auth/signup', { name, email, password });
      setCurrentUser(response.data.user);
  
      // Assuming the token is returned in the response
      const token = response.data.token;
      // Save the token in sessionStorage
      setToken(token);
      sessionStorage.setItem('authToken', token);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    // Clear the token from sessionStorage
    sessionStorage.removeItem('authToken');
  
    // Clear the current user
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        currentUser,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
