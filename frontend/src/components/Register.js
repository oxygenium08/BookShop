import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Register = ({ setAuth, setShowRegister }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/auth/register/', { username, email, password })
      .then((response) => {
        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);
        setAuth(true);  // После успешной регистрации устанавливаем авторизацию
        setShowRegister(false);  // Закрываем форму
      })
    .catch((error) => {
      if (error.response) {
        // Ошибка от сервера
        setError(`Ошибка регистрации: ${error.response.data.detail || 'Неизвестная ошибка'}`);
      } else if (error.request) {
        // Ошибка запроса
        setError('Ошибка связи с сервером');
      } else {
        // Общая ошибка
        setError('Ошибка регистрации');
      }
    });
  };

  return (
    <div className="login-container">
      <h2>Регистрация</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit" className="submit-button">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default Register;
