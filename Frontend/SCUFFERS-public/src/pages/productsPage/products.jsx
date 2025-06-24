import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import ProductCard from "../../components/productsPage/productCard";
import useProductsAndCategories from "../../hooks/useProductsAndCategories";
import "./products.css";

const Products = () => {
  const { products, categories, loading } = useProductsAndCategories();
  const [activeCategory, setActiveCategory] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!activeCategory && categories.length > 0) {
      setActiveCategory(categories[0].name);
    }
  }, [categories, activeCategory]);

  const filteredProducts = useMemo(() => {
    if (!activeCategory)
      return products.slice().sort((a, b) => a.name.localeCompare(b.name));
    return products
      .filter((p) => p.categoryId?.name === activeCategory)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [products, activeCategory]);

  const handleCardClick = (product) => {
    navigate("/viewOfProduct", {
      state: {
        ...product,
        topText: product.name,
        bottomText: `$${product.price}`,
      },
    });
  };

  if (loading) {
    return (
      <div className="products-page">
        <Navbar />
        <div className="products-loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="products-root">
      <Navbar />
      <button
        className="sidebar-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <span className="sidebar-toggle-bar"></span>
        <span className="sidebar-toggle-bar"></span>
        <span className="sidebar-toggle-bar"></span>
      </button>
      <div className="products-layout">
        <Sidebar
          categories={categories.map((cat) => cat.name)}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <main className="products-main">
          <div className="products-content">
            <div className="products-header">
              <div className="products-title">
                {activeCategory || "ALL PRODUCTS"}
              </div>
              <div className="products-desc">
                Explore our curated collection of premium{" "}
                {activeCategory ? activeCategory.toLowerCase() : "products"}
              </div>
            </div>
            <div className="products-grid">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    image={product.image}
                    topText={product.name}
                    bottomText={`$${product.price}`}
                    onClick={() => handleCardClick(product)}
                  />
                ))
              ) : (
                <div className="no-products">
                  No products found in this category.
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Products;