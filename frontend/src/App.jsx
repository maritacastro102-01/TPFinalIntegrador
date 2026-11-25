
import { useState } from 'react'
import './index.css'

const productos = [
  { id: 1, nombre: 'Pelota de fútbol', descripcion: 'Pelota profesional número 5', precio: 25000, stock: 10, emoji: '⚽', categoria: 'Fútbol' },
  { id: 2, nombre: 'Zapatillas deportivas', descripcion: 'Calzado ideal para entrenamiento', precio: 65000, stock: 8, emoji: '👟', categoria: 'Calzado' },
  { id: 3, nombre: 'Pelota de básquet', descripcion: 'Pelota de básquet resistente', precio: 32000, stock: 12, emoji: '🏀', categoria: 'Básquet' },
  { id: 4, nombre: 'Mancuernas', descripcion: 'Set de entrenamiento de fuerza', precio: 40000, stock: 5, emoji: '🏋️', categoria: 'Fitness' },
  { id: 5, nombre: 'Raqueta de tenis', descripcion: 'Raqueta para entrenamiento', precio: 55000, stock: 6, emoji: '🎾', categoria: 'Tenis' },
  { id: 6, nombre: 'Botella deportiva', descripcion: 'Botella reutilizable de 750 ml', precio: 12000, stock: 20, emoji: '🥤', categoria: 'Accesorios' }
]

function App() {
  const [carrito, setCarrito] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [mostrarCarrito, setMostrarCarrito] = useState(false)

  const agregar = (producto) => {
    setCarrito(actual => {
      const existente = actual.find(p => p.id === producto.id)

      if (existente) {
        if (existente.cantidad >= producto.stock) return actual
        return actual.map(p =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        )
      }

      return [...actual, { ...producto, cantidad: 1 }]
    })
  }

  const quitar = (id) => {
    setCarrito(actual => actual.filter(p => p.id !== id))
  }

  const cambiarCantidad = (id, cambio) => {
    setCarrito(actual => actual.map(p => {
      if (p.id !== id) return p
      return { ...p, cantidad: Math.max(1, Math.min(p.stock, p.cantidad + cambio)) }
    }))
  }

  const total = carrito.reduce((suma, p) => suma + p.precio * p.cantidad, 0)
  const cantidadTotal = carrito.reduce((suma, p) => suma + p.cantidad, 0)

  const filtrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.categoria.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <>
      <header className="navbar">
        <a href="#inicio" className="logo">🏆 MUNDO<span> VIRTUAL</span></a>
        <nav>
          <a href="#inicio">Inicio</a>
          <a href="#catalogo">Productos</a>
          <a href="#nosotros">Nosotros</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <button className="cart-button" onClick={() => setMostrarCarrito(true)}>
          🛒 Carrito ({cantidadTotal})
        </button>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-content">
            <p className="eyebrow">EQUIPÁ TU PASIÓN</p>
            <h1>EL DEPORTE<br />EMPIEZA ACÁ.</h1>
            <p>Todo lo que necesitás para entrenar, competir y superarte.</p>
            <a className="primary-button" href="#catalogo">EXPLORAR PRODUCTOS →</a>
          </div>
          <div className="hero-icon">🏃‍♂️</div>
        </section>

        <section className="benefits">
          <div>🚚 <span>Envíos a todo el país</span></div>
          <div>⭐ <span>Calidad garantizada</span></div>
          <div>💳 <span>Compra fácil y segura</span></div>
        </section>

        <section className="catalogo" id="catalogo">
          <p className="eyebrow">NUESTRO CATÁLOGO</p>
          <h2>Encontrá tu próximo desafío</h2>

          <input
            className="search"
            type="text"
            placeholder="Buscar productos o categorías..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
          />

          <div className="products-grid">
            {filtrados.map(producto => (
              <article className="product-card" key={producto.id}>
                <div className="product-image">{producto.emoji}</div>
                <div className="product-info">
                  <small>{producto.categoria}</small>
                  <h3>{producto.nombre}</h3>
                  <p>{producto.descripcion}</p>
                  <h3 className="price">
                    {producto.precio.toLocaleString('es-AR', {
                      style: 'currency', currency: 'ARS', maximumFractionDigits: 0
                    })}
                  </h3>
                  <small>Stock: {producto.stock} unidades</small>
                  <button
                    className="add-button"
                    onClick={() => agregar(producto)}
                  >
                    + Agregar al carrito
                  </button>
                </div>
              </article>
            ))}
            {filtrados.length === 0 && <p>No encontramos productos.</p>}
          </div>
        </section>

        <section className="about" id="nosotros">
          <h2>Más que una tienda, una pasión.</h2>
          <p>En Mundo Virtual creemos que cada objetivo comienza con las herramientas adecuadas. Encontrá todo para tu actividad deportiva.</p>
        </section>

        <section className="contact" id="contacto">
          <h2>¿Tenés alguna consulta?</h2>
          <p>Estamos para ayudarte a encontrar lo que necesitás.</p>
          <a href="mailto:mundovirtual@example.com">Contactanos por email</a>
        </section>
      </main>

      <footer>
        <strong>🏆 MUNDO VIRTUAL</strong>
        <p>Tu pasión, nuestro compromiso.</p>
        <small>© 2026 Mundo Virtual · Proyecto académico Full Stack</small>
      </footer>

      {mostrarCarrito && (
        <div className="cart-overlay" onClick={() => setMostrarCarrito(false)}>
          <section
            className="cart-section"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="close-cart"
              onClick={() => setMostrarCarrito(false)}
            >
              ✕
            </button>

            <h2>🛒 Tu carrito</h2>

            {carrito.length === 0 ? (
              <p>Tu carrito está vacío.</p>
            ) : (
              carrito.map(p => (
                <div className="cart-item" key={p.id}>
                  <span>{p.emoji} {p.nombre}</span>
                  <div className="cart-controls">
                    <button onClick={() => cambiarCantidad(p.id, -1)}>−</button>
                    {p.cantidad}
                    <button onClick={() => cambiarCantidad(p.id, 1)}>+</button>
                    <button onClick={() => quitar(p.id)}>🗑️</button>
                  </div>
                  <strong>
                    {(p.precio * p.cantidad).toLocaleString('es-AR', {
                      style: 'currency', currency: 'ARS', maximumFractionDigits: 0
                    })}
                  </strong>
                </div>
              ))
            )}

            <h3>
              Total: {total.toLocaleString('es-AR', {
                style: 'currency', currency: 'ARS', maximumFractionDigits: 0
              })}
            </h3>

            <button
              className="add-button"
              disabled={!carrito.length}
              onClick={() => alert('¡Compra de demostración! Falta conectar el backend.')}
            >
              Confirmar compra
            </button>
          </section>
        </div>
      )}
    </>
  )
}

export default App
