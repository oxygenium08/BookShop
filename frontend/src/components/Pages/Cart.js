import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';
import $api_token from '../../api'

const Cart = ({ onCartUpdate }) => {

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await $api_token.get('/cart/api/');
        onCartUpdate()
        setCart(response.data.items);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log('Ошибка авторизации, перенаправляем на страницу входа');
          window.location.href = '';
        } else {
          console.error('Ошибка при загрузке корзины:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  if (loading) {
    return <p>Загрузка корзины...</p>;
  }


  const updateQuantity = async (itemId, newQuantity) => {
    try {
      await $api_token.patch(`/cart/api/${itemId}/`, { quantity: newQuantity });
      onCartUpdate()
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error('Ошибка при обновлении количества товара:', error);
    }
  };
  const removeItem = async (itemId) => {
    try {
      await $api_token.delete(`/cart/api/${itemId}/`);
      onCartUpdate()
      setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error('Ошибка при удалении товара из корзины:', error);
    }
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.book_price * item.quantity,
    0
  ).toFixed(2);



  return (
    <div className="cart-container">
      <h2 className="cart-header">Ваша корзина</h2>

      {cart.length === 0 ? (
        <p className="cart-empty-message">Ваша корзина пуста</p>
      ) : (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Название книги</th>
              <th>Цена за штуку</th>
              <th>Количество</th>
              <th>Общая цена</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={index}>
                <td>{item.book_title}</td>
                <td>{item.book_price} руб.</td>
                <td>{item.quantity}</td>
                <td>{(item.book_price * item.quantity).toFixed(2)} руб.</td>
                <td>
                  <button
                    className="action-button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                  <button
                    className="action-button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => removeItem(item.id)}
                    title="Удалить товар"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {cart.length > 0 && (
        <div className="cart-total">
          <h3>Общая стоимость: {totalPrice} руб.</h3>
        </div>
      )}

      <div className="nav-button-container">
        <Link to="/">
          <button className="nav-button">На главную страницу</button>
        </Link>

        <Link
          to='/order_form'
          state={{ cartItems: cart, totalAmount: totalPrice }}
        >
          <button className="nav-button">Оформить заказ</button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
