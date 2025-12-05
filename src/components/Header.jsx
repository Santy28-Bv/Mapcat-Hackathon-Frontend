import { useState } from 'react'
// RUTA CORREGIDA: Usamos '../' para subir un nivel (de 'components' a 'src') 
// y acceder a la carpeta 'assets'.
import logoImage from '../assets/isotipo-sinfondo.png' 

export default function Header({ cartCount, onCartClick, onSearch }) {
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = () => {
    onSearch(searchValue)
  }

  // Define el estilo Neón como un objeto de JS para usarlo en 'style'
  const neonStyle = {
    color: '#ffffff', // Color base del texto (blanco)
    textShadow: 
      '0 0 7px rgba(255, 255, 255, 0.8), ' + // Luz interior intensa
      '0 0 10px #e9b3ff, ' +                  // Brillo exterior cercano (púrpura claro)
      '0 0 21px #a235ff'                      // Resplandor amplio (púrpura medio)
    // Nota: El color en línea '#ffffffff' es el mismo que '#ffffff' (el último ff es transparencia y no es estándar para color simple)
  };

  return (
    <header>
      <div className="header-container">
        <div className="logo">
          {/* SVG reemplazado por la etiqueta <img> */}
          <img 
            src={logoImage} 
            alt="Pixsoft Store Logo" 
            width="45" 
            height="45" 
            style={{ 
              filter: 'drop-shadow(0 0 15px rgba(66, 192, 255, 0.8))' 
            }}
          />
          {/* TEXTO CON EFECTO NEÓN APLICADO */}
          <span style={neonStyle}>PIXSOFT STORE</span>
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