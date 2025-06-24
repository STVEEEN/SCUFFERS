import { useState, useEffect } from "react";

const PRODUCTS_API = "http://localhost:4000/api/products";
const CATEGORIES_API = "http://localhost:4000/api/categories";

export default function useDataStock() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

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
    } catch (err) {
      setProducts([]);
      setCategories([]);
    }
    setLoading(false);
  }

  // FILTRO CORRECTO PARA TU CASO:
  const getProductsByCategory = (categoryId) => {
    if (!products || !categoryId) return [];
    // ¡Comparar el _id dentro de categoryId!
    return products.filter(
      (p) => String(p.categoryId?._id) === String(categoryId)
    );
  };

  // ...lo demás igual...

  const totalProducts = products.length;
  const lowStock = products.filter((p) =>
    p.variants?.some((v) => Number(v.stock) > 0 && Number(v.stock) <= 5)
  ).length;
  const outOfStock = products.filter((p) =>
    p.variants?.every((v) => Number(v.stock) === 0)
  ).length;
  const totalStockValue = products.reduce((acc, p) =>
    acc +
    (Number(p.price) * (p.variants?.reduce((s, v) => s + Number(v.stock || 0), 0) || 0))
  , 0);

  const lowestStock = [...products]
    .sort((a, b) =>
      (a.variants?.reduce((s, v) => s + Number(v.stock || 0), 0) || 0) -
      (b.variants?.reduce((s, v) => s + Number(v.stock || 0), 0) || 0)
    )
    .slice(0, 3);

  return {
    products,
    categories,
    loading,
    getProductsByCategory,
    totalProducts,
    lowStock,
    outOfStock,
    totalStockValue,
    lowestStock,
  };
}