import React, { useEffect, useState } from 'react';
import './SearchResultsPage.css';
import $api_token from '../api';
import AddToCartButton from './AddToCartButton';
import { Link } from 'react-router-dom';

const SearchResultsPage = ({ results, onCartUpdate }) => {
  const [cartItems, setCartItems] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await $api_token.get('/cart/api/');
        setCartItems(response.data.items);
      } catch (error) {
        console.error('Ошибка при загрузке корзины:', error);
      }
    };

    fetchCartItems();
  }, []);
  const updateCartItems = (newCartItem) => {
    setCartItems(prevItems => [...prevItems, newCartItem]);
  };
  return (
<>
    <h2>Результаты поиска:</h2>
    <div className="book-list">
      {results.length === 0 ? (
        <p>Ничего не найдено</p>
      ) : (
        results.map(book => (
          <div key={book.id} className="book-card">
            <img src={book.image} alt={book.title} className="book-image" />
            <div>
              <Link to={`/books/${book.id}`} className="book-title">
                <h4>{book.title}</h4>
              </Link>
              <p className="book-author">Автор: {book.author}</p>
              <p className="book-price">Цена: {book.price} руб</p>
            </div>
            <div className="book-card-footer">
            <AddToCartButton
              bookId={book.id}
              isInCart={cartItems.some(item => item.book === book.id)}
              updateCartItems={updateCartItems}
              setToastMessage={setToastMessage}
              onCartUpdate={onCartUpdate}
            />
            </div>
          </div>
      ))
    )}
  </div>
  </>
  );
};

export default SearchResultsPage;
