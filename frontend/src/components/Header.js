import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = ({ auth, onLogout, onLoginClick, cartQuantity, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setSearchQuery('');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };


  return (
    <header className="header">
      <Link to="/" className="header-title">
        <h1>Книжный Магазин</h1>
      </Link>

      <Link to="/contacts" className="header-contacts">
        <p>📞 Контакты</p>
      </Link>

      <div className="header-search">
        <input
          type="text"
          placeholder="Поиск..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

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
            <span className="cart-quantity">{cartQuantity}</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
