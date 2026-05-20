import React, { useState } from 'react';
import { menu, restaurante } from '../data/datos';

function Menu() {
  const [carrito, setCarrito] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState('Todas');

  const categorias = ['Todas', ...new Set(menu.map(item => item.categoria))];

  const menuFiltrado = categoriaActiva === 'Todas'
    ? menu
    : menu.filter(item => item.categoria === categoriaActiva);

  const agregarAlCarrito = (item) => {
    const existe = carrito.find(c => c.id === item.id);
    if (existe) {
      setCarrito(carrito.map(c => c.id === item.id ? { ...c, cantidad: c.cantidad + 1 } : c));
    } else {
      setCarrito([...carrito, { ...item, cantidad: 1 }]);
    }
  };

  const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>
      
      {/* MENÚ */}
      <div style={{ flex: 1, padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img src="/logo.png" alt="Llego" style={{ height: '60px', marginBottom: '0.5rem' }} />
          <h1 style={{ fontSize: '1.5rem', color: '#1a1a2e' }}>{restaurante.nombre}</h1>
          <p style={{ color: '#888' }}>{restaurante.direccion}</p>
        </div>

        {/* CATEGORÍAS */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              className="btn"
              style={{
                background: categoriaActiva === cat ? '#e94560' : '#eee',
                color: categoriaActiva === cat ? 'white' : '#555'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* PRODUCTOS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
          {menuFiltrado.map(item => (
            <div key={item.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ fontSize: '2.5rem', textAlign: 'center' }}>{item.emoji}</div>
              <h3 style={{ color: '#1a1a2e' }}>{item.nombre}</h3>
              <p style={{ color: '#888', fontSize: '0.85rem' }}>{item.descripcion}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                <span style={{ fontWeight: 700, color: '#e94560', fontSize: '1.1rem' }}>${item.precio.toFixed(2)}</span>
                <button className="btn btn-rojo" onClick={() => agregarAlCarrito(item)}>+ Agregar</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CARRITO */}
      <div style={{ width: '320px', background: 'white', padding: '1.5rem', boxShadow: '-2px 0 10px rgba(0,0,0,0.08)', position: 'sticky', top: '60px', height: 'calc(100vh - 60px)', overflowY: 'auto' }}>
        <h2 style={{ color: '#1a1a2e', marginBottom: '1rem' }}>🛒 Tu pedido {totalItems > 0 && <span style={{ background: '#e94560', color: 'white', borderRadius: '50%', padding: '0.1rem 0.5rem', fontSize: '0.8rem' }}>{totalItems}</span>}</h2>

        {carrito.length === 0 ? (
          <p style={{ color: '#aaa', textAlign: 'center', marginTop: '2rem' }}>Tu carrito está vacío</p>
        ) : (
          <>
            {carrito.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid #f0f0f0' }}>
                <div>
                  <p style={{ fontWeight: 600 }}>{item.emoji} {item.nombre}</p>
                  <p style={{ color: '#888', fontSize: '0.85rem' }}>x{item.cantidad} · ${item.precio.toFixed(2)} c/u</p>
                </div>
                <span style={{ fontWeight: 700 }}>${(item.precio * item.cantidad).toFixed(2)}</span>
              </div>
            ))}

            <div style={{ marginTop: '1rem', padding: '1rem', background: '#f9f9f9', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.1rem' }}>
                <span>Total</span>
                <span style={{ color: '#e94560' }}>${total.toFixed(2)}</span>
              </div>
            </div>

            <button className="btn btn-rojo" style={{ width: '100%', marginTop: '1rem', padding: '0.75rem', fontSize: '1rem' }}>
              Confirmar Pedido
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Menu;