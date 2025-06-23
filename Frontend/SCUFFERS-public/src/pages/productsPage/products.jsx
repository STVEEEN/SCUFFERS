import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import ProductCard from "../../components/productCard/productCard";
import "./products.css";

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("STATEMENT PIECES");
  const navigate = useNavigate();

  // Datos de ejemplo para las cards
  const productCards = [
    {
      id: 1,
      image: "/src/img/rick.png",
      topText: "STUFF",
      bottomText: "$1000000"
    },
    {
      id: 2,
      image: "/src/img/rick.png",
      topText: "PREMIUM",
      bottomText: "$1500000"
    },
    {
      id: 3,
      image: "/src/img/rick.png",
      topText: "ELITE",
      bottomText: "$2000000"
    },
    {
      id: 4,
      image: "/src/img/rick.png",
      topText: "DELUXE",
      bottomText: "$2500000"
    },
    {
      id: 5,
      image: "/src/img/rick.png",
      topText: "STUFF",
      bottomText: "$1000000"
    },
    {
      id: 6,
      image: "/src/img/rick.png",
      topText: "PREMIUM",
      bottomText: "$1500000"
    },
    {
      id: 7,
      image: "/src/img/rick.png",
      topText: "ELITE",
      bottomText: "$2000000"
    },
    {
      id: 8,
      image: "/src/img/rick.png",
      topText: "DELUXE",
      bottomText: "$2500000"
    },
    {
      id: 9,
      image: "/src/img/rick.png",
      topText: "STUFF",
      bottomText: "$1000000"
    },
    {
      id: 10,
      image: "/src/img/rick.png",
      topText: "PREMIUM",
      bottomText: "$1500000"
    },
    {
      id: 11,
      image: "/src/img/rick.png",
      topText: "ELITE",
      bottomText: "$2000000"
    },
    {
      id: 12,
      image: "/src/img/rick.png",
      topText: "DELUXE",
      bottomText: "$2500000"
    }
  ];

  return (
    <div className="products-page">
      <Navbar />

      {/* Contenedor principal con Sidebar y contenido */}
      <div className="main-content-container">
        <Sidebar
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <main className="products-content">
          {/* Título dinámico basado en la categoría activa */}
          <div className="category-header">
            <h2 className="category-title">{activeCategory}</h2>
            <p className="category-description">
              Explore our curated collection of premium {activeCategory.toLowerCase()}
            </p>
          </div>

          <div className="products-row">
            {productCards.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate("/viewOfProduct")}
                style={{ cursor: "pointer" }}
              >
                <ProductCard
                  image={product.image}
                  topText={product.topText}
                  bottomText={product.bottomText}
                />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Products;
