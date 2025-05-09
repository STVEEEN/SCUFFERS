import React from "react";
import "../styles/styles.css";

export default function Shipping() {
  return (
    <div className="shipping-page container">
      <h1>SHIPPING INFORMATION</h1>
      <p className="shipping-subtitle">We currently ship only within national territory.</p>

      <div className="shipping-info">
        <div className="shipping-item">
          <span className="shipping-icon">🚚</span>
          <h2>Standard Delivery</h2>
          <p>Estimated arrival in 3-5 business days.</p>
        </div>

        <div className="shipping-item">
          <span className="shipping-icon">✈️</span>
          <h2>Express Delivery</h2>
          <p>Estimated arrival in 1-2 business days.</p>
        </div>

        <div className="shipping-item">
          <span className="shipping-icon">🏢</span>
          <h2>Store Pickup</h2>
          <p>Pick up your order at selected locations.</p>
        </div>
      </div>

      <p className="shipping-footer">For international shipments, please contact customer service.</p>
    </div>
  );
}
