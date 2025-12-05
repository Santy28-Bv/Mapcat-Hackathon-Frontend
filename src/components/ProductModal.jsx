import { useState } from 'react'

export default function ProductModal({ product, isOpen, onClose, onAddToCart }) {
  const [buyQty, setBuyQty] = useState(1)
  const [rentalQty, setRentalQty] = useState(product?.minMonths || 1)

  if (!isOpen || !product) return null

  return (
    <div className="modal active">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">{product.name}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <div style={{ textAlign: 'center', fontSize: '4rem', margin: '1.5rem 0' }}>
          {product.emoji}
        </div>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
          {product.description}
        </p>

        <div className="modal-section">
          <div className="label">Precio de compra</div>
          <div className="modal-price">${product.price}</div>
        </div>

        <div className="quantity-selector">
          <button className="qty-btn" onClick={() => setBuyQty(Math.max(1, buyQty - 1))}>−</button>
          <div className="qty-display">{buyQty}</div>
          <button className="qty-btn" onClick={() => setBuyQty(buyQty + 1)}>+</button>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => onAddToCart(product, 'buy', buyQty)}
        >
          🛒 Agregar a Carrito
        </button>

        {product.rental && (
          <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--warning)' }}>💰 Opciones de Arrendamiento</h3>
            <div className="modal-section" style={{ background: 'rgba(245, 158, 11, 0.1)', borderColor: 'rgba(245, 158, 11, 0.3)' }}>
              <div className="label">Precio mensual</div>
              <div style={{ fontSize: '1.4rem', color: 'var(--warning)', fontWeight: 'bold' }}>
                ${product.rentalPrice}/mes
              </div>
              <div className="hint">Mínimo: {product.minMonths} meses</div>
            </div>
            <div className="quantity-selector">
              <button
                className="qty-btn"
                onClick={() => setRentalQty(Math.max(product.minMonths, rentalQty - 1))}
              >
                −
              </button>
              <div className="qty-display">{rentalQty}</div>
              <button className="qty-btn" onClick={() => setRentalQty(rentalQty + 1)}>+</button>
            </div>
            <button
              className="btn btn-secondary"
              onClick={() => onAddToCart(product, 'rental', rentalQty)}
            >
              📦 Arrendar por {rentalQty} meses
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
