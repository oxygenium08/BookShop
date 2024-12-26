import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = ({ auth, onLogout, onLoginClick }) => {
  return (
    <header className="header">
      <Link to="/" className="header-title">
        <h1>Книжный Магазин</h1>
      </Link>
      <p className="header-phone">📞 +375 (26) 666-66-66</p>

      <div className="header-buttons">
        <button
          className="header-button"
          onClick={auth ? onLogout : onLoginClick}
        >
          {auth ? 'Выход' : 'Войти'}
        </button>


        {auth && (
          <Link to="/cart" className="header-button">
            Корзина   <i class="bi bi-basket3"></i>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
