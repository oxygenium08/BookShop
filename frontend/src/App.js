import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Register from './components/Forms/Register';
import Login from './components/Forms/Login';
import BookList from './components/Pages/BookList';
import Cart from './components/Pages/Cart';
import './App.css';
import BookDetail from './components/Pages/BookDetail';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Modal from './components/UI/Modal';
import CategoryList from './components/Pages/CategoryList';
import OrderForm from './components/Forms/OrderForm';
import Contacts from './components/Pages/Contacts';
import SearchResultsPage from './components/Pages/SearchResultsPage';
import $api_token from './api';
import axios from 'axios';
import { AuthContext } from './context/AuthContext';

const App = () => {
  const { auth, handleLogin, handleLogout, loading } = React.useContext(AuthContext);
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
    axios.get('http://127.0.0.1:8000/catalog/api/books/')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the books!", error);
      });
  }, []);


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
      book.title.toLowerCase().includes(query.toLowerCase()) | book.author.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBooks(filteredBooks);
    navigate('/search')
  };
  if (loading) {
    return <p>Загрузка...</p>;
  }
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
            {isRegister
              ? (<Register setAuth={handleLogin} setShowRegister={setModalOpen}/>)
              : (<Login setAuth={handleLogin} setShowLogin={setModalOpen} />)
            }
            <div className="modal-footer">
              {isRegister
                ?
                  (
                    <p>
                      Уже есть аккаунт?{' '}
                      <span className="modal-link" onClick={openLoginModal}>
                        Войдите
                      </span>
                    </p>
                  )
                :
                  (
                    <p>
                      Нет аккаунта?{' '}
                      <span className="modal-link" onClick={openRegisterModal}>
                        Зарегистрируйтесь
                      </span>
                    </p>
                  )
              }
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
