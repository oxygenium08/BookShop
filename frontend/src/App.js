import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import BookList from './components/BookList';
import Cart from './components/Cart';
import './App.css';
import BookDetail from './components/BookDetail';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Modal from './components/Modal';
import CategoryList from './components/CategoryList';
import OrderForm from './components/OrderForm';
import Contacts from './components/Contacts';
import SearchResultsPage from './components/SearchResultsPage';
import $api_token from './api';
import axios from 'axios';

const App = () => {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [updateCartTrigger, setUpdateCartTrigger] = useState(false);
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await $api_token.get('/cart/api/');
        setCart(response.data.items);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log('Ошибка авторизации, перенаправляем на страницу входа');
        } else {
          console.error('Ошибка при загрузке корзины:', error);
        }
      }
    };

    fetchCartItems();
  }, [auth, updateCartTrigger]);


  const triggerCartUpdate = () => {
    setUpdateCartTrigger((prev) => !prev);
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setAuth(true);
    }
  }, []);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/catalog/api/books/')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the books!", error);
      });
  }, []);

  const handleLogin = () => {
    setAuth(true);
    setModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAuth(false);
    window.location.href = '/';
  };

  const openLoginModal = () => {
    setIsRegister(false);
    setModalOpen(true);
  };

  const openRegisterModal = () => {
    setIsRegister(true);
    setModalOpen(true);
  };
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (query) => {
    const filteredBooks = books.filter(book =>
      book.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBooks(filteredBooks);
    navigate('/search')
  };

  return (
      <div id='root'>
        <Header
          auth={auth}
          onLogout={handleLogout}
          onLoginClick={openLoginModal}
          cartQuantity={totalQuantity}
          onSearch={handleSearch}
        />

        {isModalOpen && (
          <Modal onClose={() => setModalOpen(false)}>
            {isRegister ? (
              <Register setAuth={handleLogin} />
            ) : (
              <Login setAuth={handleLogin} />
            )}
            <div className="modal-footer">
              {isRegister ? (
                <p>
                  Уже есть аккаунт?{' '}
                  <span className="modal-link" onClick={openLoginModal}>
                    Войдите
                  </span>
                </p>
              ) : (
                <p>
                  Нет аккаунта?{' '}
                  <span className="modal-link" onClick={openRegisterModal}>
                    Зарегистрируйтесь
                  </span>
                </p>
              )}
            </div>
          </Modal>
        )}
        <main>
          <Routes>
            <Route path="/" element={<CategoryList />} />
            <Route path="/category/:id" element={<BookList onCartUpdate={triggerCartUpdate}/>} />
            <Route path="/cart" element={<Cart onCartUpdate={triggerCartUpdate}/>} />
            <Route path="/books/:id" element={<BookDetail />} />
            <Route path="/order_form" element={<OrderForm />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/search" element={<SearchResultsPage results={filteredBooks} onCartUpdate={triggerCartUpdate}/>} />
          </Routes>
        </main>
        <Footer/>
      </div>
  );
};

export default App;
