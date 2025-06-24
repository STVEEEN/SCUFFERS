import "../../pages/addProductsPage/addProducts.css";

export default function ProductList({ products, onEdit, onDelete, loading }) {
  return (
    <div className="ProductList">
      {loading && <p className="ProductList-loading">Cargando productos...</p>}
      {!loading && products.length === 0 && <p className="ProductList-empty">No hay productos.</p>}
      <div className="ProductList-centeredGrid">
        {products.map(product => (
          <div key={product._id} className="ProductCard-modern">
            <img src={product.image} alt={product.name} className="ProductCard-modern-img" />
            <div className="ProductCard-modern-info">
              <div className="ProductCard-modern-row">
                <span className="ProductCard-modern-name">{product.name}</span>
                <span
                  className="ProductCard-modern-color"
                  title={product.color}
                  style={{ background: product.color }}
                />
              </div>
              <div className="ProductCard-modern-price-stock">
                <span className="ProductCard-modern-price">${product.price}</span>
                {product.variants?.length > 0 && (
                  <span className="ProductCard-modern-stock">
                    ({product.variants.reduce((acc, v) => acc + Number(v.stock || 0), 0)} en stock)
                  </span>
                )}
              </div>
              {/* Variantes */}
              {product.variants?.length > 0 && (
                <div className="ProductCard-modern-variants">
                  <b>Tallas:</b>{" "}
                  {product.variants.map((v, i) =>
                    <span key={i} className="ProductCard-modern-variant">
                      {v.size} <span style={{ color: "#666" }}>({v.stock})</span>
                    </span>
                  )}
                </div>
              )}
              {product.discount > 0 && (
                <div className="ProductCard-modern-discount">Descuento: {product.discount}%</div>
              )}
              <div className="ProductCard-modern-line">{product.line}</div>
              <div className="ProductCard-modern-desc">{product.description}</div>
              <div className="ProductCard-modern-actions">
                <button className="ProductCard-modern-edit" onClick={() => onEdit(product)}>Editar</button>
                <button className="ProductCard-modern-delete" onClick={() => onDelete(product._id)}>Eliminar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}