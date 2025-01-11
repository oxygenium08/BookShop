import React from "react";
import "./Contacts.css";
import Divider from './Divider';

const Contacts = () => {
  return (
    <div className="contacts-container">
      <h1 className="contacts-title">Контакты</h1>
      <Divider/>
      <div className="contacts-content">
        <div className="contacts-column contacts-image">
          <img
            src="contacts_image-im.jpg"
            alt="Company Location"
          />
        </div>

        <div className="contacts-column contacts-info">
          <p className='muted'>АДРЕС</p>
          <p>г. Минск, ул. Неизвестная, 1</p>
          <p></p>
          <p className='muted'>РЕЖИМ РАБОТЫ</p>
          <h3> Офис: </h3>
          <p>Понедельник - пятница: 8:30-17:12</p>
          <p>Суббота - воскресенье: выходной</p>
          <p>Перерыв на обед: 13:00 - 13:30</p>
          <p></p>
          <h3> Интернет-магазин: </h3>
          <p>Понедельник - четверг: 8:30-17:12</p>
          <p>Пятница: 8.30-16.12</p>
          <p>Суббота - воскресенье: выходной</p>
          <p>Перерыв на обед: 13:00 - 13:30</p>
        </div>

        <div className="contacts-column contacts-contact">
          <p className='muted'>ТЕЛЕФОН</p>
          <h3>Интернет-магазин и справочная служба:</h3>
          <p>+375 (29) 123-45-67</p>
          <p></p>
          <h3>Приемная:</h3>
          <p>+375 (33) 765-43-21</p>
          <p></p>
          <p className='muted'>E-MAIL</p>
          <h3>Интернет-магазин:</h3>
          <p>email1@mail.ru</p>
          <p></p>
          <h3>Приемная офиса:</h3>
          <p>email2@mail.ru</p>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
