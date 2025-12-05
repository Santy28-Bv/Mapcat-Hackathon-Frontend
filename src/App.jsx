import { useState, useCallback, useEffect } from 'react'

import Header from './components/Header'
import Filters from './components/Filters'
import ProductCard from './components/ProductCard'
import ProductModal from './components/ProductModal'
import CartModal from './components/CartModal'
import LoginModal from './components/LoginModal'

// Categorías desde data
import { CATEGORIES } from './data/categories'

// Productos desde Firestore
import { getAllProducts } from './services/products'

export default function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showProductModal, setShowProductModal] = useState(false)
  const [showCartModal, setShowCartModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  // Estado del usuario logueado
  const [user, setUser] = useState(null)

  // 🔥 Cargar productos desde Firestore
  useEffect(() => {
    async function loadProducts() {
      const items = await getAllProducts()
      setProducts(items)
    }
    loadProducts()
  }, [])

  // 🔍 Filtros y búsqueda
  const filteredProducts = searchQuery
    ? products.filter(p =>
        (p.name || '')
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        (p.description || '')
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    : activeFilter === 'all'
    ? products
    : products.filter(p => p.category === activeFilter)

  // 🛒 Agregar al carrito
  const handleAddToCart = useCallback((product, type, quantity) => {
    const cartItem = {
      id: `${product.id}-${type}-${Date.now()}`,
      productId: product.id,
      productName: product.name,
      type,
      quantity: parseInt(quantity),
      unitPrice: type === 'buy' ? product.price : product.rentalPrice,
      totalPrice:
        type === 'buy'
          ? product.price * quantity
          : product.rentalPrice * quantity
    }

    setCart(prev => [...prev, cartItem])
    setShowProductModal(false)
    alert('✓ Producto agregado al carrito')
  }, [])

  // 🗑️ Remover del carrito
  const handleRemoveFromCart = useCallback((itemId) => {
    setCart(prev => prev.filter(item => item.id !== itemId))
  }, [])

  // 💳 Checkout
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
        onLoginClick={() => setShowLoginModal(true)} // ⬅️ Se agregó del código de tu amigo
        user={user} // opcional si Header lo soporta
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

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={(userData) => {
          setUser(userData)
          alert(`Sesión iniciada como ${userData.email}`)
        }}
      />
    </>
  )
}
