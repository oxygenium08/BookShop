import React, { useState } from 'react';
import $api_token from '../api';
import Toast from './Toast';
import './AddToCartButton.css';

const AddToCartButton = ({ bookId }) => {
  const [toastMessage, setToastMessage] = useState(null);

  const addToCart = async () => {
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
      <button className="cart-button" onClick={addToCart}>
        Добавить в корзину
      </button>
    </div>
  );
};

export default AddToCartButton;
