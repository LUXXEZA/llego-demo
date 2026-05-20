import React, { useState } from 'react';
import { menu, restaurante } from '../data/datos';

function Menu() {
  const [carrito, setCarrito] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState('Todas');
  const [pedidoConfirmado, setPedidoConfirmado] = useState(false);

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

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter(c => c.id !== id));
  };

  const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  if (pedidoConfirmado) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 60px)', flexDirection: 'column', gap: '1.5rem', background: '#f5f5f5' }}>
        <div style={{ background: 'white', borderRadius: '16px', padding: '3rem', textAlign: 'center', maxWidth: '420px', width: '100%', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
          <div style={{ width: '70px', height: '70px', background: '#1f3a5f', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <span style={{ color: 'white', fontSize: '2rem' }}>✓</span>
          </div>
          <h2 style={{ color: '#1a1a2e', fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.75rem' }}>Pedido Confirmado</h2>
          <p style={{ color: '#888', marginBottom: '2rem', lineHeight: 1.6 }}>Tu pedido esta siendo preparado. Te avisaremos cuando este listo para entrega.</p>
          <div style={{ background: '#f9f9f9', borderRadius: '10px', padding: '1rem', marginBottom: '2rem' }}>
            <p style={{ fontWeight: 700, color: '#1f3a5f', fontSize: '1.2rem' }}>Total: ${total.toFixed(2)}</p>
          </div>
          <button
            onClick={() => { setCarrito([]); setPedidoConfirmado(false); }}
            style={{ background: '#1f3a5f', color: 'white', border: 'none', borderRadius: '10px', padding: '0.85rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', width: '100%' }}
          >
            Hacer otro pedido
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>

      {/* MENU */}
      <div style={{ flex: 1, padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.5rem', color: '#1a1a2e' }}>{restaurante.nombre}</h1>
          <p style={{ color: '#888' }}>{restaurante.direccion}</p>
        </div>

        {/* CATEGORIAS */}
        <div style={{ display: 'flex', gap: '0', marginBottom: '2rem', borderBottom: '1px solid #eee' }}>
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: categoriaActiva === cat ? '3px solid #1f3a5f' : '3px solid transparent',
                color: categoriaActiva === cat ? '#1f3a5f' : '#888',
                fontWeight: categoriaActiva === cat ? 700 : 400,
                fontSize: '0.95rem',
                padding: '0.75rem 1.2rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                marginBottom: '-1px',
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
              <div style={{ height: '80px', background: '#f0f4f8', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}>
                <span style={{ color: '#1f3a5f', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '1px' }}>{item.categoria.toUpperCase()}</span>
              </div>
              <h3 style={{ color: '#1a1a2e' }}>{item.nombre}</h3>
              <p style={{ color: '#888', fontSize: '0.85rem' }}>{item.descripcion}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid #f0f0f0' }}>
                <span style={{ fontWeight: 700, color: '#1f3a5f', fontSize: '1.1rem' }}>${item.precio.toFixed(2)}</span>
                <button
                  onClick={() => agregarAlCarrito(item)}
                  style={{ background: '#1f3a5f', color: 'white', border: 'none', borderRadius: '8px', padding: '0.4rem 1rem', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
                >
                  Agregar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CARRITO */}
      <div style={{ width: '320px', background: 'white', padding: '1.5rem', boxShadow: '-2px 0 10px rgba(0,0,0,0.08)', position: 'sticky', top: '60px', height: 'calc(100vh - 60px)', overflowY: 'auto' }}>
        <h2 style={{ color: '#1a1a2e', marginBottom: '1rem', fontWeight: 700 }}>
          Tu pedido {totalItems > 0 && (
            <span style={{ background: '#1f3a5f', color: 'white', borderRadius: '50%', padding: '0.1rem 0.5rem', fontSize: '0.8rem', marginLeft: '0.5rem' }}>{totalItems}</span>
          )}
        </h2>

        {carrito.length === 0 ? (
          <p style={{ color: '#aaa', textAlign: 'center', marginTop: '3rem', fontSize: '0.95rem' }}>Tu carrito esta vacio</p>
        ) : (
          <>
            {carrito.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid #f0f0f0' }}>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.nombre}</p>
                  <p style={{ color: '#888', fontSize: '0.8rem' }}>x{item.cantidad} · ${item.precio.toFixed(2)} c/u</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>${(item.precio * item.cantidad).toFixed(2)}</span>
                  <button
                    onClick={() => eliminarDelCarrito(item.id)}
                    style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', fontSize: '1rem', lineHeight: 1 }}
                  >
                    x
                  </button>
                </div>
              </div>
            ))}

            <div style={{ marginTop: '1rem', padding: '1rem', background: '#f9f9f9', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.1rem' }}>
                <span>Total</span>
                <span style={{ color: '#1f3a5f' }}>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => setPedidoConfirmado(true)}
              style={{ width: '100%', marginTop: '1rem', padding: '0.85rem', background: '#1f3a5f', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}
            >
              Confirmar Pedido
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Menu;