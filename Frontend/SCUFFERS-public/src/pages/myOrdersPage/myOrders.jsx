import React, { useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import SidebarMyAccount from '../../components/sidebarMyAccount/sidebarMyAccount';
import './MyOrders.css';

const MyOrders = () => {
  const [activeCategory, setActiveCategory] = useState('MY ORDERS');

  return (
    <div>
      <Navbar />
      <div className="my-orders__layout">
        <SidebarMyAccount
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <main className="my-orders__main">
          <h2 className="my-orders__title">MY ORDERS</h2>

          {/* Puedes reemplazar esto con una tabla dinámica más adelante */}
          <div className="my-orders__placeholder">
            <p>No orders found yet.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyOrders;
