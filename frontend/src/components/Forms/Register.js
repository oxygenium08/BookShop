import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Login.module.css';

const Register = ({ setAuth, setShowRegister }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setAuth(true)
    axios.post('http://127.0.0.1:8000/api/auth/register/', { username, email, password })
      .then((response) => {
        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);
        setShowRegister(false);
      })
    .catch((error) => {
      if (error.response) {
        setError(`Ошибка регистрации: ${error.response.data['email'] || 'Неизвестная ошибка'}`);
      } else if (error.request) {
        setError('Ошибка связи с сервером');
      } else {
        setError('Ошибка регистрации');
      }
    });
  };

  return (
    <div className={styles['login-container']}>
      <h2 style={{textAlign: 'center'}}>Регистрация</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className={styles["form-row"]}>
          <label>Имя пользователя:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles["form-row"]}>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles["form-row"]}>
          <label>Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className={styles["submit-button"]}>Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default Register;
