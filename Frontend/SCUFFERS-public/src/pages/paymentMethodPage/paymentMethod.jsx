import React, { useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import Sidebar from '../../components/sidebar/sidebar';
import { useCart } from '../../context/CartContext';
import './PaymentMethod.css';

const getCardType = (number) => {
  if (/^4/.test(number)) return 'visa';
  if (/^5[1-5]/.test(number)) return 'mastercard';
  if (/^3[47]/.test(number)) return 'amex';
  return '';
};

const PaymentMethod = () => {
  const { cartItems, total } = useCart();
  const [cardNumber, setCardNumber] = useState('');
  const [cardType, setCardType] = useState('');

  return (
    <div>
      <Navbar />
      <div className="payment-layout">
        <Sidebar />

        <main className="payment-main">
          <h2 className="payment-title">Payment Method</h2>

          <div className="payment-summary">
            <h3 className="payment-subtitle">Order Summary</h3>
            <ul className="payment-list">
              {cartItems.map((item, index) => (
                <li key={index} className="payment-item">
                  <span>{item.topText} × {item.quantity}</span>
                  <span>
                    $
                    {(
                      parseFloat(item.bottomText.replace(/[^0-9.,]/g, '').replace(/,/g, '')) *
                      (item.quantity || 1)
                    ).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
            <div className="payment-total">
              <span>Total:</span>
              <span>${total.toLocaleString()}</span>
            </div>
          </div>

          <form className="payment-form">
            <label className="payment-label">CARDHOLDER NAME *</label>
            <input type="text" className="payment-input" placeholder="Juan Pérez" />

            <label className="payment-label">CARD NUMBER *</label>
            <div className="payment-input-wrapper">
              <input
                type="text"
                className="payment-input"
                value={cardNumber}
                onChange={(e) => {
                  const value = e.target.value;
                  setCardNumber(value);
                  setCardType(getCardType(value));
                }}
                placeholder="1234 5678 9012 3456"
              />
              {cardType && (
                <img
                  src={`/assets/cards/${cardType}.svg`}
                  alt={`${cardType} logo`}
                  className="card-icon"
                />
              )}
            </div>

            <div className="payment-row">
              <div className="payment-field">
                <label className="payment-label">EXPIRATION *</label>
                <input type="text" className="payment-input" placeholder="MM / YY" />
              </div>

              <div className="payment-field">
                <label className="payment-label">CVV *</label>
                <input type="text" className="payment-input" />
              </div>
            </div>

            <button type="submit" className="payment-button">SAVE</button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default PaymentMethod;
