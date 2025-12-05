export default function ProductCard({ product, onProductClick }) {
  return (
    <div className="product-card glass" onClick={() => onProductClick(product)}>
      <div className="product-image">{product.emoji}</div>
      <div className="product-info">
        <div className="product-category">{product.category.replace('-', ' ')}</div>
        <div className="product-name">{product.name}</div>
        <div className="product-description">{product.description}</div>
        <div className="product-price">${product.price}</div>
        <div className="product-stock">
          {product.stock > 0 ? '✓ En stock' : 'Agotado'}
        </div>
        {product.rental && (
          <div className="rental-info">
            💰 Arrendar: ${product.rentalPrice}/mes (mín. {product.minMonths} meses)
          </div>
        )}
      </div>
    </div>
  )
}
