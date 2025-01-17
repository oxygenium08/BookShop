import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) setAuth(true);
    setLoading(false)
  }, []);

  const handleLogin = () => setAuth(true);
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAuth(false);
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ auth, handleLogin, handleLogout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
