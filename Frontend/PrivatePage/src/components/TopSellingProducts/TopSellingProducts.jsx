import React from "react";
import "./TopSellingProducts.css"; // Importa los estilos CSS

// Lista de productos más vendidos con sus detalles
const products = [
  {
    img: "/src/img/Clothes.png", // Imagen del producto
    name: "Buzz Navy Knit Zipper", // Nombre del producto
    price: "$599", // Precio del producto
    sold: "1,200 unidades", // Cantidad vendida
    change: "+15.2%", // Cambio en ventas
    color: "green" // Color para indicar crecimiento positivo
  },
  {
    img: "/src/img/Clothes.png",
    name: "Buzz Navy Knit Zipper",
    price: "$1,299",
    sold: "850 unidades",
    change: "-3.4%", // Cambio negativo en ventas
    color: "red" // Color para indicar disminución
  },
  {
    img: "/src/img/Clothes.png",
    name: "Buzz Navy Knit Zipper",
    price: "$249",
    sold: "2,100 unidades",
    change: "+8.7%",
    color: "green"
  },
  {
    img: "/src/img/Clothes.png",
    name: "Buzz Navy Knit Zipper",
    price: "$249",
    sold: "2,100 unidades",
    change: "+8.7%",
    color: "green"
  }
];

const TopSellingProducts = () => {
  return (
    <div className="top-selling-products"> {/* Contenedor principal */}
      <h2>TOP SELLING PRODUCTS</h2> {/* Título de la sección */}
      <div className="products-list"> {/* Contenedor de la lista de productos */}
        {products.map((product, index) => ( /* Mapea la lista de productos y los muestra */
          <div key={index} className="product-card"> {/* Tarjeta de cada producto */}
            <img src={product.img} alt={product.name} /> {/* Imagen del producto */}
            <div className="product-info"> {/* Contenedor de la información del producto */}
              <p className="product-name">{product.name}</p> {/* Nombre del producto */}
              <p className="product-price">{product.price}</p> {/* Precio del producto */}
              <p className="product-sold">{product.sold}</p> {/* Cantidad vendida */}
              <p className={`product-change ${product.color}`}>{product.change}</p> {/* Cambio en ventas con color dinámico */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSellingProducts;
