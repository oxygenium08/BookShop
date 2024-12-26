import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = ({ setAuth, setTokens, setShowLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = { username, password };

    axios.post('http://127.0.0.1:8000/api/auth/token/', userData)
      .then(response => {
        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);
        setAuth(true);
        setShowLogin(false);
      })
      .catch(error => {
        if (error.response && error.response.data) {
          setError(error.response.data.detail || 'Ошибка авторизации.');
        } else {
          setError('Ошибка подключения. Попробуйте позже.');
        }
        console.error("Login error:", error);
      });
  };

  return (
    <div className="login-container">
      <h2>Авторизация</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Имя пользователя:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label>Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">Войти</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;
