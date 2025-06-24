import { useState, useEffect } from "react";

const PRODUCTS_API = "http://localhost:4000/api/products";
const CATEGORIES_API = "http://localhost:4000/api/categories";

export default function useProductsAndCategories() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch(PRODUCTS_API),
          fetch(CATEGORIES_API),
        ]);
        const products = await prodRes.json();
        const categories = await catRes.json();
        setProducts(products);
        setCategories(categories);
      } catch (e) {
        setProducts([]);
        setCategories([]);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  return { products, categories, loading };
}