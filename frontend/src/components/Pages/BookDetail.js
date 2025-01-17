import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './BookDetail.css';
import $api_token from '../../api'
import AddToCartButton from '../UI/AddToCartButton';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
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

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/catalog/api/books/${id}/`);
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
        }
        const data = await response.json();
        setBook(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBookDetail();
  }, [id]);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>Произошла ошибка: {error}</p>;
  }
  const updateCartItems = (newCartItem) => {
    setCartItems(prevItems => [...prevItems, newCartItem]);
  };
  return (
    <div className="book-detail">
      <h1>{book.title}</h1>
      <div className="book-detail-content">
        <img src={book.image} alt={book.title} className="book-cover" />
        <div className="book-info">
          <p className="book-price">Цена: {book.price} руб</p>
          <AddToCartButton
            bookId={book.id}
            isInCart={cartItems.some(item => item.book === book.id)}
            updateCartItems={updateCartItems}
            setToastMessage={setToastMessage}
          />
        </div>
      </div>
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'description' ? 'active' : ''}`}
          onClick={() => setActiveTab('description')}
        >
          Описание
        </button>
        <button
          className={`tab-button ${activeTab === 'characteristics' ? 'active' : ''}`}
          onClick={() => setActiveTab('characteristics')}
        >
          Характеристики
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'description' ? (
          <p style={{ marginTop: '20px', textAlign: 'justify' }}>{book.description}</p>
        ) : (
          <ul className="characteristics-list">
            <li className="characteristic-row">
              <span className="characteristic-name">Год издания:</span>
              <span className="characteristic-value">{book.publication_year}</span>
            </li>
            <li className="characteristic-row">
              <span className="characteristic-name">Автор:</span>
              <span className="characteristic-value">{book.author}</span>
            </li>
            <li className="characteristic-row">
              <span className="characteristic-name">Издательство:</span>
              <span className="characteristic-value">{book.publisher}</span>
            </li>
            <li className="characteristic-row">
              <span className="characteristic-name">Формат:</span>
              <span className="characteristic-value">{book.format}</span>
            </li>
            <li className="characteristic-row">
              <span className="characteristic-name">Количество страниц:</span>
              <span className="characteristic-value">{book.page_count}</span>
            </li>
            <li className="characteristic-row">
              <span className="characteristic-name">Тип обложки:</span>
              <span className="characteristic-value">{book.cover_type}</span>
            </li>
            <li className="characteristic-row">
              <span className="characteristic-name">ISBN:</span>
              <span className="characteristic-value">{book.isbn}</span>
            </li>
          </ul>
        )}
      </div>



      <button onClick={() => window.history.back()} className="back-button">
        Вернуться к каталогу
      </button>


    </div>
  );
};

export default BookDetail;
