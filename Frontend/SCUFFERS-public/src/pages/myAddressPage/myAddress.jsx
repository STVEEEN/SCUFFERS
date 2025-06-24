import React, { useState } from 'react';
import SidebarMyAccount from '../../components/sidebarMyAccount/sidebarMyAccount';
import Navbar from '../../components/navbar/navbar';
import './MyAddress.css';

const MyAddress = () => {
  const [activeCategory, setActiveCategory] = useState('MY ADDRESS');

  return (
    <div>
      <Navbar />
      <div className="my-address__layout">
        <SidebarMyAccount
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <main className="my-address__main">
          <h2 className="my-address__header">SHIPPING ADDRESS</h2>
          <form className="my-address__form">
            <div className="my-address__row">
              <div className="my-address__field">
                <label>FIRST NAME *</label>
                <input type="text" />
              </div>
              <div className="my-address__field">
                <label>LAST NAME *</label>
                <input type="text" />
              </div>
            </div>

            <div className="my-address__field">
              <label>STREET ADDRESS *</label>
              <input type="text" />
            </div>

            <div className="my-address__field">
              <label>STREET ADDRESS 2</label>
              <input type="text" />
            </div>

            <div className="my-address__field">
              <label>CITY *</label>
              <input type="text" />
            </div>

            <div className="my-address__field">
              <label>COUNTRY *</label>
              <select>
                <option>El Salvador</option>
                <option>Guatemala</option>
                <option>Honduras</option>
                <option>Nicaragua</option>
                <option>Costa Rica</option>
                <option>Panamá</option>
                <option>Estados Unidos</option>
                <option>Canadá</option>
                <option>España</option>
                <option>México</option>
              </select>
            </div>

            <div className="my-address__field">
              <label>ZIP *</label>
              <input type="text" />
            </div>

            <div className="my-address__field">
              <label>PHONE *</label>
              <input type="text" />
            </div>

            <div className="my-address__checkbox">
              <input type="checkbox" id="privacy" />
              <label htmlFor="privacy">
                I READ AND ACCEPT THE <a href="#">PRIVACY INFORMATION NOTE</a>
              </label>
            </div>

            <button className="my-address__button" type="submit">UPDATE</button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default MyAddress;
