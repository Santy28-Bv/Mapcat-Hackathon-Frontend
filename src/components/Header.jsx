import { useState } from 'react'
import logoImage from '../assets/isotipo-sinfondo.png'

export default function Header({ cartCount, onCartClick, onSearch, onLoginClick }) {
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = () => {
    onSearch(searchValue)
  }

  const neonStyle = {
    color: '#ffffff',
    textShadow:
      '0 0 7px rgba(255, 255, 255, 0.8), ' +
      '0 0 10px #e9b3ff, ' +
      '0 0 21px #a235ff',
  }

  return (
    <header>
      <div className="header-container">
        <div className="logo">
          <img
            src={logoImage}
            alt="Pixsoft Store Logo"
            width="45"
            height="45"
            style={{
              filter: 'drop-shadow(0 0 15px rgba(66, 192, 255, 0.8))',
            }}
          />
          <span style={neonStyle}>PIXSOFT STORE</span>
        </div>

        {/* Barra de búsqueda */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch}>Buscar</button>
        </div>

        {/* Botón usuario + carrito */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            className="user-btn"
            onClick={onLoginClick}
          >
            👤 Iniciar sesión
          </button>

          <div className="cart-icon" onClick={onCartClick}>
            🛒
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </div>
        </div>
      </div>
    </header>
  )
}
