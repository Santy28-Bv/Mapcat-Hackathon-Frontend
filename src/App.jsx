import { useState, useCallback } from 'react'
import Header from './components/Header'
import Filters from './components/Filters'
import ProductCard from './components/ProductCard'
import ProductModal from './components/ProductModal'
import CartModal from './components/CartModal'
import { CATEGORIES, PRODUCTS } from './data/products'

export default function App() {
  const [cart, setCart] = useState([])
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showProductModal, setShowProductModal] = useState(false)
  const [showCartModal, setShowCartModal] = useState(false)

  const filteredProducts = searchQuery
    ? PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : activeFilter === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeFilter)

  const handleAddToCart = useCallback((product, type, quantity) => {
    const cartItem = {
      id: `${product.id}-${type}-${Date.now()}`,
      productId: product.id,
      productName: product.name,
      type,
      quantity: parseInt(quantity),
      unitPrice: type === 'buy' ? product.price : product.rentalPrice,
      totalPrice: type === 'buy'
        ? product.price * quantity
        : product.rentalPrice * quantity
    }
    setCart([...cart, cartItem])
    setShowProductModal(false)
    alert('✓ Producto agregado al carrito')
  }, [])

  const handleRemoveFromCart = useCallback((itemId) => {
    setCart(cart.filter(item => item.id !== itemId))
  }, [cart])

  const handleCheckout = () => {
    const total = cart.reduce((sum, item) => sum + item.totalPrice, 0) * 1.1
    alert(`✓ Compra completada!\nTotal: $${total.toFixed(2)}\n\nPróximamente integración con Stripe/PayPal`)
    setCart([])
    setShowCartModal(false)
  }

  return (
    <>
      <Header
        cartCount={cart.length}
        onCartClick={() => setShowCartModal(true)}
        onSearch={setSearchQuery}
      />
      <div className="container">
        <Filters
          categories={CATEGORIES}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onProductClick={(prod) => {
                setSelectedProduct(prod)
                setShowProductModal(true)
              }}
            />
          ))}
        </div>
      </div>
      <ProductModal
        product={selectedProduct}
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        onAddToCart={handleAddToCart}
      />
      <CartModal
        isOpen={showCartModal}
        onClose={() => setShowCartModal(false)}
        cartItems={cart}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />
    </>
  )
}
