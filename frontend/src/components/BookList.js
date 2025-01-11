import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cart from './Cart';
import './BookList.css';
import { Link } from 'react-router-dom';
import $api_token from '../api';
import { useParams } from 'react-router-dom';
import Toast from './Toast';
import AddToCartButton from './AddToCartButton';

const itemsPerPage = 20;


function BookList({ onCartUpdate }) {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(0);
  const [books, setBooks] = useState([]);
  const [isEmptyCategory, setIsEmptyCategory] = useState(false);
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
    axios.get(`http://127.0.0.1:8000/catalog/api/books/?category=${id}`)
      .then(response => {
        setBooks(response.data);
        if (response.data.length === 0) {
          setIsEmptyCategory(true);
        } else {
          setIsEmptyCategory(false);
        }
      })
      .catch(error => {
        console.error("There was an error fetching the books!", error);
      });
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = books.slice(startIndex, endIndex);
  const totalPages = Math.ceil(books.length / itemsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  console.log(cartItems.some(item => item.book === 45))

  const updateCartItems = (newCartItem) => {
    setCartItems(prevItems => [...prevItems, newCartItem]);
  };

  return (
    <div>
      <h1>Книги</h1>
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}


      {isEmptyCategory ? (
        <p>В этой категории книги пока отсутствуют.</p>
      ) : (
        <div className="book-list">
          {currentItems.map(book => (
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
          ))}
        </div>
      )}


      {!isEmptyCategory && (
        <div className="pagination" style={{ marginBottom: '20px' }}>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 0}
          >
            ←
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={currentPage === index ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}

export default BookList;
