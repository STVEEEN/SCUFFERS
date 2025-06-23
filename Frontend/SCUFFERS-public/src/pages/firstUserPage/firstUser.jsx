import React from "react";
import FirstUserCard from "../../components/firstUserCards/firstUserCard";
import "./firstUser.css";

const FirstUser = () => {
  return (
    <div className="first-user-page">
      <header className="page-header">
        <h1>SCUFFERS</h1>
      </header>

      <div className="cards-container">
        <FirstUserCard 
          image="/src/img/MAN.png" 
          mainText="MAN" 
          buttonText="SHOP NOW" 
        />
        <FirstUserCard 
          image="/src/img/JUSTWOMAN.png" 
          mainText="JUSTWOMAN" 
          buttonText="SHOP NOW" 
        />
        <FirstUserCard 
          image="/src/img/COLLECTIONS.png" 
          mainText="COLLECTIONS" 
          buttonText="SHOP NOW" 
        />
      </div>

      <footer className="page-footer">
        TERMS AND CONDITIONS | ABOUT
      </footer>
    </div>
  );
};

export default FirstUser;