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

function BookList() {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(0);
  const [books, setBooks] = useState([]);
  const [isEmptyCategory, setIsEmptyCategory] = useState(false);
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

  return (
    <div>
      <h1>Книги</h1>


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
              <AddToCartButton bookId={book.id} />
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
