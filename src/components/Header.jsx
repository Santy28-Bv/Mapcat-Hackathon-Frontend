import { useState } from 'react'

export default function Header({ cartCount, onCartClick, onSearch }) {
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = () => {
    onSearch(searchValue)
  }

  return (
    <header>
      <div className="header-container">
        <div className="logo">
          <svg 
            width="45" 
            height="45" 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="\src\assets\pixsoft-dark.jpg" 
            style={{ filter: 'drop-shadow(0 0 15px rgba(66, 192, 255, 0.8))' }}
          >
            <circle cx="25" cy="25" r="20" stroke="#42c0ff" strokeWidth="4" fill="none" />
            <circle cx="75" cy="75" r="20" stroke="#42c0ff" strokeWidth="4" fill="none" />
            <line x1="35" y1="35" x2="65" y2="65" stroke="#ffffff" strokeWidth="3" />
            <path d="M 55 25 L 75 45" stroke="#ffffff" strokeWidth="3" fill="none" />
          </svg>
          <span>PIXSOFT STORE</span>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch}>Buscar</button>
        </div>
        <div className="cart-icon" onClick={onCartClick}>
          🛒
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </div>
      </div>
    </header>
  )
}
