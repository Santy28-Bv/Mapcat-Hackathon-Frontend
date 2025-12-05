import { useState } from 'react'
import axios from 'axios'

export default function LoginModal({ isOpen, onClose, onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:8000/api/token/', {
        username: username,
        password: password
      })

      // Guardar tokens
      localStorage.setItem('access', res.data.access)
      localStorage.setItem('refresh', res.data.refresh)

      // Avisar al padre que el login fue exitoso
      onLogin({ username, token: res.data.access })

      // Resetear estado y cerrar modal
      setPassword('')
      onClose()
    } catch (err) {
      console.error('Error al iniciar sesión:', err)
      alert('Usuario o contraseña inválidos')
    }
  }

  return (
    <div className="modal active">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">👤 Iniciar sesión</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-section">
            <label className="label">Nombre de usuario</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="tu_usuario"
            />
          </div>

          <div className="modal-section">
            <label className="label">Contraseña</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />
          </div>

          <button type="submit" className="checkout-btn">Entrar</button>
        </form>
      </div>
    </div>
  )
}
