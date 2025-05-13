import React from "react";
import "./TopSellingProducts.css";

const products = [
  {
    img: "https://via.placeholder.com/50", 
    name: "Buzz Navy Knit Zipper",
    price: "$599",
    sold: "1,200 unidades",
    change: "+15.2%",
    color: "green"
  },
  {
    img: "https://via.placeholder.com/50",
    name: "Buzz Navy Knit Zipper",
    price: "$1,299",
    sold: "850 unidades",
    change: "-3.4%",
    color: "red"
  },
  {
    img: "https://via.placeholder.com/50",
    name: "Buzz Navy Knit Zipper",
    price: "$249",
    sold: "2,100 unidades",
    change: "+8.7%",
    color: "green"
  },
  {
    img: "https://via.placeholder.com/50",
    name: "Buzz Navy Knit Zipper",
    price: "$249",
    sold: "2,100 unidades",
    change: "+8.7%",
    color: "green"
  }
];

const TopSellingProducts = () => {
  return (
    <div className="top-selling-products">
      <h2>TOP SELLING PRODUCTS</h2>
      <div className="products-list">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <img src={product.img} alt={product.name} />
            <div className="product-info">
              <p className="product-name">{product.name}</p>
              <p className="product-price">{product.price}</p>
              <p className="product-sold">{product.sold}</p>
              <p className={`product-change ${product.color}`}>{product.change}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSellingProducts;
