import React, { useState } from 'react';
import { menu, restaurante } from '../data/datos';

function Menu() {
  const [carrito, setCarrito] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState('Todas');
  const [pedidoConfirmado, setPedidoConfirmado] = useState(false);
  const [verCarrito, setVerCarrito] = useState(false);

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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 60px)', flexDirection: 'column', gap: '1.5rem', background: '#f5f5f5', padding: '1rem' }}>
        <div style={{ background: 'white', borderRadius: '16px', padding: '2.5rem 2rem', textAlign: 'center', maxWidth: '420px', width: '100%', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
          <div style={{ width: '70px', height: '70px', background: '#1f3a5f', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <span style={{ color: 'white', fontSize: '2rem' }}>✓</span>
          </div>
          <h2 style={{ color: '#1a1a2e', fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.75rem' }}>Pedido Confirmado</h2>
          <p style={{ color: '#888', marginBottom: '2rem', lineHeight: 1.6 }}>Tu pedido esta siendo preparado. Te avisaremos cuando este listo.</p>
          <div style={{ background: '#f9f9f9', borderRadius: '10px', padding: '1rem', marginBottom: '2rem' }}>
            <p style={{ fontWeight: 700, color: '#1f3a5f', fontSize: '1.2rem' }}>Total: ${total.toFixed(2)}</p>
          </div>
          <button
            onClick={() => { setCarrito([]); setPedidoConfirmado(false); setVerCarrito(false); }}
            style={{ background: '#1f3a5f', color: 'white', border: 'none', borderRadius: '10px', padding: '0.85rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', width: '100%' }}
          >
            Hacer otro pedido
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 60px)', position: 'relative' }}>

      {/* MENU */}
      <div style={{ padding: '1.5rem 1rem', maxWidth: '900px', margin: '0 auto', paddingBottom: totalItems > 0 ? '100px' : '1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.3rem', color: '#1a1a2e' }}>{restaurante.nombre}</h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>{restaurante.direccion}</p>
        </div>

        {/* CATEGORIAS */}
        <div style={{ display: 'flex', gap: '0', marginBottom: '1.5rem', borderBottom: '1px solid #eee', overflowX: 'auto' }}>
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
                fontSize: '0.9rem',
                padding: '0.6rem 1rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                marginBottom: '-1px',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* PRODUCTOS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
          {menuFiltrado.map(item => (
            <div key={item.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ height: '70px', background: '#f0f4f8', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}>
                <span style={{ color: '#1f3a5f', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '1px' }}>{item.categoria.toUpperCase()}</span>
              </div>
              <h3 style={{ color: '#1a1a2e', fontSize: '0.95rem' }}>{item.nombre}</h3>
              <p style={{ color: '#888', fontSize: '0.8rem', lineHeight: 1.4 }}>{item.descripcion}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid #f0f0f0' }}>
                <span style={{ fontWeight: 700, color: '#1f3a5f', fontSize: '1rem' }}>${item.precio.toFixed(2)}</span>
                <button
                  onClick={() => agregarAlCarrito(item)}
                  style={{ background: '#1f3a5f', color: 'white', border: 'none', borderRadius: '8px', padding: '0.4rem 0.85rem', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  Agregar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOTON FLOTANTE DEL CARRITO EN MOVIL */}
      {totalItems > 0 && !verCarrito && (
        <div
          onClick={() => setVerCarrito(true)}
          style={{ position: 'fixed', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', background: '#1f3a5f', color: 'white', padding: '1rem 2rem', borderRadius: '50px', cursor: 'pointer', fontWeight: 700, fontSize: '0.95rem', boxShadow: '0 4px 20px rgba(0,0,0,0.2)', zIndex: 50, whiteSpace: 'nowrap' }}
        >
          Ver pedido · {totalItems} items · ${total.toFixed(2)}
        </div>
      )}

      {/* CARRITO MODAL */}
      {verCarrito && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'flex-end' }}>
          <div style={{ background: 'white', width: '100%', borderRadius: '20px 20px 0 0', padding: '1.5rem', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ color: '#1a1a2e', fontWeight: 700 }}>Tu pedido</h2>
              <button onClick={() => setVerCarrito(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#888' }}>×</button>
            </div>

            {carrito.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid #f0f0f0' }}>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.nombre}</p>
                  <p style={{ color: '#888', fontSize: '0.8rem' }}>x{item.cantidad} · ${item.precio.toFixed(2)} c/u</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontWeight: 700 }}>${(item.precio * item.cantidad).toFixed(2)}</span>
                  <button onClick={() => eliminarDelCarrito(item.id)} style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', fontSize: '1.1rem' }}>×</button>
                </div>
              </div>
            ))}

            <div style={{ margin: '1rem 0', padding: '1rem', background: '#f9f9f9', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.1rem' }}>
              <span>Total</span>
              <span style={{ color: '#1f3a5f' }}>${total.toFixed(2)}</span>
            </div>

            <button
              onClick={() => setPedidoConfirmado(true)}
              style={{ width: '100%', padding: '1rem', background: '#1f3a5f', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}
            >
              Confirmar Pedido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;