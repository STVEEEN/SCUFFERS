import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/styles.css";

export default function Cart() {
  const { cart, total, removeFromCart } = useContext(CartContext);

  if (cart.length === 0) {
    return <p className="cart-empty">Your cart is empty.</p>;
  }

  return (
    <div className="cart-page container">
      <h1>Your Cart</h1>
      <ul className="cart-items">
        {cart.map((item) => (
          <li key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-image" />
            <span>{item.name}</span>
            <span>${item.price}</span>
            <button className="remove-btn" onClick={() => removeFromCart(item.id)}>✖</button>
          </li>
        ))}
      </ul>
      <div className="cart-summary">
        <p>Total: ${total.toFixed(2)}</p>
        <button className="checkout-btn">Checkout</button>
      </div>
    </div>
  );
}
