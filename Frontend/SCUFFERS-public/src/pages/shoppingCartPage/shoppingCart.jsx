// src/components/shoppingCart/ShoppingCart.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import SelectedProductCard from "../../components/selectedProductCard/selectedProductCard";
import "./ShoppingCart.css";

const ShoppingCart = () => {
  const { state: newItem } = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Cargar desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem("cartItems");
    if (stored) {
      const items = JSON.parse(stored);
      setCartItems(items);
      calculateTotal(items);
    }
  }, []);

  // Calcular precio total
  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => {
      // Manejar valores con comas como separador de miles
      const priceString = item.bottomText.replace(/[^0-9.,]/g, '');
      const price = parseFloat(priceString.replace(/,/g, ''));
      return sum + (price * (item.quantity || 1));
    }, 0);
    setTotalPrice(total);
  };

  // Agregar nuevo ítem
  useEffect(() => {
    if (newItem) {
      setCartItems((prev) => {
        const existingIndex = prev.findIndex(
          (item) =>
            item.topText === newItem.topText &&
            item.selectedSize === newItem.selectedSize
        );

        let updated;
        if (existingIndex !== -1) {
          updated = [...prev];
          updated[existingIndex].quantity += 1;
        } else {
          updated = [...prev, { ...newItem, quantity: 1 }];
        }

        localStorage.setItem("cartItems", JSON.stringify(updated));
        calculateTotal(updated);
        return updated;
      });
    }
  }, [newItem]);

  const handleRemove = (index) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
    localStorage.setItem("cartItems", JSON.stringify(updated));
    calculateTotal(updated);
  };

  const handleQuantityChange = (index, change) => {
    const updated = [...cartItems];
    updated[index].quantity = Math.max(1, updated[index].quantity + change);
    setCartItems(updated);
    localStorage.setItem("cartItems", JSON.stringify(updated));
    calculateTotal(updated);
  };

  return (
    <div className="shopping-cart-page">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="cart-container">
          <div className="cart-content">
            <h2 className="cart-title">YOUR SHOPPING BAG</h2>

            {cartItems.length === 0 ? (
              <p className="empty-cart-msg">Your bag is currently empty.</p>
            ) : (
              <div className="cart-items-container">
                {cartItems.map((item, i) => (
                  <SelectedProductCard
                    key={i}
                    product={item}
                    onRemove={() => handleRemove(i)}
                    onQuantityChange={(change) => handleQuantityChange(i, change)}
                  />
                ))}
              </div>
            )}
          </div>
          
          {cartItems.length > 0 && (
            <div className="order-summary">
              <h3 className="summary-title">ORDER SUMMARY</h3>
              <div className="summary-details">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>
                <div className="summary-row">
                  <span>Taxes</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="summary-total">
                  <span>Estimated Total</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
              </div>
              <button className="checkout-btn">PROCEED TO CHECKOUT</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;