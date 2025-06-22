import "../../pages/addProductsPage/addProducts.css";

export default function ProductList({ products, onEdit, onDelete, loading }) {
  return (
    <div className="ProductList">
      {loading && <p>Cargando productos...</p>}
      {!loading && products.length === 0 && <p>No hay productos.</p>}
      <div className="ProductList-grid">
        {products.map(product => (
          <div key={product._id} className="ProductCard">
            <img src={product.image} alt={product.name} className="ProductCard-img" />
            <div className="ProductCard-info">
              <div className="ProductCard-row">
                <span className="ProductCard-name">{product.name}</span>
                <span
                  className="ProductCard-color"
                  title={product.color}
                  style={{ background: product.color }}
                />
              </div>
              <div>
                <span className="ProductCard-price">${product.price}</span>
                <span className="ProductCard-stock">({product.stock} en stock)</span>
              </div>
              {product.discount > 0 && (
                <div className="ProductCard-discount">Descuento: {product.discount}%</div>
              )}
              <div className="ProductCard-line">{product.line}</div>
              <div className="ProductCard-desc">{product.description}</div>
              <div className="ProductCard-actions">
                <button className="edit-btn" onClick={() => onEdit(product)}>Editar</button>
                <button className="del-btn" onClick={() => onDelete(product._id)}>Eliminar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}