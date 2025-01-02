import React, { useState } from 'react';
import $api_token from '../api';
import Toast from './Toast';
import './AddToCartButton.css';
import { useNavigate } from 'react-router-dom';

const AddToCartButton = ({ bookId, isInCart, updateCartItems }) => {
  const [toastMessage, setToastMessage] = useState(null);
  const navigate = useNavigate();

  const handleNavigateToCart = () => {
    navigate('/cart');
  };

  const addToCart = async () => {
    updateCartItems({ book: bookId });
    try {
      const response = await $api_token.post(`/cart/api/`, { book_id: bookId });
      const data = response.data;
      if (response.status === 201) {
        setToastMessage(data.message);
      } else {
        setToastMessage('Произошла ошибка.');
      }
    } catch (error) {
      console.error('Ошибка при добавлении книги в корзину:', error);
      setToastMessage('Для добавления книги в корзину необходимо авторизоваться');
    }
  };

  return (
    <div>
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
      {isInCart ? (
        <button className="cart-button in-cart" onClick={handleNavigateToCart}>
          Уже в корзине
        </button>
      ) : (
        <button className="cart-button" onClick={addToCart}>
          Добавить в корзину
        </button>
      )}
    </div>
  );
};

export default AddToCartButton;
