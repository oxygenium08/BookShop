import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-left">
                <p>ОАО "МайБукс"</p>
                <p>Юридический адрес: Республика Беларусь, 220022, г.Минск, ул.Книжная, 29а, ком 26</p>
                <p>Все права защищены.</p>
            </div>
            <div className="footer-right">
                <img src='visa13.png' alt="Mastercard" />
            </div>
        </footer>
    );
};

export default Footer;
