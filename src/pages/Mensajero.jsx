import React, { useState } from 'react';
import { mensajeros, pedidosSimulados } from '../data/datos';

function Mensajero() {
  const [mensajeroActivo, setMensajeroActivo] = useState(mensajeros[0]);
  const pedidoAsignado = pedidosSimulados.find(p => p.id === mensajeroActivo.pedido);

  return (
    <div className="pagina">
      <h1 className="titulo-pagina">Vista del Mensajero</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '1.5rem' }}>

        {/* LISTA DE MENSAJEROS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ color: '#1a1a2e', fontWeight: 700 }}>Mensajeros</h3>
          {mensajeros.map(m => (
            <div
              key={m.id}
              className="card"
              onClick={() => setMensajeroActivo(m)}
              style={{
                cursor: 'pointer',
                borderLeft: mensajeroActivo.id === m.id ? '4px solid #1f3a5f' : '4px solid transparent',
              }}
            >
              <p style={{ fontWeight: 700, color: '#1a1a2e' }}>{m.nombre}</p>
              <p style={{ fontSize: '0.85rem', color: '#888', marginTop: '0.25rem' }}>{m.telefono}</p>
              <span style={{
                display: 'inline-block',
                marginTop: '0.5rem',
                padding: '0.2rem 0.75rem',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: 700,
                background: m.estado === 'en ruta' ? '#1f3a5f' : '#d1e7dd',
                color: m.estado === 'en ruta' ? 'white' : '#0a3622',
              }}>
                {m.estado === 'en ruta' ? 'En ruta' : 'Disponible'}
              </span>
            </div>
          ))}
        </div>

        {/* DETALLE DEL MENSAJERO */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          {/* MAPA SIMULADO */}
          <div className="card" style={{ height: '300px', background: '#e8f0fe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem', borderRadius: '12px' }}>
            <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', borderRadius: '12px' }}>
              <img
                src="https://maps.googleapis.com/maps/api/staticmap?center=8.9936,-79.5197&zoom=14&size=800x300&maptype=roadmap&markers=color:blue|8.9936,-79.5197&key=AIzaSyD-placeholder"
                alt="mapa"
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.8)' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ width: '60px', height: '60px', background: '#1f3a5f', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'white', fontSize: '1.5rem' }}>M</span>
                </div>
                <p style={{ fontWeight: 700, color: '#1a1a2e' }}>{mensajeroActivo.nombre}</p>
                <p style={{ fontSize: '0.85rem', color: '#555' }}>Lat: {mensajeroActivo.lat} · Lng: {mensajeroActivo.lng}</p>
              </div>
            </div>
          </div>

          {/* PEDIDO ASIGNADO */}
          {pedidoAsignado ? (
            <div className="card">
              <h3 style={{ color: '#1a1a2e', marginBottom: '1rem', fontWeight: 700 }}>Pedido Asignado</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <p style={{ color: '#888', fontSize: '0.8rem' }}>Cliente</p>
                  <p style={{ fontWeight: 600 }}>{pedidoAsignado.cliente}</p>
                </div>
                <div>
                  <p style={{ color: '#888', fontSize: '0.8rem' }}>Pedido</p>
                  <p style={{ fontWeight: 600 }}>#{pedidoAsignado.id}</p>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <p style={{ color: '#888', fontSize: '0.8rem' }}>Direccion</p>
                  <p style={{ fontWeight: 600 }}>{pedidoAsignado.direccion}</p>
                </div>
                <div>
                  <p style={{ color: '#888', fontSize: '0.8rem' }}>Total</p>
                  <p style={{ fontWeight: 700, color: '#1f3a5f', fontSize: '1.1rem' }}>${pedidoAsignado.total.toFixed(2)}</p>
                </div>
                <div>
                  <p style={{ color: '#888', fontSize: '0.8rem' }}>Items</p>
                  <p style={{ fontWeight: 600 }}>{pedidoAsignado.items.length} productos</p>
                </div>
              </div>

              <div style={{ marginTop: '1rem', borderTop: '1px solid #f0f0f0', paddingTop: '1rem' }}>
                {pedidoAsignado.items.map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', fontSize: '0.9rem' }}>
                    <span>x{item.cantidad} {item.nombre}</span>
                    <span style={{ fontWeight: 600 }}>${(item.precio * item.cantidad).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <button className="btn" style={{ marginTop: '1rem', width: '100%', padding: '0.75rem', background: '#1f3a5f', color: 'white', fontSize: '0.95rem' }}>
                Marcar como Entregado
              </button>
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
              <p style={{ fontWeight: 600 }}>Sin pedido asignado</p>
              <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Este mensajero esta disponible</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Mensajero;