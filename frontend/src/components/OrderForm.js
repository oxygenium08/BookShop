import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './OrderForm.css';
import InputMask from 'react-input-mask';

const OrderForm = () => {
  const [delivery, setDelivery] = useState('pickup');
  const [payment, setPayment] = useState('cash');
  const [pickupAddress, setPickupAddress] = useState('erudit');
  const [pickupLocation, setPickupLocation] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: ''
  });



  const location = useLocation();
  const { cartItems, totalAmount } = location.state || {};
  if (!cartItems || !totalAmount) {
    return <div>Ошибка: данные о заказе не найдены!</div>;
  }

  const handleDeliveryChange = (e) => setDelivery(e.target.value);
  const handlePickupChange = (e) => setPickupAddress(e.target.value);
  const handlePaymentChange = (e) => setPayment(e.target.value);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = () => {
    const phonePattern = /^\+375 \((25|44|29|33|17)\) \d{3}-\d{2}-\d{2}$/;
    if (!phonePattern.test(customerInfo.phone)) {
      alert('Введите корректный номер телефона.');
      return;
    }

    alert('Заказ оформлен!');
  };

  return (
    <div className="order-form">
      <div className="order-options">

        <div className="delivery-method">
          <h2><i class="bi bi-bus-front delivery-icon"></i> Способ доставки</h2>
          <ul>
            <li>
              <label>
                <input
                  type="radio"
                  name="delivery"
                  value="pickup"
                  checked={delivery === 'pickup'}
                  onChange={handleDeliveryChange}
                />
                Самовывоз
              </label>
              <p className="option-description">
                Вы можете самостоятельно забрать заказ из нашего магазина.
              </p>
            </li>
            <li>
              <label>
                <input
                  type="radio"
                  name="delivery"
                  value="euroPost"
                  checked={delivery === 'euroPost'}
                  onChange={handleDeliveryChange}
                />
                Европочта
              </label>
            </li>
          </ul>
        </div>


        <div className="payment-method">
          <h2><i class="bi bi-wallet delivery-icon"></i> Способ оплаты</h2>
          <ul>
            <li>
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={payment === 'cash'}
                  onChange={handlePaymentChange}
                />
                Наличные/карта при получении
              </label>
            </li>
            <li>
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="erip"
                  checked={payment === 'erip'}
                  onChange={handlePaymentChange}
                />
                Оплата через ЕРИП
              </label>
            </li>
          </ul>
        </div>
      </div>


      {delivery === 'pickup' ? (
        <div className="pickup-address">
          <label htmlFor="pickup-address"><h2><i class="bi bi-shop delivery-icon"></i> Выберите пункт самовывоза:</h2></label>
          <ul>
            <li>
              <label>
                <input
                  type="radio"
                  name="pickup"
                  value="erudit"
                  checked={pickupAddress === 'erudit'}
                  onChange={handlePickupChange}
                />
                “Эрудит”, г. Минск, ул. Б. Хмельницкого, 4
              </label>
            </li>
            <li>
              <label>
                <input
                  type="radio"
                  name="pickup"
                  value="central"
                  checked={pickupAddress === 'central'}
                  onChange={handlePickupChange}
                />
                “Центральный книжный магазин”, г. Минск, пр. Независимости, 19
              </label>
            </li>
          </ul>
        </div>
      ) : (
        <div className="pickup-address">
          <label htmlFor="pickup-location">
            <h2>
              <i class="bi bi-shop delivery-icon"></i> Пункт получения:
            </h2>
          </label>
          <input
            type="text"
            id="pickup-location"
            name="pickup-location"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            placeholder="Введите город, адрес и номер ОПС"
          />
        </div>
      )}


      <div className="customer-info">
        <h2>Информация о покупателе:</h2>
        <label htmlFor="name"><p style={{marginBottom: 0}}><i class="bi bi-person delivery-icon"></i> Фамилия, имя, отчество:</p></label>
        <input
          type="text"
          id="name"
          name="name"
          value={customerInfo.name}
          onChange={handleInputChange}
          placeholder="Введите ФИО"
        />
        <label htmlFor="phone"><p style={{marginBottom: 0}}><i class="bi bi-phone delivery-icon"></i> Номер телефона:</p></label>
        <InputMask
          mask="+375 (99) 999-99-99"
          value={customerInfo.phone}
          onChange={handleInputChange}
        >
          {(inputProps) => (
            <input
              {...inputProps}
              type="tel"
              id="phone"
              name="phone"
              placeholder="+375 (__) ___-__-__"
            />
          )}
        </InputMask>
      </div>

      <div className="customer-info">
        <h2>Товары в заказе:</h2>
        <table className="cart-table">
          <thead>
            <tr>
              <th>Название книги</th>
              <th>Цена за штуку</th>
              <th>Количество</th>
              <th>Общая цена</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td>{item.book_title}</td>
                <td>{item.book_price} руб.</td>
                <td>{item.quantity}</td>
                <td>{(item.book_price * item.quantity).toFixed(2)} руб.</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h4 style={{textAlign: 'right', marginRight: '16px'}}>Общая стоимость: {totalAmount} руб.</h4>
      </div>

      <p style={{textAlign: 'left'}}> После оформления наш сотрудник свяжется с вами для уточнения детелей и подтверждения заказа... </p>
      <div>
        <button onClick={handleSubmitOrder}>Оформить заказ</button>
      </div>
    </div>
  );
};

export default OrderForm;
