import { useState, useMemo } from 'react'

export default function CartModal({ isOpen, onClose, cartItems, onRemoveItem, onCheckout }) {
  const [cartFilter, setCartFilter] = useState('all')

  const { subtotal, tax, total, filteredItems } = useMemo(() => {
    const filtered = cartFilter === 'all'
      ? cartItems
      : cartItems.filter(item => item.type === cartFilter)
    const sub = filtered.reduce((sum, item) => sum + item.totalPrice, 0)
    const t = sub * 0.1
    return { subtotal: sub, tax: t, total: sub + t, filteredItems: filtered }
  }, [cartItems, cartFilter])

  if (!isOpen) return null

  return (
    <div className="modal active">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">🛒 Tu Carrito</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <p>Tu carrito está vacío</p>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
              ¡Agrega productos para comenzar!
            </p>
          </div>
        ) : (
          <>
            <div className="tab-buttons">
              <button
                className={`tab-btn ${cartFilter === 'all' ? 'active' : ''}`}
                onClick={() => setCartFilter('all')}
              >
                Todos ({cartItems.length})
              </button>
              <button
                className={`tab-btn ${cartFilter === 'buy' ? 'active' : ''}`}
                onClick={() => setCartFilter('buy')}
              >
                Compra ({cartItems.filter(i => i.type === 'buy').length})
              </button>
              <button
                className={`tab-btn ${cartFilter === 'rental' ? 'active' : ''}`}
                onClick={() => setCartFilter('rental')}
              >
                Arrendamiento ({cartItems.filter(i => i.type === 'rental').length})
              </button>
            </div>

            <div className="cart-items">
              {filteredItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <div className="cart-item-name">{item.productName}</div>
                    <div className="cart-item-type">
                      {item.type === 'buy' ? '🛍️ Compra' : '📦 Arrendamiento'} x{item.quantity}
                    </div>
                    <div className="cart-item-price">
                      ${item.totalPrice.toFixed(2)}
                    </div>
                  </div>
                  <button
                    className="cart-item-remove"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Impuesto (10%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="summary-total">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button className="checkout-btn" onClick={onCheckout}>
              ✓ Proceder al Pago
            </button>
          </>
        )}
      </div>
    </div>
  )
}
