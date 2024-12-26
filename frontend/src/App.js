import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import BookList from './components/BookList';
import Cart from './components/Cart';
import './App.css';
import BookDetail from './components/BookDetail';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from './components/Header';
import Modal from './components/Modal';
import CategoryList from './components/CategoryList';

const App = () => {
  const [auth, setAuth] = useState(false);
  const [cart, setCart] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setAuth(true);
    }
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

  return (
    <Router>
      <div>
        <Header
          auth={auth}
          onLogout={handleLogout}
          onLoginClick={openLoginModal}
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
            <Route path="/category/:id" element={<BookList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/books/:id" element={<BookDetail />} />
          </Routes>
        </main>
{/*        <main>
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <BookList addToCart={(item) => setCart((prev) => [...prev, item])} />
                  {auth && (
                    <div style={{ marginTop: '20px', marginBottom: '20px', textAlign: 'center' }}>
                      <Link to="/cart">
                        <button>Перейти в корзину</button>
                      </Link>
                    </div>
                  )}
                </div>
              }
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/books/:id" element={<BookDetail />} />
          </Routes>
        </main>*/}
      </div>
    </Router>
  );
};

export default App;
